#!/bin/sh
set -euo pipefail

DB_PATH="/app/api/data/prod.db"
REPLICA_URL="s3://${AWS_S3_BUCKET}/prod.db?region=af-south-1"
FORCE_RESTORE="${FORCE_RESTORE:-false}"

echo "0. Ensuring database directory exists..."
mkdir -p "$(dirname "$DB_PATH")"

if [ -z "${AWS_S3_BUCKET:-}" ]; then
  echo "ERROR: AWS_S3_BUCKET is not set" >&2
  exit 1
fi

if [ -z "${AWS_ACCESS_KEY_ID:-}" ] && [ -z "${AWS_PROFILE:-}" ] && [ -z "${AWS_WEB_IDENTITY_TOKEN_FILE:-}" ]; then
  echo "WARNING: No obvious AWS credentials found in environment" >&2
fi

echo "1. Restoring database from S3 (if needed)..."

if [ "$FORCE_RESTORE" = "true" ]; then
  echo "   FORCE_RESTORE=true → overwriting existing DB"
  rm -f "${DB_PATH}-wal" "${DB_PATH}-shm" "${DB_PATH}-journal" "${DB_PATH}-txid" 2>/dev/null || true
  litestream restore \
    -force \
    -if-replica-exists \
    -integrity-check quick \
    -o "$DB_PATH" \
    "$REPLICA_URL"
else
  litestream restore \
    -if-db-not-exists \
    -if-replica-exists \
    -integrity-check quick \
    -o "$DB_PATH" \
    "$REPLICA_URL"
fi

echo "2. Starting Litestream replication in the background..."
litestream replicate -config /etc/litestream.yml &
LITESTREAM_PID=$!

sleep 1
if ! kill -0 "$LITESTREAM_PID" 2>/dev/null; then
  echo "ERROR: Litestream replicate failed to start" >&2
  exit 1
fi

echo "3. Running database migrations..."
cd /app/api
pnpm drizzle-kit migrate

echo "4. Starting the Node.js API..."
exec pnpm --filter api start

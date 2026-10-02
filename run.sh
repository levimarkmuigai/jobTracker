#!/bin/sh
set -e

echo "0. Ensuring database directory exists..."
mkdir -p /app/api/data

echo "1. Preparing database path..."
rm -f /app/api/data/prod.db

echo "2. Restoring database from S3 (if exists)..."
litestream restore -if-db-not-exists -if-replica-exists -o /app/api/data/prod.db "s3://${AWS_S3_BUCKET}/prod.db?region=af-south-1"

echo "3. Starting Litestream replication in the background..."
litestream replicate -config /etc/litestream.yml &

echo "4. Starting the Node.js API..."
exec pnpm --filter api start

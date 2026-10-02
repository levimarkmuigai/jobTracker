#!/bin/sh
set -e

echo "1. Restoring database from S3 (if exists)..."
litestream restore -if-replica-exists -o /app/api/data/prod.db s3://${AWS_S3_BUCKET}/prod.db

echo "2. Starting Litestream replication in the background..."
litestream replicate -config /etc/litestream.yml &

echo "3. Starting the Node.js API..."
pnpm --filter api start

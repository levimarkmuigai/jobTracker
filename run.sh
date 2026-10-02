#!/bin/sh
set -e

echo "0. Ensuring database directory exists..."
mkdir -p /app/api/data

echo "1. Restoring database from S3 (if exists)..."
litestream restore -if-replica-exists -force -o /app/api/data/prod.db "s3://${AWS_S3_BUCKET}/prod.db?region=af-south-1"

echo "2. Starting Litestream replication in the background..."
litestream replicate -config /etc/litestream.yml &

echo "3. Starting the Node.js API..."
exec pnpm --filter api start

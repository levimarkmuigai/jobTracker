#!/bin/sh
set -e

echo "1. Restoring database from S3 (if exists)..."
litestream restore -config /etc/litestream.yml -if-replica-exists /app/api/data/prod.db

echo "2. Starting Litestream replication in the background..."
litestream replicate -config /etc/litestream.yml &

echo "3. Starting the Node.js API..."
pnpm --filter api start

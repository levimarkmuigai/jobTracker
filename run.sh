#!/bin/sh
set -e

litestream restore if-replica-exists -config /etc/litestream.yml /app/api/prod.db

exec litestream replicate -exec "pnpm --filter api start" -config /etc/litestream.yml

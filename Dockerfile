FROM litestream/litestream:latest AS litestream

FROM node:20-slim

RUN apt-get update && apt-get install -y \
    ca-certificates \
    python3 \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable && corepack prepare pnpm@11.28.0 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY api/package.json ./api/
COPY packages/schema/package.json ./packages/schema/
COPY web/package.json ./web/

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm --filter schema build
RUN pnpm --filter api build

COPY litestream.yml /etc/litestream.yml
COPY run.sh /scripts/run.sh
RUN chmod +x /scripts/run.sh

EXPOSE 3000
CMD ["/scripts/run.sh"]

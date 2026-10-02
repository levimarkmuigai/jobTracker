FROM litestream/litestream:latest AS litestream

FROM node:20-slim

COPY --from=litestream /usr/local/bin/litestream /usr/local/bin/litestream

RUN apt-get update && apt-get install -y \
    ca-certificates \
    python3 \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable && corepack prepare pnpm@11.3.0 --activate

WORKDIR /app

COPY . .

RUN pnpm install

RUN pnpm --filter schema build
RUN pnpm --filter api build

COPY litestream.yml /etc/litestream.yml
COPY run.sh /scripts/run.sh
RUN chmod +x /scripts/run.sh

EXPOSE 3000
CMD ["/scripts/run.sh"]

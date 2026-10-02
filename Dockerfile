FROM litestream/litestream:latest AS litestream

FROM node:20-slim

COPY --from=litestream /usr/local/bin/litestream /usr/local/bin/litestream
RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY api/package.json ./api/
COPY packages/schema/package.json ./packages/schema/

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm --filter schema build
RUN pnpm --filter api build

COPY litestream.yml /etc/litestream.yml
COPY run.sh /scripts/run.sh

EXPOSE 3000

CMD ["/scripts/run.sh"]


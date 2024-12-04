FROM ghcr.io/clabroche/monorepo/infra-docker-build-node AS prune
WORKDIR /app
COPY . .
RUN yarn dlx turbo prune @vanessa-lanquetin/meteo --docker

FROM ghcr.io/clabroche/monorepo/infra-docker-build-node AS builder
WORKDIR /app
COPY .gitignore .gitignore
COPY --from=prune /app/out/json/ .
COPY --from=prune /app/.turbo/ .
COPY --from=prune /app/out/yarn.lock ./yarn.lock
COPY --from=prune /app/.yarn/cache .yarn/cache
RUN yarn workspaces focus @vanessa-lanquetin/meteo
COPY --from=prune /app/out/full/ .
ARG TURBO_TEAM
ENV TURBO_TEAM=$TURBO_TEAM
ARG TURBO_TOKEN
ENV TURBO_TOKEN=$TURBO_TOKEN
RUN yarn dlx turbo run build --filter=@vanessa-lanquetin/meteo
RUN yarn workspaces focus @vanessa-lanquetin/meteo --production

FROM ghcr.io/clabroche/monorepo/infra-docker-base-node-20
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 clabroche
USER clabroche
COPY --from=builder --chown=clabroche:nodejs /app .

CMD ./node_modules/.bin/vanessa-lanquetin

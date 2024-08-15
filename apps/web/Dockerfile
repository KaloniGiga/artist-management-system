
# Base image
FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

#Build for local development
FROM base AS development

WORKDIR /usr/src/app

COPY --chown=node:node pnpm-workspace.yaml package.json pnpm-lock.yaml tsconfig.json /usr/src/app/
COPY --chown=node:node apps/web/package.json /usr/src/app/apps/web/package.json

RUN pnpm install

COPY --chown=node:node apps/web/ /usr/src/app/apps/web

USER node


# Build for production
FROM base AS build
WORKDIR /usr/src/app

COPY --chown=node:node pnpm-workspace.yaml package.json pnpm-lock.yaml tsconfig.json /usr/src/app/

COPY --chown=node:node --from=development /usr/src/app/node_modules /usr/src/app/node_modules

COPY --chown=node:node --from=development /usr/src/app/apps/web/node_modules /user/src/app/apps/web/node_modules

ENV NODE_ENV production

RUN --mount=type=cache,id=pnpm,target=usr/src/app/pnpm/store pnpm install --frozen-lockfile

COPY --chown=node:node apps/web/ /usr/src/app/apps/web

RUN pnpm build:web

USER node


FROM base AS production

WORKDIR /usr/src/app

COPY pnpm-lock.yaml pnpm-workspace.yaml /usr/src/app/
COPY apps/web/package.json /usr/src/app/apps/web/package.json

COPY --chown=node:node --from=build /usr/src/app/apps/web/node_modules /usr/src/app/apps/web/node_modules
COPY --chown=node:node --from=build /usr/src/app/apps/web/.next /usr/src/app/apps/web/.next

WORKDIR /usr/src/app/apps/web

EXPOSE 3000

ENTRYPOINT [ "pnpm", "start" ]

USER node
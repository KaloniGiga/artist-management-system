# Base image
FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

#Build for local development
FROM base AS development

WORKDIR /usr/src/app

COPY --chown=node:node pnpm-workspace.yaml package.json pnpm-lock.yaml tsconfig.json .eslintrc.json ./
COPY --chown=node:node apps/api/package.json /usr/src/app/apps/api/package.json

RUN --mount=type=cache,id=pnpm,target=/usr/src/app/pnpm/store pnpm install --frozen-lockfile

COPY --chown=node:node apps/api/ ./apps/api

USER node


# Build for production
FROM base AS build

WORKDIR /usr/src/app

COPY --chown=node:node pnpm-workspace.yaml package.json pnpm-lock.yaml tsconfig.json ./

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node --from=development /usr/src/app/apps/api ./apps/api

COPY --chown=node:node --from=development /usr/src/app/apps/api/node_modules ./apps/api/node_modules

ENV NODE_ENV production

RUN --mount=type=cache,id=pnpm,target=usr/src/app/pnpm/store pnpm install --frozen-lockfile

COPY --chown=node:node apps/api/ ./apps/api

RUN pnpm build:api

USER node


FROM base AS production

WORKDIR /usr/src/app

COPY --chown=node:node pnpm-lock.yaml pnpm-workspace.yaml /usr/src/app/
COPY --chown=node:node apps/api/package.json /usr/src/app/apps/api/package.json

COPY --chown=node:node --from=build /usr/src/app/apps/api/node_modules /usr/src/app/apps/api/node_modules
COPY --chown=node:node --from=build /usr/src/app/apps/api/dist /usr/src/app/apps/api/dist

WORKDIR /usr/src/app/apps/api

# EXPOSE 4000

# ENTRYPOINT [ "node", "dist/main.js" ]

USER node

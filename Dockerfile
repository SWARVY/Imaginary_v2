FROM node:lts-alpine AS base
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@10.12.1 --activate
RUN pnpm install --frozen-lockfile

FROM base AS build
COPY . .
RUN pnpm build

FROM base AS runtime
COPY --from=build /app/.output /app/.output
EXPOSE 3001
CMD ["pnpm", "start"]
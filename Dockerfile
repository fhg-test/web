FROM node:12-alpine as builder
WORKDIR /app
COPY . .
RUN yarn && yarn build && yarn purge && yarn --production

FROM node:12-alpine
RUN apk add --no-cache curl
WORKDIR /app
COPY --from=builder /app/.next .next
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/next.config.js next.config.js
HEALTHCHECK --interval=30s --timeout=30s --retries=3 CMD curl --fail http://${HOST}:${PORT}/health || exit 1
CMD ["node", ".next/server/index.js"]

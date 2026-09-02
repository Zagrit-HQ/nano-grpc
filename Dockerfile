FROM ghcr.io/grpc-ecosystem/grpc-health-probe:v0.4.55 AS grpc-health-probe

FROM node:24-alpine

COPY --from=grpc-health-probe /ko-app/grpc-health-probe /bin/grpc_health_probe

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY proto proto
COPY src src
COPY index.js .

RUN adduser -D -u 1001 -G root nonroot
USER 1001

EXPOSE 50051
CMD ["node", "index.js"]

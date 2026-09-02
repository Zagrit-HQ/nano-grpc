FROM node:24-alpine

RUN GRPC_HEALTH_PROBE_VERSION=v0.3.1 && \
    wget -qO/bin/grpc_health_probe https://github.com/grpc-ecosystem/grpc-health-probe/releases/download/${GRPC_HEALTH_PROBE_VERSION}/grpc_health_probe-linux-amd64 && \
    chmod +x /bin/grpc_health_probe

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

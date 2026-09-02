const path = require("path");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const health = require("./health");
const greeter = require("./greeter");

const PROTO_GREETER = path.resolve(__dirname, "../proto/greeter.proto");
const PROTO_HEALTH = path.resolve(__dirname, "../proto/health.proto");

const loadProto = (protoPath) => {
  const definition = protoLoader.loadSync(protoPath);
  return grpc.loadPackageDefinition(definition);
};

const healthProto = loadProto(PROTO_HEALTH).grpc.health.v1;
const greeterProto = loadProto(PROTO_GREETER).helloworld;
const server = new grpc.Server();

server.addService(healthProto.Health.service, health);
server.addService(greeterProto.Greeter.service, greeter);

const start = (address) =>
  new Promise((resolve, reject) => {
    server.bindAsync(
      address,
      grpc.ServerCredentials.createInsecure(),
      (error, port) => (error ? reject(error) : resolve(port)),
    );
  });

const close = () =>
  new Promise((resolve) => {
    server.tryShutdown(resolve);
  });

module.exports = {
  close,
  server,
  start,
};

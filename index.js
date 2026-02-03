const { server } = require("./src/server");

server.start("0.0.0.0:50051");
console.log("🚀 Server running: a");

process.on("uncaughtException", (error) => {
  console.log("Server closed because uncaughtException.");
  server.close();
  throw error;
});

process.on("unhandledRejection", (reason) => {
  console.log("Server closed because unhandledRejection.");
  server.close();
  throw reason;
});

process.on("SIGINT", () => {
  console.log("Server closed because interrupted (SIGINT).");
  server.close();
});

process.on("SIGTERM", () => {
  console.log("Server closed because terminated (SIGTERM).");
  server.close();
});

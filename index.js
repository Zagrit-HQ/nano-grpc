const { close, start } = require("./src/server");

start("0.0.0.0:50051")
  .then(() => console.log("🚀 Server running on 0.0.0.0:50051"))
  .catch((error) => {
    console.error("Failed to start server.", error);
    process.exitCode = 1;
  });

process.on("uncaughtException", (error) => {
  console.log("Server closed because uncaughtException.");
  close().finally(() => {
    throw error;
  });
});

process.on("unhandledRejection", (reason) => {
  console.log("Server closed because unhandledRejection.");
  close().finally(() => {
    throw reason;
  });
});

process.on("SIGINT", () => {
  console.log("Server closed because interrupted (SIGINT).");
  close();
});

process.on("SIGTERM", () => {
  console.log("Server closed because terminated (SIGTERM).");
  close();
});

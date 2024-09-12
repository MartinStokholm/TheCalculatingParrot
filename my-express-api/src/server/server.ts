import "reflect-metadata"; // Required for TypeDI
import app from "./app";

const port = process.env.PORT || 7070;

const startServer = async () => {
  // Start the server
  const server = app.listen(port, () => {
    console.info(`[server.ts] Server is running on http://localhost:${port}`);
    console.info(
      `[server.ts] Swagger UI is available on http://localhost:${port}/docs`
    );
  });

  // Handle graceful shutdown
  const shutdown = () => {
    server.close(() => {
      console.info("[server.ts] Server closed");
      process.exit(0);
    });
  };

  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
};

startServer();

import "reflect-metadata"; // Required for TypeDI
import app from "./app";
import { Container } from "typedi";
import { PrismaService } from "../config/db.config";

const port = process.env.PORT || 7070;

const startServer = async () => {
  const prismaService = Container.get(PrismaService);

  try {
    // Attempt to connect to the database
    await prismaService.$connect();
    console.info("[server] Connected to the database");
  } catch (error) {
    console.error("[server] Error: Not connected to the database", error);
  } finally {
    // Disconnect from the database
    await prismaService.$disconnect();
    console.info(
      "[server] Disconnected from the database after connection check"
    );
  }

  // Start the server
  const server = app.listen(port, () => {
    console.info(`[server] Server is running on http://localhost:${port}`);
    console.info(
      `[server] Swagger UI is available on http://localhost:${port}/docs`
    );
  });

  // Handle graceful shutdown
  const shutdown = () => {
    server.close(() => {
      console.info("[server] Server closed");
      prismaService.$disconnect().then(() => {
        console.info("[server] Disconnected from the database");
        process.exit(0);
      });
    });
  };

  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
};

startServer();

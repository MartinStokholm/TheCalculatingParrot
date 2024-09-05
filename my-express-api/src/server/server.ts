import app from "./app";

const port = process.env.PORT || 7070;

const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Swagger UI is available on http://localhost:${port}/docs`);
});

// Handle graceful shutdown
const shutdown = () => {
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

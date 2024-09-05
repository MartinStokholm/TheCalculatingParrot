import "reflect-metadata";
import express from "express";
import cors from "cors";
import { corsOptions } from "../config/cors.config";
import { router as budgetRouter } from "../routes/budget.routes";
import { router as userRouter } from "../routes/user.routes";
import { router as categoryRouter } from "../routes/category.routes";
import { errorHandler } from "../middleware/errorHandling";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../swagger/swagger.json";
import { RegisterRoutes } from "src/routes/generated/routes";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

RegisterRoutes(app);

// Environment-based logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("tiny"));
}

// Routes
app.use("/api/users", userRouter);
app.use("/api/budgets", budgetRouter);
app.use("/api/categories", categoryRouter);

// Error handling middleware
app.use(errorHandler);

// Serve the Swagger UI with the generated swagger.json
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;

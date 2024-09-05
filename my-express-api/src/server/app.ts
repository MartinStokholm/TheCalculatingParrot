import "reflect-metadata";
import express from "express";
import { router as budgetRouter } from "../routes/budget.routes";
import { router as userRouter } from "../routes/user.routes";
import { router as categoryRouter } from "../routes/category.routes";
import { errorHandler } from "../middleware/errorHandling";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../swagger/swagger.json";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

// Routes
app.use("/api/users", userRouter);
app.use("/api/budgets", budgetRouter);
app.use("/api/categories", categoryRouter);

// Error handling middleware
app.use(errorHandler);

// Serve the Swagger UI with the generated swagger.json
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;

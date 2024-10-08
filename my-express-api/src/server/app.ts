import express from "express";
import cors from "cors";
import { corsOptions } from "../config/cors.config";

import { router as budgetRouter } from "../routes/budget.routes";
import { router as userRouter } from "../routes/user.routes";
import { router as categoryRouter } from "../routes/category.routes";
import { router as lineItemRouter } from "../routes/lineitem.routes";
import { errorHandler } from "../middleware/error.middleware";

import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Environment-based logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("tiny"));
}
app.use(express.static("public"));

// Routes
app.use("/api/users", userRouter);
app.use("/api/budgets", budgetRouter);
app.use("/api/lineitems", lineItemRouter);
app.use("/api/categories", categoryRouter);

// Error handling middleware
app.use(errorHandler);

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    explorer: true,
    swaggerOptions: {
      url: "/swagger.json",

      persistAuthorization: true,
    },
  })
);
export default app;

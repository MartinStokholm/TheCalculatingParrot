import express from "express";
import { router as budgetRouter } from "../routes/budget.routes";
import { router as userRouter } from "../routes/user.routes";
import { errorHandler } from "../middleware/errorHandling";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/user", userRouter);
app.use("/api/budget", budgetRouter);

// Catch all route
app.use("/api/", (req, res) => {
  res.json({ message: "Root of the express API" });
});

// Error handling middleware
app.use(errorHandler); // Use the error handling middleware

app.listen(7070, () => console.log("Server is listening on port 7070"));

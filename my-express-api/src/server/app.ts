import express from "express";
import { budgetRouter } from "../routes/budget.routes";
import { userRouter } from "../routes/user.routes";

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/budgets", budgetRouter);

app.listen(7070, () => console.log("Server is listening on port 7070"));

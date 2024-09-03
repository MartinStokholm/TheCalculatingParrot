import express from "express";
import { BudgetController } from "../controllers/budget.controller";

export const router = express.Router();

// GET /budgets
router.get("/", BudgetController.getBudgets);

router.post("/", BudgetController.createBudget);

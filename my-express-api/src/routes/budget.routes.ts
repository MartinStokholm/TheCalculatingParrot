import express from "express";
import { BudgetController } from "../controllers/budget.controller";

export const router = express.Router();

// GET /budgets
router.get("/", BudgetController.getBudgets);
router.get("/:id", BudgetController.getBudget);
router.post("/", BudgetController.createBudget);
router.put("/:id", BudgetController.updateBudget);

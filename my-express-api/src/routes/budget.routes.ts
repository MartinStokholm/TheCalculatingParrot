import express from "express";
import { Container } from "typedi";
import { BudgetController } from "../controllers/budget.controller";

export const router = express.Router();

const budgetController = Container.get(BudgetController);

router.get("/", async (_req, _res, _next) => {
  try {
    const budgets = await budgetController.getBudgets();
    return _res.status(200).json(budgets);
  } catch (error) {
    return _next(error);
  }
});

router.get("/:id", async (_req, _res, _next) => {
  try {
    const budget = await budgetController.getBudget(Number(_req.params.id));
    return _res.status(200).json(budget);
  } catch (error) {
    return _next(error);
  }
});

router.post("/", async (_req, _res, _next) => {
  try {
    const budget = await budgetController.createBudget(_req.body);
    return _res.status(201).json(budget);
  } catch (error) {
    return _next(error);
  }
});

router.put("/:id", async (_req, _res, _next) => {
  try {
    const budget = await budgetController.updateBudget(
      Number(_req.params.id),
      _req.body
    );
    return _res.status(200).json(budget);
  } catch (error) {
    return _next(error);
  }
});

router.delete("/:id", async (_req, _res, _next) => {
  try {
    const budget = await budgetController.deleteBudget(Number(_req.params.id));
    return _res.status(204).json(budget);
  } catch (error) {
    return _next(error);
  }
});

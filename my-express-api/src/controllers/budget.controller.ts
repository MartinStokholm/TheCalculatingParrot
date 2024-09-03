import { BudgetServices } from "../services/budget.services";
import { NextFunction, Request, Response } from "express";

class budgetController {
  // Get all budgets
  getBudgets = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const budgets = await BudgetServices.getBudgets();
      res.status(200).json(budgets);
    } catch (error) {
      next(error);
    }
  };

  // Get a budget by id
  getBudget = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const budgetId = parseInt(req.params.id, 10);
      const budget = await BudgetServices.getBudget(budgetId);
      if (budget) {
        res.status(200).json(budget);
      } else {
        res.status(404).json({ error: "Budget not found" });
      }
    } catch (error) {
      next(error);
    }
  };

  // Create new budget with auto-generated id and optional lineitems
  createBudget = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const budget = await BudgetServices.createBudget(req.body);
      res.status(201).json(budget);
    } catch (error) {
      next(error);
    }
  };

  // Update a budget by id
  updateBudget = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const budgetId = parseInt(req.params.id, 10);
      const updatedBudget = req.body;
      const budget = await BudgetServices.updateBudget(budgetId, updatedBudget);
      res.status(200).json(budget);
    } catch (error) {
      next(error);
    }
  };
}

//export class
export const BudgetController = new budgetController();

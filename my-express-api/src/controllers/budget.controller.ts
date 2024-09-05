import { BudgetService } from "../services/budget.services";
import { NextFunction, Request, Response } from "express";
import { Service, Inject } from "typedi";

@Service()
export class BudgetController {
  constructor(@Inject() private budgetServices: BudgetService) {}
  // Get all budgets
  getBudgets = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.url);
      const budgets = await this.budgetServices.getBudgets();
      res.status(200).json(budgets);
    } catch (error) {
      next(error);
    }
  };

  // Get a budget by id
  getBudget = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const budgetId = parseInt(req.params.id, 10);
      const budget = await this.budgetServices.getBudget(budgetId);
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
      const budget = await this.budgetServices.createBudget(req.body);
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
      const budget = await this.budgetServices.updateBudget(
        budgetId,
        updatedBudget
      );
      res.status(200).json(budget);
    } catch (error) {
      next(error);
    }
  };

  // Delete a budget by id
  deleteBudget = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const budgetId = parseInt(req.params.id, 10);
      await this.budgetServices.deleteBudget(Number(budgetId));
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}

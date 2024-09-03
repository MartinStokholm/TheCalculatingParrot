import { BudgetServices } from "../services/budget.services";
import { Request, Response } from "express";

class budgetController {
  // Get all budgets
  getBudgets = async (req: Request, res: Response) => {
    const budgets = await BudgetServices.getBudgets();
    res.send(budgets);
  };

  // Create new budget
  createBudget = async (req: Request, res: Response) => {
    const budget = await BudgetServices.createBudget(req.body);
    res.send(budget);
  };
}

//export class
export const BudgetController = new budgetController();

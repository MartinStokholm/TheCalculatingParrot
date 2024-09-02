import { BudgetServices } from "../services/budget.services";
import { Request, Response } from "express";

class budgetController {
  async getBudgets(req: Request, res: Response) {
    try {
      const data = await BudgetServices.getBudgets();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}

//export class
export const BudgetController = new budgetController();

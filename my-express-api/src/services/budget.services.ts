import { Budget } from "@prisma/client";
import prisma from "../config/db.config";

class budgetServices {
  async createBudget(newBudget: Budget) {
    return await prisma.budget.create({
      data: newBudget,
    });
  }

  async getBudgets() {
    return "Hello Budget World!";
  }

  async getBudget() {
    return "Hello Budget World!";
  }

  async updateBudget() {
    return "Hello Budget World!";
  }

  async deleteBudget() {
    return "Hello Budget World!";
  }
}

export const BudgetServices = new budgetServices();

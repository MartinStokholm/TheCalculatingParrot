import prisma from "../config/db.config";
import {
  BudgetSchema,
  budgetSchema,
  partialBudgetSchema,
} from "../models/budget.schema";
import { Service } from "typedi";

@Service()
export class BudgetService {
  async getBudgets() {
    return await prisma.budget.findMany();
  }

  async getBudget(id: number) {
    return await prisma.budget.findUnique({
      where: { id },
      include: { lineItems: true },
    });
  }

  async createBudget(newBudget: BudgetSchema) {
    const parsedBudget = budgetSchema.safeParse(newBudget);

    if (!parsedBudget.success) {
      throw new Error(`Validation error: ${parsedBudget.error.message}`);
    }

    const budgetData = {
      ...parsedBudget.data,
      lineItems: parsedBudget.data.lineItems
        ? {
            create: parsedBudget.data.lineItems,
          }
        : undefined,
    };

    return await prisma.budget.create({
      data: budgetData,
    });
  }

  async updateBudget(id: number, updatedBudget: Partial<BudgetSchema>) {
    const parsedBudget = partialBudgetSchema.partial().safeParse(updatedBudget);

    if (!parsedBudget.success) {
      throw new Error(`Validation error: ${parsedBudget.error.message}`);
    }

    const budgetData = {
      ...parsedBudget.data,
      lineItems: parsedBudget.data.lineItems
        ? {
            update: parsedBudget.data.lineItems.map((item) => ({
              where: { id: item.id },
              data: item,
            })),
          }
        : undefined,
    };

    return await prisma.budget.update({
      where: { id },
      data: budgetData,
    });
  }

  async deleteBudget(id: number) {
    return await prisma.budget.delete({
      where: { id },
    });
  }
}

import { Service, Inject } from "typedi";
import { PrismaService } from "../config/db.config";

import {
  BudgetCreateSchema,
  budgetCreateSchema,
  BudgetSchema,
  budgetSchema,
  partialBudgetSchema,
} from "../models/budget.schema";
import { BudgetCreate, BudgetResponse } from "../types/budget.types";

@Service()
export class BudgetService {
  constructor(@Inject(() => PrismaService) private prisma: PrismaService) {}

  async getBudgets(userId: string) {
    return await this.prisma.budget.findMany({
      where: { userId: userId },
    });
  }

  async getBudget(id: string) {
    return await this.prisma.budget.findUnique({
      where: { id },
      include: { lineItems: true },
    });
  }

  async createBudget(
    userId: string,
    newBudget: BudgetCreateSchema
  ): Promise<BudgetResponse> {
    const parsedBudget = budgetCreateSchema.safeParse(newBudget);

    if (!parsedBudget.success) {
      throw new Error(`Validation error: ${parsedBudget.error.message}`);
    }

    const budgetData = {
      userId: userId,
      name: parsedBudget.data.name,
      startingCapital: parsedBudget.data.startingCapital,
      savings: 0,
      lineItems: {
        create: [
          {
            name: "Update this lineitem with an expense ",
            amount: 69,
            categoryId: 1,
          },
        ],
      },
    };

    return await this.prisma.budget.create({
      data: budgetData,
      include: {
        lineItems: true,
      },
    });
  }

  async updateBudget(id: string, updatedBudget: Partial<BudgetSchema>) {
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

    return await this.prisma.budget.update({
      where: { id },
      data: budgetData,
    });
  }

  async deleteBudget(id: string) {
    return await this.prisma.budget.delete({
      where: { id },
    });
  }
}

import { Service, Inject } from "typedi";
import { PrismaService } from "../config/db.config";

import {
  BudgetCreateSchema,
  budgetCreateSchema,
  BudgetSchema,
  partialBudgetSchema,
} from "../models/budget.schema";
import { BudgetResponse } from "../types/budget.types";
import { Currency, Recurrence } from "@prisma/client";

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
      include: {
        lineItems: {
          include: {
            category: true,
          },
        },
      },
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

    const defaultCategory = await this.prisma.category.findFirst({
      where: { name: "Uncategorized" },
    });

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
            categoryId: defaultCategory?.id,
            recurrence: Recurrence.ONCE,
            currency: Currency.DKK,
            category: {
              connect: { id: defaultCategory?.id },
            },
          },
        ],
      },
    };

    return await this.prisma.budget.create({
      data: budgetData,
      include: {
        lineItems: {
          include: {
            category: true,
          },
        },
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

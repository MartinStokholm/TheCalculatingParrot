import { Service, Inject } from "typedi";
import { PrismaService } from "../config/db.config";

import {
  BudgetSchema,
  budgetSchema,
  partialBudgetSchema,
} from "../models/budget.schema";

@Service()
export class BudgetService {
  constructor(@Inject(() => PrismaService) private prisma: PrismaService) {}

  async getBudgets() {
    return await this.prisma.budget.findMany();
  }

  async getBudget(id: string) {
    return await this.prisma.budget.findUnique({
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

    return await this.prisma.budget.create({
      data: budgetData,
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

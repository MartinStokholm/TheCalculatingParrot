import prisma from "../config/db.config";
import {
  BudgetSchema,
  budgetSchema,
  LineItemSchema,
  lineItemSchema,
  partialBudgetSchema,
} from "../models/budget.schema";

class budgetServices {
  async getBudgets() {
    return await prisma.budget.findMany();
  }

  async getBudget(id: number) {
    return await prisma.budget.findUnique({
      where: { id },
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

  async createLineItem(newLineItem: LineItemSchema) {
    const parsedLineItem = lineItemSchema.safeParse(newLineItem);

    if (!parsedLineItem.success) {
      throw new Error(`Validation error: ${parsedLineItem.error.message}`);
    }

    return await prisma.lineItem.create({
      data: parsedLineItem.data,
    });
  }

  async updateLineItem(id: number, updatedLineItem: Partial<LineItemSchema>) {
    const parsedLineItem = lineItemSchema.partial().safeParse(updatedLineItem);

    if (!parsedLineItem.success) {
      throw new Error(`Validation error: ${parsedLineItem.error.message}`);
    }

    return await prisma.lineItem.update({
      where: { id },
      data: parsedLineItem.data,
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

  async deleteBudget() {
    return "Hello Budget World!";
  }
}

export const BudgetServices = new budgetServices();

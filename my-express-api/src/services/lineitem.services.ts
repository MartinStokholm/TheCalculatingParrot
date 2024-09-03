import prisma from "../config/db.config";
import {
  createLineItemSchema,
  LineItemSchema,
  lineItemSchema,
} from "../models/lineitem.schema";

class lineItemServices {
  async getLineItems(budgetId: number) {
    return await prisma.lineItem.findMany({
      where: { budgetId },
    });
  }

  async createLineItem(budgetId: number, newLineItem: LineItemSchema) {
    const parsedLineItem = createLineItemSchema.safeParse(newLineItem);

    if (!parsedLineItem.success) {
      throw new Error(`Validation error: ${parsedLineItem.error.message}`);
    }

    return await prisma.lineItem.create({
      data: {
        ...parsedLineItem.data,
        budgetId,
      },
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

  async deleteLineItem(id: number) {
    return await prisma.lineItem.delete({
      where: { id },
    });
  }
}

export const LineItemServices = new lineItemServices();

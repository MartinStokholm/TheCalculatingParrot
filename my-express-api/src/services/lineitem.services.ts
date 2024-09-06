import { Service, Inject } from "typedi";
import { PrismaService } from "../config/db.config";
import {
  createLineItemSchema,
  LineItemSchema,
  lineItemSchema,
} from "../models/lineitem.schema";

@Service()
export class LineItemService {
  constructor(@Inject(() => PrismaService) private prisma: PrismaService) {}

  async getLineItems(budgetId: number) {
    return await this.prisma.lineItem.findMany({
      where: { budgetId },
    });
  }

  async getLineItem(id: number) {
    return await this.prisma.lineItem.findUnique({
      where: { id },
    });
  }

  async createLineItem(budgetId: number, newLineItem: LineItemSchema) {
    const parsedLineItem = createLineItemSchema.safeParse(newLineItem);

    if (!parsedLineItem.success) {
      throw new Error(`Validation error: ${parsedLineItem.error.message}`);
    }

    return await this.prisma.lineItem.create({
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

    return await this.prisma.lineItem.update({
      where: { id },
      data: parsedLineItem.data,
    });
  }

  async deleteLineItem(id: number) {
    return await this.prisma.lineItem.delete({
      where: { id },
    });
  }
}

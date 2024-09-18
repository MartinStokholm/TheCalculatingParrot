import { Service, Inject } from "typedi";
import { PrismaService } from "../config/db.config";
import {
  createLineItemSchema,
  lineItemSchema,
} from "../models/lineitem.schema";
import { LineItemCreate, LineItemWithCategory } from "../types/lineitem.types";

@Service()
export class LineItemService {
  constructor(@Inject(() => PrismaService) private prisma: PrismaService) {}

  async getLineItems(budgetId: string) {
    return await this.prisma.lineItem.findMany({
      where: { budgetId },
    });
  }

  async getLineItem(id: string): Promise<LineItemWithCategory | null> {
    return await this.prisma.lineItem.findUnique({
      where: { id },
      include: { category: true },
    });
  }

  async createLineItem(budgetId: string, newLineItem: LineItemCreate) {
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

  async updateLineItem(
    id: string,
    updatedLineItem: LineItemCreate
  ): Promise<LineItemWithCategory> {
    const parsedLineItem = lineItemSchema.partial().safeParse(updatedLineItem);

    if (!parsedLineItem.success) {
      throw new Error(`Validation error: ${parsedLineItem.error.message}`);
    }

    return await this.prisma.lineItem.update({
      where: { id },
      data: parsedLineItem.data,
      include: { category: true },
    });
  }

  async deleteLineItem(id: string) {
    return await this.prisma.lineItem.delete({
      where: { id },
    });
  }
}

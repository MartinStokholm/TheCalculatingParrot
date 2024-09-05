import { Service, Inject } from "typedi";
import { PrismaService } from "../config/db.config";
import { CategorySchema, categorySchema } from "../models/category.schema";

@Service()
export class CategoryService {
  constructor(@Inject(() => PrismaService) private prisma: PrismaService) {}

  async getCategories() {
    return await this.prisma.category.findMany();
  }

  async getCategory(id: number) {
    return await this.prisma.category.findUnique({
      where: { id },
    });
  }

  async createCategory(newCategory: CategorySchema) {
    const parsedCategory = categorySchema.safeParse(newCategory);

    if (!parsedCategory.success) {
      throw new Error(`Validation error: ${parsedCategory.error.message}`);
    }

    return await this.prisma.category.create({
      data: parsedCategory.data,
    });
  }

  async updateCategory(id: number, updatedCategory: Partial<CategorySchema>) {
    const parsedCategory = categorySchema.partial().safeParse(updatedCategory);

    if (!parsedCategory.success) {
      throw new Error(`Validation error: ${parsedCategory.error.message}`);
    }

    return await this.prisma.category.update({
      where: { id },
      data: parsedCategory.data,
    });
  }

  async deleteCategory(id: number) {
    return await this.prisma.category.delete({
      where: { id },
    });
  }
}

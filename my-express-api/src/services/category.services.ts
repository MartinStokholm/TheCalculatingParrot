import prisma from "../config/db.config";
import { CategorySchema, categorySchema } from "../models/category.schema";
import { Service } from "typedi";

@Service()
export class CategoryService {
  async getCategories() {
    return await prisma.category.findMany();
  }

  async getCategory(id: number) {
    return await prisma.category.findUnique({
      where: { id },
    });
  }

  async createCategory(newCategory: CategorySchema) {
    const parsedCategory = categorySchema.safeParse(newCategory);

    if (!parsedCategory.success) {
      throw new Error(`Validation error: ${parsedCategory.error.message}`);
    }

    return await prisma.category.create({
      data: parsedCategory.data,
    });
  }

  async updateCategory(id: number, updatedCategory: Partial<CategorySchema>) {
    const parsedCategory = categorySchema.partial().safeParse(updatedCategory);

    if (!parsedCategory.success) {
      throw new Error(`Validation error: ${parsedCategory.error.message}`);
    }

    return await prisma.category.update({
      where: { id },
      data: parsedCategory.data,
    });
  }

  async deleteCategory(id: number) {
    return await prisma.category.delete({
      where: { id },
    });
  }
}

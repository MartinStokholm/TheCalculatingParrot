import { CategoryService } from "../services/category.services";
import { NextFunction, Request, Response } from "express";
import { Service, Inject } from "typedi";

@Service()
export class CategoryController {
  constructor(@Inject() private categoryService: CategoryService) {}

  // Get all categories
  getCategories = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const categories = await this.categoryService.getCategories();
      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  };

  // Get a category by id
  getCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categoryId = parseInt(req.params.id, 10);
      const category = await this.categoryService.getCategory(categoryId);
      if (category) {
        res.status(200).json(category);
      } else {
        res.status(404).json({ error: "Category not found" });
      }
    } catch (error) {
      next(error);
    }
  };

  // Create new category with auto-generated id
  createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = await this.categoryService.createCategory(req.body);
      res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  };

  // Update a category by id
  updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categoryId = parseInt(req.params.categoryId, 10);
      const updatedCategory = req.body;
      const category = await this.categoryService.updateCategory(
        categoryId,
        updatedCategory
      );
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  };

  // Delete a category by id
  deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categoryId = parseInt(req.params.categoryId, 10);
      await this.categoryService.deleteCategory(Number(categoryId));
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}

import { CategoryServices } from "../services/category.services";
import { NextFunction, Request, Response } from "express";

class categoryController {
  getCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categories = await CategoryServices.getCategories();
      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  };

  getCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categoryId = parseInt(req.params.id, 10);
      const category = await CategoryServices.getCategory(categoryId);
      if (category) {
        res.status(200).json(category);
      } else {
        res.status(404).json({ error: "Category not found" });
      }
    } catch (error) {
      next(error);
    }
  };

  createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = await CategoryServices.createCategory(req.body);
      res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  };

  updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categoryId = parseInt(req.params.categoryId, 10);
      const updatedCategory = req.body;
      const category = await CategoryServices.updateCategory(
        categoryId,
        updatedCategory
      );
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  };

  deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categoryId = parseInt(req.params.categoryId, 10);
      await CategoryServices.deleteCategory(Number(categoryId));
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}

export const CategoryController = new categoryController();

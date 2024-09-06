import express from "express";
import { Container } from "typedi";
import { CategoryController } from "../controllers/category.controller";

export const router = express.Router();

const categoryController = Container.get(CategoryController);

router.get("/", async (_req, _res, _next) => {
  try {
    const categories = await categoryController.getCategories();
    return _res.status(200).json(categories);
  } catch (error) {
    return _next(error);
  }
});

router.get("/:id", async (_req, _res, _next) => {
  try {
    const category = await categoryController.getCategory(
      Number(_req.params.id)
    );
    return _res.status(200).json(category);
  } catch (error) {
    return _next(error);
  }
});

router.post("/", async (_req, _res, _next) => {
  try {
    const category = await categoryController.createCategory(_req.body);
    return _res.status(201).json(category);
  } catch (error) {
    return _next(error);
  }
});

router.put("/:id", async (_req, _res, _next) => {
  try {
    const category = await categoryController.updateCategory(
      Number(_req.params.id),
      _req.body
    );
    return _res.status(200).json(category);
  } catch (error) {
    return _next(error);
  }
});

router.delete("/:id", async (_req, _res, _next) => {
  try {
    const category = await categoryController.deleteCategory(
      Number(_req.params.id)
    );
    return _res.status(204).json(category);
  } catch (error) {
    return _next(error);
  }
});

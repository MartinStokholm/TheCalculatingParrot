import express from "express";
import { Container } from "typedi";
import { CategoryController } from "../controllers/category.controller";
import { verifyToken } from "../middleware/auth.middelware";

export const router = express.Router();

const categoryController = Container.get(CategoryController);

router.get("/", verifyToken, async (_req, _res, _next) => {
  try {
    const categories = await categoryController.getCategories();
    return _res.status(200).json(categories);
  } catch (error) {
    return _next(error);
  }
});

router.get("/:id", verifyToken, async (_req, _res, _next) => {
  try {
    const category = await categoryController.getCategory(_req.params.id);
    return _res.status(200).json(category);
  } catch (error) {
    return _next(error);
  }
});

router.post("/", verifyToken, async (_req, _res, _next) => {
  try {
    const category = await categoryController.createCategory(_req.body);
    return _res.status(201).json(category);
  } catch (error) {
    return _next(error);
  }
});

router.put("/:id", verifyToken, async (_req, _res, _next) => {
  try {
    const category = await categoryController.updateCategory(
      _req.params.id,
      _req.body
    );
    return _res.status(200).json(category);
  } catch (error) {
    return _next(error);
  }
});

router.delete("/:id", verifyToken, async (_req, _res, _next) => {
  try {
    const category = await categoryController.deleteCategory(_req.params.id);
    return _res.status(204).json(category);
  } catch (error) {
    return _next(error);
  }
});

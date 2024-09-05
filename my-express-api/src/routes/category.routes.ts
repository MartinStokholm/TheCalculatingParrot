import express from "express";
import { Container } from "typedi";
import { CategoryController } from "../controllers/category.controller";

export const router = express.Router();

const categoryController = Container.get(CategoryController);

// category for a lineitem
router.get("/", (req, res, next) =>
  categoryController.getCategories(req, res, next)
);
router.post("/", (req, res, next) =>
  categoryController.createCategory(req, res, next)
);
router.put("/:id", (req, res, next) =>
  categoryController.updateCategory(req, res, next)
);

router.delete("/:id", (req, res, next) =>
  categoryController.deleteCategory(req, res, next)
);

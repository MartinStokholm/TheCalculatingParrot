import express from "express";
import { BudgetController } from "../controllers/budget.controller";
import { LineItemController } from "../controllers/lineitem.controller";
import { CategoryController } from "../controllers/category.controller";

export const router = express.Router();

// budgets
router.get("/", BudgetController.getBudgets);
router.get("/:id", BudgetController.getBudget);
router.post("/", BudgetController.createBudget);
router.put("/:id", BudgetController.updateBudget);
router.delete("/:id", BudgetController.deleteBudget);

// lineitems for a budget
router.get("/:id/lineitem", LineItemController.getLineItems);
router.post("/:id/lineitem", LineItemController.createLineItem);
router.put("/:id/lineitem/:lineitemId", LineItemController.updateLineItem);
router.delete("/:id/lineitem/:lineitemId", LineItemController.deleteLineItem);

// category for a lineitem
router.get("/:id/lineitem/category", CategoryController.getCategories);
router.post("/:id/lineitem/category", CategoryController.createCategory);
router.put(
  "/:id/lineitem/category/:categoryId",
  CategoryController.updateCategory
);

router.delete(
  "/:id/lineitem/category/:categoryId",
  CategoryController.deleteCategory
);

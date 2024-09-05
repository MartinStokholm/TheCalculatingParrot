import express from "express";
import { Container } from "typedi";
import { BudgetController } from "../controllers/budget.controller";
import { LineItemController } from "../controllers/lineitem.controller";

export const router = express.Router();

const budgetController = Container.get(BudgetController);
const lineItemController = Container.get(LineItemController);

// budgets
router.get("/", (req, res, next) =>
  budgetController.getBudgets(req, res, next)
);
router.get("/:id", (req, res, next) =>
  budgetController.getBudget(req, res, next)
);
router.post("/", (req, res, next) =>
  budgetController.createBudget(req, res, next)
);
router.put("/:id", (req, res, next) =>
  budgetController.updateBudget(req, res, next)
);
router.delete("/:id", (req, res, next) =>
  budgetController.deleteBudget(req, res, next)
);

// lineitems for a budget
router.get("/:id/lineitem", (req, res, next) =>
  lineItemController.getLineItems(req, res, next)
);

router.post("/:id/lineitem", (req, res, next) =>
  lineItemController.createLineItem(req, res, next)
);

router.put("/:id/lineitem/:lineitemId", (req, res, next) =>
  lineItemController.updateLineItem(req, res, next)
);

router.delete("/:id/lineitem/:lineitemId", (req, res, next) =>
  lineItemController.deleteLineItem(req, res, next)
);

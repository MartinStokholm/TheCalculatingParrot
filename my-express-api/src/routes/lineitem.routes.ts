import express from "express";
import { Container } from "typedi";
import { LineItemController } from "../controllers/lineitem.controller";

export const router = express.Router();

const lineItemController = Container.get(LineItemController);

// lineitems for a budget
router.get("/:id", async (_req, _res, _next) => {
  try {
    const lineitem = await lineItemController.getLineItem(
      Number(_req.params.id)
    );
    return _res.status(201).json(lineitem);
  } catch (error) {
    return _next(error);
  }
});

router.post("/:budgetId", async (_req, _res, _next) => {
  try {
    const lineitem = await lineItemController.createLineItem(
      _req.params.budgetId,
      _req.body
    );
    return _res.status(201).json(lineitem);
  } catch (error) {
    return _next(error);
  }
});

router.put("/:id", async (_req, _res, _next) => {
  try {
    const lineitem = await lineItemController.updateLineItem(
      Number(_req.params.id),
      _req.body
    );
    return _res.status(200).json(lineitem);
  } catch (error) {
    return _next(error);
  }
});

router.delete("/:id", async (_req, _res, _next) => {
  try {
    const lineitem = await lineItemController.deleteLineItem(
      Number(_req.params.id)
    );
    return _res.status(204).json(lineitem);
  } catch (error) {
    return _next(error);
  }
});

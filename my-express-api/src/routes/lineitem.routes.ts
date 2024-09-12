import express from "express";
import { Container } from "typedi";
import { LineItemController } from "../controllers/lineitem.controller";
import { verifyToken } from "../middleware/auth.middelware";

export const router = express.Router();

const lineItemController = Container.get(LineItemController);

router.get("/:id", verifyToken, async (_req, _res, _next) => {
  try {
    const lineitem = await lineItemController.getLineItem(_req.params.id);
    return _res.status(201).json(lineitem);
  } catch (error) {
    return _next(error);
  }
});

router.post("/:budgetId", verifyToken, async (_req, _res, _next) => {
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

router.put("/:id", verifyToken, async (_req, _res, _next) => {
  try {
    const lineitem = await lineItemController.updateLineItem(
      _req.params.id,
      _req.body
    );
    return _res.status(200).json(lineitem);
  } catch (error) {
    return _next(error);
  }
});

router.delete("/:id", verifyToken, async (_req, _res, _next) => {
  try {
    const lineitem = await lineItemController.deleteLineItem(_req.params.id);
    return _res.status(204).json(lineitem);
  } catch (error) {
    return _next(error);
  }
});

import { LineItemServices } from "../services/lineitem.services";

import { NextFunction, Request, Response } from "express";

class lineItemController {
  // Create new lineitem with auto-generated id
  createLineItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const budgetId = parseInt(req.params.id, 10);
      const lineItem = await LineItemServices.createLineItem(
        budgetId,
        req.body
      );
      res.status(201).json(lineItem);
    } catch (error) {
      next(error);
    }
  };

  updateLineItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { lineitemId } = req.params;
      const updatedLineItem = req.body;
      const lineItem = await LineItemServices.updateLineItem(
        Number(lineitemId),
        updatedLineItem
      );
      res.send(lineItem);

      res.status(200).json(lineItem);
    } catch (error) {
      next(error);
    }
  };

  getLineItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const budgetId = parseInt(req.params.id, 10);
      const lineItems = await LineItemServices.getLineItems(budgetId);
      res.status(200).json(lineItems);
    } catch (error) {
      next(error);
    }
  };

  deleteLineItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { lineitemId } = req.params;
      await LineItemServices.deleteLineItem(Number(lineitemId));
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}

//export class
export const LineItemController = new lineItemController();

import { LineItemService } from "../services/lineitem.services";
import { NextFunction, Request, Response } from "express";
import { Service, Inject } from "typedi";

@Service()
export class LineItemController {
  constructor(@Inject() private lineItemService: LineItemService) {}

  // Create new lineitem with auto-generated id
  createLineItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const budgetId = parseInt(req.params.id, 10);
      const lineItem = await this.lineItemService.createLineItem(
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
      const lineItem = await this.lineItemService.updateLineItem(
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
      const lineItems = await this.lineItemService.getLineItems(budgetId);
      res.status(200).json(lineItems);
    } catch (error) {
      next(error);
    }
  };

  deleteLineItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { lineitemId } = req.params;
      await this.lineItemService.deleteLineItem(Number(lineitemId));
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}

import { LineItem } from "@prisma/client";
import { LineItemService } from "../services/lineitem.services";
import {
  Body,
  Controller,
  Delete,
  Get,
  Path,
  Post,
  Put,
  Route,
  Security,
  Tags,
} from "tsoa";

import { Service, Inject } from "typedi";

@Service()
@Route("lineitems")
@Tags("Lineitems")
export class LineItemController extends Controller {
  constructor(@Inject() private lineItemService: LineItemService) {
    super();
  }

  @Get("{lineItemId}")
  @Security("bearerAuth")
  public async getLineItem(
    @Path() lineItemId: number
  ): Promise<LineItem | null> {
    return this.lineItemService.getLineItem(lineItemId);
  }

  @Post("{budgetId}")
  @Security("bearerAuth")
  public async createLineItem(
    @Path() budgetId: string,
    @Body() requestBody: LineItem
  ): Promise<LineItem> {
    return this.lineItemService.createLineItem(budgetId, requestBody);
  }

  @Put("{lineItemId}")
  @Security("bearerAuth")
  public async updateLineItem(
    @Path() lineItemId: number,
    @Body() requestBody: LineItem
  ): Promise<LineItem> {
    return this.lineItemService.updateLineItem(lineItemId, requestBody);
  }

  @Delete("{lineItemId}")
  @Security("bearerAuth")
  public async deleteLineItem(@Path() lineItemId: number): Promise<LineItem> {
    return this.lineItemService.deleteLineItem(lineItemId);
  }
}

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
import { LineItemCreate, LineItemWithCategory } from "../types/lineitem.types";

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
    @Path() lineItemId: string
  ): Promise<LineItemWithCategory | null> {
    return await this.lineItemService.getLineItem(lineItemId);
  }

  @Post("{budgetId}")
  @Security("bearerAuth")
  public async createLineItem(
    @Path() budgetId: string,
    @Body() requestBody: LineItemCreate
  ): Promise<LineItemCreate> {
    return await this.lineItemService.createLineItem(budgetId, requestBody);
  }

  @Put("{lineItemId}")
  @Security("bearerAuth")
  public async updateLineItem(
    @Path() lineItemId: string,
    @Body() requestBody: LineItemCreate
  ): Promise<LineItemWithCategory> {
    return await this.lineItemService.updateLineItem(lineItemId, requestBody);
  }

  @Delete("{lineItemId}")
  @Security("bearerAuth")
  public async deleteLineItem(@Path() lineItemId: string): Promise<LineItem> {
    return await this.lineItemService.deleteLineItem(lineItemId);
  }
}

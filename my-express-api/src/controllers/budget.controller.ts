import { Budget } from "@prisma/client";
import { BudgetService } from "../services/budget.services";
import {
  Body,
  Controller,
  Delete,
  Get,
  Path,
  Post,
  Put,
  Route,
  Tags,
} from "tsoa";

import { Service, Inject } from "typedi";

@Service()
@Route("budgets")
@Tags("Budgets")
export class BudgetController extends Controller {
  constructor(@Inject() private budgetServices: BudgetService) {
    super();
  }

  @Get("/")
  public async getBudgets(): Promise<Budget[]> {
    return this.budgetServices.getBudgets();
  }

  @Get("{budgetId}")
  public async getBudget(@Path() budgetId: number): Promise<Budget | null> {
    return this.budgetServices.getBudget(budgetId);
  }

  @Post("/")
  public async createBudget(@Body() requestBody: Budget): Promise<Budget> {
    return this.budgetServices.createBudget(requestBody);
  }

  @Put("{budgetId}")
  public async updateBudget(
    @Path() budgetId: number,
    @Body() requestBody: Budget
  ): Promise<Budget> {
    return this.budgetServices.updateBudget(budgetId, requestBody);
  }

  @Delete("{budgetId}")
  public async deleteBudget(@Path() budgetId: number): Promise<Budget> {
    return this.budgetServices.deleteBudget(budgetId);
  }
}

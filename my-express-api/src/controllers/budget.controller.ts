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
  Security,
  Request,
  Tags,
} from "tsoa";
import { Request as exRequest } from "express";
import { Service, Inject } from "typedi";
import { BudgetCreateBody, BudgetResponse } from "../types/budget.types";

@Service()
@Route("budgets")
@Tags("Budgets")
export class BudgetController extends Controller {
  constructor(@Inject() private budgetServices: BudgetService) {
    super();
  }

  @Get("/")
  @Security("bearerAuth")
  public async getBudgets(@Request() req: exRequest): Promise<Budget[]> {
    return this.budgetServices.getBudgets(req.tokenData.id);
  }

  @Get("{budgetId}")
  @Security("bearerAuth")
  public async getBudget(
    @Path() budgetId: string
  ): Promise<BudgetResponse | null> {
    return this.budgetServices.getBudget(budgetId);
  }

  @Post("/")
  @Security("bearerAuth")
  public async createBudget(
    @Request() req: exRequest,
    @Body() requestBody: BudgetCreateBody
  ): Promise<BudgetResponse> {
    return this.budgetServices.createBudget(req.tokenData.id, requestBody);
  }

  @Put("{budgetId}")
  @Security("bearerAuth")
  public async updateBudget(
    @Path() budgetId: string,
    @Body() requestBody: Budget
  ): Promise<Budget> {
    return this.budgetServices.updateBudget(budgetId, requestBody);
  }

  @Delete("{budgetId}")
  @Security("bearerAuth")
  public async deleteBudget(@Path() budgetId: string): Promise<Budget> {
    return this.budgetServices.deleteBudget(budgetId);
  }
}

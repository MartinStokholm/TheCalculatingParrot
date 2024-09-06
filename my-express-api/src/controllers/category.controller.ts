import { Category } from "@prisma/client";
import { CategoryService } from "../services/category.services";
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
@Route("categories")
@Tags("Categories")
export class CategoryController extends Controller {
  constructor(@Inject() private categoryService: CategoryService) {
    super();
  }

  @Get("/")
  public async getCategories(): Promise<Category[]> {
    return this.categoryService.getCategories();
  }

  @Get("{categoryId}")
  public async getCategory(
    @Path() categoryId: number
  ): Promise<Category | null> {
    return this.categoryService.getCategory(categoryId);
  }

  @Post("/")
  public async createCategory(
    @Body() requestBody: Category
  ): Promise<Category> {
    return this.categoryService.createCategory(requestBody);
  }

  @Put("{categoryId}")
  public async updateCategory(
    @Path() categoryId: number,
    @Body() requestBody: Category
  ): Promise<Category> {
    return this.categoryService.updateCategory(categoryId, requestBody);
  }

  @Delete("{categoryId}")
  public async deleteCategory(@Path() categoryId: number): Promise<Category> {
    return this.categoryService.deleteCategory(categoryId);
  }
}

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
    return await this.categoryService.getCategories();
  }

  @Get("{categoryId}")
  public async getCategory(
    @Path() categoryId: string
  ): Promise<Category | null> {
    return await this.categoryService.getCategory(categoryId);
  }

  @Post("/")
  public async createCategory(
    @Body() requestBody: Category
  ): Promise<Category> {
    return await this.categoryService.createCategory(requestBody);
  }

  @Put("{categoryId}")
  public async updateCategory(
    @Path() categoryId: string,
    @Body() requestBody: Category
  ): Promise<Category> {
    return await this.categoryService.updateCategory(categoryId, requestBody);
  }

  @Delete("{categoryId}")
  public async deleteCategory(@Path() categoryId: string): Promise<Category> {
    return await this.categoryService.deleteCategory(categoryId);
  }
}

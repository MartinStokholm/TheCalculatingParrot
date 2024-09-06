import { User } from "@prisma/client";
import { UserService } from "../services/user.services";
import { Body, Controller, Get, Path, Post, Put, Route, Tags } from "tsoa";
import { Service, Inject } from "typedi";

@Service()
@Route("users")
@Tags("Users")
export class UserController extends Controller {
  constructor(@Inject() private userService: UserService) {
    super();
  }

  @Get("/")
  public async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get("{userId}")
  public async getUser(@Path() userId: number): Promise<User | null> {
    return this.userService.getUser(userId);
  }

  @Post("/")
  public async createUser(@Body() requestBody: User): Promise<User> {
    return this.userService.createUser(requestBody);
  }

  @Put("{userId}")
  public async updateUser(
    @Path() userId: number,
    @Body() requestBody: User
  ): Promise<User> {
    return this.userService.updateUser(userId, requestBody);
  }
}

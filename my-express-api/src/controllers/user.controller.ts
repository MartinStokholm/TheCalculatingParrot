import { User } from "@prisma/client";
import { UserService } from "../services/user.services";
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
@Route("users")
@Tags("Users")
export class UserController extends Controller {
  constructor(@Inject() private userService: UserService) {
    super();
  }

  @Get("/")
  @Security("bearerAuth")
  public async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get("{userId}")
  @Security("bearerAuth")
  public async getUser(@Path() userId: string): Promise<User | null> {
    return this.userService.getUser(userId);
  }

  @Put("{userId}")
  @Security("bearerAuth")
  public async updateUser(
    @Path() userId: string,
    @Body() requestBody: User
  ): Promise<User> {
    return this.userService.updateUser(userId, requestBody);
  }

  @Delete("{userId}")
  @Security("bearerAuth")
  public async deleteUser(@Path() userId: string): Promise<User> {
    return this.userService.deleteUser(userId);
  }

  @Post("register")
  public async createUser(@Body() requestBody: User): Promise<User> {
    return this.userService.createUser(requestBody);
  }

  @Post("login")
  public async login(@Body() requestBody: Partial<User>): Promise<string> {
    if (requestBody.email == undefined) return "No email";

    if (requestBody.password == undefined) return "No password";

    const result = await this.userService.validateUserCredentials(
      requestBody.email,
      requestBody.password
    );

    return result.token;
  }
}

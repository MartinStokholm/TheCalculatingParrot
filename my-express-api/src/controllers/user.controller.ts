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
import {
  UserLogin,
  UserLoginResponse,
  UserRegistration,
  UsersResponse,
} from "../types/user.types";

@Service()
@Route("users")
@Tags("Users")
export class UserController extends Controller {
  constructor(@Inject() private userService: UserService) {
    super();
  }

  @Get("/")
  @Security("bearerAuth")
  public async getUsers(): Promise<UsersResponse[]> {
    const users = await this.userService.getUsers();
    const usersResponse: UsersResponse[] = users.map((user) => ({
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
    }));
    return usersResponse;
  }

  @Get("{userId}")
  @Security("bearerAuth")
  public async getUser(
    @Path() userId: string | undefined
  ): Promise<User | null> {
    if (userId == undefined) return null;
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
  public async createUser(
    @Body() requestBody: UserRegistration
  ): Promise<User> {
    return this.userService.createUser(requestBody);
  }

  @Post("login")
  public async login(
    @Body() requestBody: UserLogin
  ): Promise<UserLoginResponse> {
    return await this.userService.validateUserCredentials(
      requestBody.email,
      requestBody.password
    );
  }
}

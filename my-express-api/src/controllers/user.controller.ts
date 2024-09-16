import { User } from "@prisma/client";
import { UserService } from "../services/user.services";
import {
  Body,
  Controller,
  Delete,
  Example,
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
  ): Promise<UsersResponse | null> {
    if (userId == undefined) return null;
    const user = await this.userService.getUser(userId);

    if (!user) return null;

    // Return only the required fields
    return {
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
    };
  }

  @Put("{userId}")
  @Security("bearerAuth")
  public async updateUser(
    @Path() userId: string,
    @Body() requestBody: User
  ): Promise<User> {
    return await this.userService.updateUser(userId, requestBody);
  }

  @Delete("{userId}")
  @Security("bearerAuth")
  public async deleteUser(@Path() userId: string): Promise<User> {
    return await this.userService.deleteUser(userId);
  }

  @Post("register")
  public async createUser(
    @Body() requestBody: UserRegistration
  ): Promise<User> {
    return await this.userService.createUser(requestBody);
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

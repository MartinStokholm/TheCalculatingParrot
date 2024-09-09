import { Service, Inject } from "typedi";
import { PrismaService } from "../config/db.config";
import {
  JwtResponseSchema,
  partialUserSchema,
  UserSchema,
  userSchema,
} from "../models/user.schema";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";

@Service()
export class UserService {
  constructor(@Inject(() => PrismaService) private prisma: PrismaService) {}

  async getUsers() {
    return await this.prisma.user.findMany();
  }

  async getUser(id: string) {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async getUserByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async createUser(newUser: UserSchema) {
    const parsedUser = userSchema.safeParse(newUser);

    if (!parsedUser.success) {
      throw new Error(`Validation error: ${parsedUser.error.message}`);
    }

    const existingUser = await this.prisma.user.findUnique({
      where: { email: parsedUser.data.email },
    });

    if (existingUser) {
      throw new Error("Email already in use");
    }

    if (!parsedUser.data.password) {
      throw new Error("Password is required");
    }

    const hashedPassword = await bcrypt.hash(parsedUser.data.password, 10);

    return await this.prisma.user.create({
      data: {
        ...parsedUser.data,
        password: hashedPassword,
      },
    });
  }

  async updateUser(id: string, updatedUser: Partial<UserSchema>) {
    const parsedUser = partialUserSchema.safeParse(updatedUser);

    if (!parsedUser.success) {
      throw new Error(`Validation error: ${parsedUser.error.message}`);
    }

    return await this.prisma.user.update({
      where: { id },
      data: parsedUser.data,
    });
  }

  async validateUserCredentials(
    email: string,
    password: string
  ): Promise<JwtResponseSchema> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (!user.password) {
      throw new Error("Password not set");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    // Generate token
    const token = generateToken({
      id: user.id,
      username: user.name,
      email: user.email,
    });

    // Create response object
    const response = {
      token,
    };

    return response;
  }

  async deleteUser(id: string) {
    return await this.prisma.user.delete({
      where: { id },
    });
  }
}

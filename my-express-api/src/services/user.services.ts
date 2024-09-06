import { Service, Inject } from "typedi";
import { PrismaService } from "../config/db.config";
import {
  partialUserSchema,
  UserSchema,
  userSchema,
} from "../models/user.schema";
import bcrypt from "bcrypt";

@Service()
export class UserService {
  constructor(@Inject(() => PrismaService) private prisma: PrismaService) {}

  async getUsers() {
    return await this.prisma.user.findMany();
  }

  async getUser(id: number) {
    return await this.prisma.user.findUnique({
      where: { id },
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

  async updateUser(id: number, updatedUser: Partial<UserSchema>) {
    const parsedUser = partialUserSchema.safeParse(updatedUser);

    if (!parsedUser.success) {
      throw new Error(`Validation error: ${parsedUser.error.message}`);
    }

    return await this.prisma.user.update({
      where: { id },
      data: parsedUser.data,
    });
  }

  async deleteUser(id: number) {
    return await this.prisma.user.delete({
      where: { id },
    });
  }
}

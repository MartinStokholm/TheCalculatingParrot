import prisma from "../config/db.config";
import {
  partialUserSchema,
  UserSchema,
  userSchema,
} from "../models/user.schema";

class userServices {
  async getUsers() {
    return await prisma.user.findMany();
  }

  async getUser(id: number) {
    return await prisma.user.findUnique({
      where: { id },
    });
  }

  async createUser(newUser: UserSchema) {
    const parsedUser = userSchema.safeParse(newUser);

    if (!parsedUser.success) {
      throw new Error(`Validation error: ${parsedUser.error.message}`);
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: parsedUser.data.email },
    });

    if (existingUser) {
      throw new Error("Email already in use");
    }

    return await prisma.user.create({
      data: parsedUser.data,
    });
  }

  async updateUser(id: number, updatedUser: Partial<UserSchema>) {
    const parsedUser = partialUserSchema.safeParse(updatedUser);

    if (!parsedUser.success) {
      throw new Error(`Validation error: ${parsedUser.error.message}`);
    }

    return await prisma.user.update({
      where: { id },
      data: parsedUser.data,
    });
  }

  async deleteUser() {
    return "Hello User World!";
  }
}

export const UserServices = new userServices();

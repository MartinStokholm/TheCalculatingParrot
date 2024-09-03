import { User } from "@prisma/client";
import prisma from "../config/db.config";
import { UserSchema, userSchema } from "../models/user.schema";

class userServices {
  async createUser(newUser: UserSchema) {
    const parsedUser = userSchema.safeParse(newUser);

    if (!parsedUser.success) {
      throw new Error(`Validation error: ${parsedUser.error.message}`);
    }

    // Check if the email is unique
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

  async getUsers() {
    return await prisma.user.findMany();
  }

  async getUser(id: number) {
    return await prisma.user.findUnique({
      where: { id },
    });
  }

  async updateUser(id: number, updatedUser: Partial<UserSchema>) {
    return await prisma.user.update({
      where: { id },
      data: updatedUser,
    });
  }

  async deleteUser() {
    return "Hello User World!";
  }
}

export const UserServices = new userServices();

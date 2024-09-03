import { UserServices } from "../services/user.services";
import { NextFunction, Request, Response } from "express";

class userController {
  // Get all users
  getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await UserServices.getUsers();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  };

  // Get a user by id
  getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = parseInt(req.params.id, 10);
      const user = await UserServices.getUser(userId);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      next(error);
    }
  };

  // Create new user with auto-generated id
  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await UserServices.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  };

  // Update a user by id
  updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = parseInt(req.params.id, 10);
      const updatedUser = req.body;
      const user = await UserServices.updateUser(userId, updatedUser);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };
}

//export class
export const UserController = new userController();

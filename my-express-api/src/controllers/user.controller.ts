import { UserService } from "../services/user.services";
import { NextFunction, Request, Response } from "express";
import { Service, Inject } from "typedi";

@Service()
export class UserController {
  constructor(@Inject() private userService: UserService) {}

  // Get all users
  getUsers = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.userService.getUsers();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  };

  // Get a user by id
  getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = parseInt(req.params.id, 10);
      const user = await this.userService.getUser(userId);
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
      const user = await this.userService.createUser(req.body);
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
      const user = await this.userService.updateUser(userId, updatedUser);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };
}

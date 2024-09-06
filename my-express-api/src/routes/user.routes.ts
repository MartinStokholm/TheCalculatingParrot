import express from "express";
import { Container } from "typedi";
import { UserController } from "../controllers/user.controller";

export const router = express.Router();

const userController = Container.get(UserController);

router.get("/", async (_req, _res, _next) => {
  try {
    const users = await userController.getUsers();
    return _res.status(200).json(users);
  } catch (error) {
    return _next(error);
  }
});

router.get("/:id", async (_req, _res, _next) => {
  try {
    const user = await userController.getUser(Number(_req.params.id));
    return _res.status(200).json(user);
  } catch (error) {
    return _next(error);
  }
});

router.post("/", async (_req, _res, _next) => {
  try {
    const user = await userController.createUser(_req.body);
    return _res.status(201).json(user);
  } catch (error) {
    return _next(error);
  }
});

router.put("/:id", async (_req, _res, _next) => {
  try {
    const user = await userController.updateUser(
      Number(_req.params.id),
      _req.body
    );
    return _res.status(200).json(user);
  } catch (error) {
    return _next(error);
  }
});

import express from "express";
import { Container } from "typedi";
import { UserController } from "../controllers/user.controller";
import { verifyToken } from "../middleware/auth.middelware";

export const router = express.Router();

const userController = Container.get(UserController);

router.get("/", verifyToken, async (_req, _res, _next) => {
  try {
    const users = await userController.getUsers();
    return _res.status(200).json(users);
  } catch (error) {
    return _next(error);
  }
});

router.get("/:id", verifyToken, async (_req, _res, _next) => {
  try {
    const user = await userController.getUser(_req.params.id);
    return _res.status(200).json(user);
  } catch (error) {
    return _next(error);
  }
});

router.put("/:id", verifyToken, async (_req, _res, _next) => {
  try {
    const user = await userController.updateUser(_req.params.id, _req.body);
    return _res.status(200).json(user);
  } catch (error) {
    return _next(error);
  }
});

router.delete("/:id", verifyToken, async (_req, _res, _next) => {
  try {
    const user = await userController.deleteUser(_req.params.id);
    return _res.status(204).json(user);
  } catch (error) {
    return _next(error);
  }
});

router.post("/register", async (_req, _res, _next) => {
  try {
    const user = await userController.createUser(_req.body);
    return _res.status(201).json(user);
  } catch (error) {
    return _next(error);
  }
});

router.post("/login", async (_req, _res, _next) => {
  try {
    const token = await userController.login(_req.body);
    return _res.status(200).json(token);
  } catch (error) {
    return _next(error);
  }
});

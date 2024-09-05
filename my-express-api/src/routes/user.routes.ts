import express from "express";
import { Container } from "typedi";
import { UserController } from "../controllers/user.controller";

export const router = express.Router();

const userController = Container.get(UserController);

router.get("/", (req, res, next) => userController.getUsers(req, res, next));
router.get("/:id", (req, res, next) => userController.getUser(req, res, next));
router.post("/", (req, res, next) => userController.createUser(req, res, next));
router.put("/:id", (req, res, next) =>
  userController.updateUser(req, res, next)
);

import express from "express";
import { UserController } from "../controllers/user.controller";

export const router = express.Router();

router.get("/", UserController.getUsers);
router.post("/", UserController.createUser);
router.get("/:id", UserController.getUser);
router.put("/:id", UserController.updateUser);

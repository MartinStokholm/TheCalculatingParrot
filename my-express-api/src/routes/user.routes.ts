import express from "express";
import { UserController } from "../controllers/user.controller";

export const router = express.Router();

router.get("/", UserController.getUsers);
router.get("/:id", UserController.getUser);
router.post("/", UserController.createUser);
router.put("/:id", UserController.updateUser);

import { db } from "../config/db.config";
import express from "express";

const router = express.Router();

// GET /users
router.get("/", async (req, res) => {
  try {
    const users = await db.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

// POST /users
router.post("/", async (req, res) => {
  const { name, email } = req.body;

  try {
    const user = await db.user.create({
      data: {
        name,
        email,
      },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

export { router as userRouter };

import { db } from "../config/db.config";
import express from "express";

const router = express.Router();

// GET /budgets
router.get("/", async (req, res) => {
  try {
    const budget = await db.budget.findMany();
    res.json(budget);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

// POST /budgets
router.post("/", async (req, res) => {
  const { name, startingCapital, savings, userId } = req.body;

  try {
    const budget = await db.budget.create({
      data: {
        name,
        startingCapital,
        savings,
        userId,
      },
    });
    res.json(budget);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

export { router as budgetRouter };

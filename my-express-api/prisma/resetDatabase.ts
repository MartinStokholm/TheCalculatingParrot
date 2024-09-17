import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function resetDatabase() {
  try {
    // Delete all line items
    await prisma.lineItem.deleteMany({});
    console.log("Deleted all line items");

    // Delete all budgets
    await prisma.budget.deleteMany({});
    console.log("Deleted all budgets");

    // Delete all users
    await prisma.user.deleteMany({});
    console.log("Deleted all users");

    // Delete all categories
    await prisma.category.deleteMany({});
    console.log("Deleted all categories");

    console.log("Database reset successfully");
  } catch (error) {
    console.error("Error resetting database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

resetDatabase();

import { PrismaClient, Recurrence, Currency } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Create categories
  const category1 = await prisma.category.create({
    data: {
      id: "ctg_1",
      name: "Groceries",
      description: "Expenses for groceries",
      colorHex: "#FF5733",
    },
  });

  const category2 = await prisma.category.create({
    data: {
      id: "ctg_2",
      name: "Utilities",
      description: "Expenses for utilities",
      colorHex: "#33FF57",
    },
  });

  const category3 = await prisma.category.create({
    data: {
      id: "ctg_3",
      name: "Entertainment",
      description: "Expenses for entertainment",
      colorHex: "#3357FF",
    },
  });

  const category4 = await prisma.category.create({
    data: {
      id: "ctg_4",
      name: "Uncategorized",
      description: "Expenses that are uncategorized",
      colorHex: "#000000",
    },
  });

  // Hash the password
  const hashedPassword = await bcrypt.hash("skrtskrt", 10);

  // Create a user
  const user = await prisma.user.create({
    data: {
      id: "usr_1",
      email: "zebra@mail.com",
      name: "Zumba Zebra",
      password: hashedPassword, // Store the hashed password
      isVerified: true,
    },
  });

  // Create a budget
  const budget = await prisma.budget.create({
    data: {
      id: "bgt_1",
      name: "Monthly Budget",
      startingCapital: 5000,
      savings: 1000,
      userId: user.id,
    },
  });

  // Create line items
  await prisma.lineItem.createMany({
    data: [
      {
        id: "lnt_1",
        name: "Grocery Shopping",
        amount: -400,
        currency: Currency.DKK,
        recurrence: Recurrence.MONTHLY,
        categoryId: category1.id,
        budgetId: budget.id,
      },
      {
        id: "lnt_2",
        name: "Electricity Bill",
        amount: -358,
        currency: Currency.DKK,
        recurrence: Recurrence.MONTHLY,
        categoryId: category2.id,
        budgetId: budget.id,
      },
      {
        id: "lnt_3",
        name: "Movie Tickets",
        amount: -50,
        currency: Currency.DKK,
        recurrence: Recurrence.ONCE,
        categoryId: category3.id,
        budgetId: budget.id,
      },
      {
        id: "lnt_4",
        name: "A good time",
        amount: -420,
        currency: Currency.DKK,
        recurrence: Recurrence.ONCE,
        categoryId: category4.id,
        budgetId: budget.id,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { z } from "zod";
import { lineItemSchema } from "./lineitem.schema";

// Define the schema for Budget
export const budgetSchema = z.object({
  id: z.string().optional(), // id is optional because it is auto-generated
  name: z.string().min(1, "Name is required"),
  startingCapital: z
    .number()
    .min(0, "Starting capital must be a positive number"),
  savings: z.number().min(0, "Savings must be a positive number"),
  lineItems: z.array(lineItemSchema).optional(), // lineItems is optional
  userId: z.string().min(1, "User ID is required"),
});

export const partialBudgetSchema = budgetSchema.partial();

export type BudgetSchema = z.infer<typeof budgetSchema>;
export type PartialBudgetSchema = z.infer<typeof partialBudgetSchema>;

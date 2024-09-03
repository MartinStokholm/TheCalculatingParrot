import { z } from "zod";

// Define the schema for LineItem
export const lineItemSchema = z.object({
  id: z.number().optional(), // id is optional because it is auto-generated
  name: z.string().min(1, "Name is required"),
  amount: z.number().min(0, "Amount must be a positive number"),
  categoryId: z.number().min(1, "Category ID is required"),
  budgetId: z.number().min(1, "Budget ID is required"),
});

// Define the schema for Budget
export const budgetSchema = z.object({
  id: z.number().optional(), // id is optional because it is auto-generated
  name: z.string().min(1, "Name is required"),
  startingCapital: z
    .number()
    .min(0, "Starting capital must be a positive number"),
  savings: z.number().min(0, "Savings must be a positive number"),
  lineItems: z.array(lineItemSchema).optional(), // lineItems is optional
  userId: z.number().min(1, "User ID is required"),
});

export const partialBudgetSchema = budgetSchema.partial();

// Export the inferred types for type safety and reusability
export type LineItemSchema = z.infer<typeof lineItemSchema>;
export type BudgetSchema = z.infer<typeof budgetSchema>;
export type PartialBudgetSchema = z.infer<typeof partialBudgetSchema>;

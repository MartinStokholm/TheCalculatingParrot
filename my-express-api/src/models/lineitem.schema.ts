import { z } from "zod";

// Define the schema for LineItem
export const lineItemSchema = z.object({
  id: z.number().optional(), // id is optional because it is auto-generated
  name: z.string().min(1, "Name is required"),
  amount: z.number().min(0, "Amount must be a positive number"),
  categoryId: z.number().min(1, "Category ID is required"),
  budgetId: z.string().min(1, "Budget ID is required"),
});

export const createLineItemSchema = lineItemSchema.omit({ budgetId: true });

export type LineItemSchema = z.infer<typeof lineItemSchema>;
export type CreateLineItemSchema = z.infer<typeof createLineItemSchema>;

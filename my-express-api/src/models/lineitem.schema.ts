import { Currency, Recurrence } from "@prisma/client";
import { z } from "zod";

// Define the schema for LineItem
export const lineItemSchema = z.object({
  id: z.string().optional(), // id is optional because it is auto-generated
  name: z.string().min(1, "Name is required"),
  amount: z.number(),
  categoryId: z.string().optional(),
  currency: z.nativeEnum(Currency), // Ensure this matches the Prisma Currency type
  recurrence: z.nativeEnum(Recurrence).optional(),
  budgetId: z.string().min(1, "Budget ID is required"),
});

export const createLineItemSchema = lineItemSchema.omit({ budgetId: true });

export type LineItemSchema = z.infer<typeof lineItemSchema>;
export type CreateLineItemSchema = z.infer<typeof createLineItemSchema>;

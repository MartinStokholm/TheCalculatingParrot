import { LineItem } from "@prisma/client";

export interface BudgetCreate {
  name: string;
  startingCapital: number;
}

// Define the type for the budget with nested line items
export interface BudgetWithLineItems {
  id: string;
  name: string;
  startingCapital: number;
  savings: number;
  userId: string;
  lineItems: LineItem[];
}

export type BudgetCreateBody = BudgetCreate;
// Define a type that can be either the BudgetWithLineItems or null
export type BudgetResponse = BudgetWithLineItems | null;

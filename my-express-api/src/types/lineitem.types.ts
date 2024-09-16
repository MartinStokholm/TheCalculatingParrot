import { Currency, Recurrence } from "@prisma/client";
import { CategoryNoId } from "./category.types";

export interface LineitemNoId {
  recurrence: Recurrence | null;
  currency: Currency;
  amount: number;
  name: string;
  category: CategoryNoId;
}

export interface LineItemWithCategory {
  id: string;
  recurrence: Recurrence | null;
  currency: Currency;
  amount: number;
  name: string;
  category: CategoryNoId | null;
  categoryId: string;
}

export interface LineItemCreate {
  name: string;
  amount: number;
  currency: Currency;
  recurrence?: Recurrence;
  categoryId: string;
}

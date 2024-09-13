import { Currency, Recurrence } from "@prisma/client";

export interface LineitemNoId {
  recurrence: Recurrence | null;
  currency: Currency;
  amount: number;
  name: string;
  categoryId: string | null;
}

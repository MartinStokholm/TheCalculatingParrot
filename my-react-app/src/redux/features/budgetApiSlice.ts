import api from "../api/apiSlice"; // Import base API slice
import { Budget } from "shared/dist/types";

const budgetsApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getBudgets: builder.query<Budget[], void>({
      query: () => "budgets",
    }),
    // Add more budget-related endpoints if needed
  }),
  overrideExisting: false,
});

export const { useGetBudgetsQuery } = budgetsApiSlice;

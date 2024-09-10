import { Budget } from "shared/dist/types";
import api from "../api/apiSlice"; // Import base API slice

const budgetsApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getBudgets: builder.query<Budget[], void>({
      query: () => "budgets",
    }),
    // Add more budget-related endpoints if needed
  }),
  overrideExisting: false, // Avoid overriding existing endpoints
});

export const { useGetBudgetsQuery } = budgetsApiSlice;

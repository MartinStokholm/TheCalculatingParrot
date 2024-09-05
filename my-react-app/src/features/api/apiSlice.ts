import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  User,
  Budget,
  LineItem,
  Category,
  Reacurring,
} from "shared/dist/types";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "users",
    }),
    getBudgets: builder.query<Budget[], void>({
      query: () => "budgets",
    }),
    // Add more endpoints as needed
  }),
});

export const { useGetUsersQuery, useGetBudgetsQuery } = api;
export default api;

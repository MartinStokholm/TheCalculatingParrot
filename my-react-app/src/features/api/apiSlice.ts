import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User, Budget, Category } from "shared/dist/types";

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
    getCategory: builder.query<Category[], void>({
      query: () => "categories",
    }),
    // Add more endpoints as needed
  }),
});

export const { useGetUsersQuery, useGetBudgetsQuery } = api;
export default api;

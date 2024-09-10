import api from "../api/apiSlice";
import { User } from "shared/dist/types";

const userApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<string, { email: string; password: string }>({
      query: (credentials) => ({
        url: "users/login",
        method: "POST",
        body: credentials,
      }),
    }),
    getUser: builder.query<User | null, string>({
      query: (userId) => `users/${userId}`,
    }),
  }),
  overrideExisting: false,
});

export const { useGetUserQuery, useSignInMutation } = userApiSlice;

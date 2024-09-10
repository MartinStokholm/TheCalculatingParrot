import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../../utils/jwt.utils";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:7070/api/",
  prepareHeaders: (headers) => {
    const token = getToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const api = createApi({
  reducerPath: "api",
  baseQuery, // Shared base query
  endpoints: () => ({}), // Empty to allow for endpoint injection
});

export default api;
export { baseQuery };

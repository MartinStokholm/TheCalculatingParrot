import { configureStore } from "@reduxjs/toolkit";
import { calculatingParrotApi } from "./api/apiSlice";
import authReducer from "./api/authSlice";

export const store = configureStore({
  reducer: {
    [calculatingParrotApi.reducerPath]: calculatingParrotApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(calculatingParrotApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

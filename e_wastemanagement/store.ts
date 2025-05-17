import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import { authApi } from "./app/_api_query/authApi";
import { sellApi } from "./app/_api_query/sellApi";
import { couponApi } from './app/_api_query/couponApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [sellApi.reducerPath]: sellApi.reducer,
    [couponApi.reducerPath]: couponApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      sellApi.middleware,
      couponApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
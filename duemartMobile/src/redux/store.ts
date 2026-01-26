import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducers";
import cartReducer from "./reducers/cartReducers";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
});

// 🔥 Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const selectAuth = (state: RootState) => state.auth;
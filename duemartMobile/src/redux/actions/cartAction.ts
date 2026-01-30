// src/redux/cartAction.ts

import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { RootState } from "../store";

// 🔐 Cart Item Type
export interface CartItem {
  id: string; // Mongo _id = string
  name: string;
  price: number;
  quantity: number;
}

const CART_KEY = "cart_items";

// 🔹 ADD TO CART
export const addToCartService = createAsyncThunk<
  CartItem,
  CartItem,
  { state: RootState; rejectValue: string }
>("cart/add", async (item, { getState, rejectWithValue }) => {
  try {
    const state = getState().cart;
    const updatedCart = [...state.items, item];

    await AsyncStorage.setItem(CART_KEY, JSON.stringify(updatedCart));

    return item;
  } catch {
    return rejectWithValue("Failed to add to cart");
  }
});

// 🔹 REMOVE FROM CART
export const removeFromCartService = createAsyncThunk<
  string,
  string,
  { state: RootState; rejectValue: string }
>("cart/remove", async (id, { getState, rejectWithValue }) => {
  try {
    const state = getState().cart;
    const updatedCart = state.items.filter((item: CartItem) => item.id !== id);

    await AsyncStorage.setItem(CART_KEY, JSON.stringify(updatedCart));

    return id;
  } catch {
    return rejectWithValue("Failed to remove item");
  }
});

// 🔹 CLEAR CART
export const clearCartService = createAsyncThunk<
  boolean,
  void,
  { rejectValue: string }
>("cart/clear", async (_, { rejectWithValue }) => {
  try {
    await AsyncStorage.removeItem(CART_KEY);
    return true;
  } catch {
    return rejectWithValue("Failed to clear cart");
  }
});

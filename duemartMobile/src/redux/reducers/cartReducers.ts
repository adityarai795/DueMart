import { createSlice } from "@reduxjs/toolkit";
 interface CartItem {
   id: string; // Mongo _id = string
   name: string;
   price: number;
   quantity: number;
}
import {
  addToCartService,
  removeFromCartService,
  clearCartService,
} from "../actions/cartAction";

interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // ADD
      .addCase(addToCartService.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCartService.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addToCartService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Add to cart failed";
      })

      // REMOVE
      .addCase(removeFromCartService.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })

      // CLEAR
      .addCase(clearCartService.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export default cartSlice.reducer;

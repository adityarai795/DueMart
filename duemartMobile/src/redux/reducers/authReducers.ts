import { createSlice } from "@reduxjs/toolkit";
import { loginService } from "../actions/authAction";

const initialState = {
  user: null,
  token: null,
  isLoggedIn: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginService.fulfilled, (state:any, action:any) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isLoggedIn = true;
      })
      .addCase(loginService.rejected, (state:any, action:any) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      });
      
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

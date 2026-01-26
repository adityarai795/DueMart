import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

type LoginPayload = {
  email: string;
  password: string;
};

type LoginResponse = {
  user: any;
  token: string;
};

type SignupPayload = {
  name: string;
  email: string;
  password: string;
};
type SignupResponse = {
  user: any;
  token: string;
};
export const loginService = createAsyncThunk<
  LoginResponse, // ✅ Return type
  LoginPayload, // ✅ Input type
  { rejectValue: string }
>("auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await api.post("/customers/login", { email, password });

    await AsyncStorage.setItem("token", response.data.token);

    return {
      user: response.data.user,
      token: response.data.token,
    };
  } catch (error) {
    return rejectWithValue("Invalid email or password");
  }
});

export const signupService = createAsyncThunk<
  SignupResponse,
  SignupPayload,
  { rejectValue: string }
>("auth/signup", async ({ name, email, password }, { rejectWithValue }) => {
  try {
    const response = await api.post("/customers/register", {
         name,
         email,
         password,
         address: "123 Main St, City",
         mobileno: "9876543210",
       });
    return {
      user: response.data.user,
      token: response.data.token,
    };
  } catch (error) {
    return rejectWithValue("Signup failed");
  }
});

export const logoutService = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await AsyncStorage.removeItem("token");
      return true;
    } catch (error) {
      return rejectWithValue("Logout failed");
    }
  },
);

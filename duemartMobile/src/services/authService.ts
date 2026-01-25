import api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const loginService = async (email: string, password: string) => {
  try {
    const response = await api.post(
      "http://192.168.1.35:4000/customers/login",
      {
        email,
        password,
      },
    );
        await AsyncStorage.setItem("token", response.data.token);
    // localStorage.setItem("token", );
    return response.data;
  } catch (error) {
    console.error("Login error 1:", error);
    throw error;
  }
};

export const signupService = async (
  name: string,
  email: string,
  password: string,
) => {
  try {
    const response = await api.post("/auth/signup", {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

export const logoutService = async () => {
  try {
    await AsyncStorage.removeItem("token");
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  } 
};
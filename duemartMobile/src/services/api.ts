import axios from "axios";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL =
  Platform.OS === "web" ? "http://localhost:4000" : "http://192.168.1.35:4000"; // your PC IP for mobile

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Auto attach token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // 🔥 This prevents ghost token
      delete config.headers?.Authorization;
    }

    return config;
  },
  (error) => Promise.reject(error),
);


export default api;

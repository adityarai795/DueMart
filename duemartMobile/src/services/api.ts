import axios from "axios";
import { Platform } from "react-native";

const BASE_URL =
  Platform.OS === "web"
    ? "http://localhost:4000/"
    : "http://192.168.3.181:4000/";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

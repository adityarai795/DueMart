import api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getProfileService = async () => {
  try {
    const response = await api.get("/customers/profile");
    return response.data;
  } catch (error) {
    console.error("Get profile error:", error);
    throw error;
  }
};

import { api } from "./api";


export const getProfile = async () => {
  try {
    const response = await api.get("/customers/profile");
    return response.data;
  } catch (error) {
    throw error;
  } 
};
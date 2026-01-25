import { api } from "./api";

export const loginService = async (email: string, password: string) => {
  try {
    const response = await api.post("/customers/login", { email, password });
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logoutService = async () => {
  try {
    localStorage.removeItem("token");
    return true;
  } catch (error) {
    throw error;
  }
};
export const registerService = async (
  name: string,
  email: string,
  password: string
) => {
  try { 
    const response = await api.post("/auth/register", { name, email, password });
    return response.data;
  }
  catch (error) {
    throw error;
  }
};

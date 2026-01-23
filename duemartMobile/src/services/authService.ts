import api from "./api";

export const loginService = async (email: string, password: string) => {
  try {
    const response = await api.post("http://localhost:4000/customers/login", {
      email,
      password,
    });
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
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

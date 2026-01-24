import api from "./api";

export const loginService = async (email: string, password: string) => {
  try {
    const response = await api.post(
      "http://192.168.3.181:4000/customers/login",
      {
        email,
        password,
      },
    );
    // localStorage.setItem("token", response.data.token);
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

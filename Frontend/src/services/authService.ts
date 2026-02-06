import { api } from "./api";

interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  customer: {
    customer_id: string;
    name: string;
    email: string;
  };
}

interface SignupResponse {
  success: boolean;
  message: string;
  customer_id: string;
}

interface ProfileResponse {
  success: boolean;
  message: string;
  customer: {
    _id: string;
    name: string;
    email: string;
    address: string;
    mobileno: string;
  };
}

export const loginService = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>("/customers/login", {
      email,
      password,
    });

    if (response.data.success) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("customer", JSON.stringify(response.data.customer));
    }

    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Login failed";
    throw new Error(message);
  }
};

export const registerService = async (
  name: string,
  email: string,
  password: string,
  mobileno: string
): Promise<SignupResponse> => {
  try {
    const response = await api.post<SignupResponse>("/customers/register", {
      name,
      email,
      password,
      mobileno,
    });

    if (response.data.success) {
      // Auto-login after signup
      await loginService(email, password);
    }

    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Signup failed";
    throw new Error(message);
  }
};

export const logoutService = async (): Promise<void> => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      await api.post("/customers/logout");
    }
    localStorage.removeItem("token");
    localStorage.removeItem("customer");
  } catch (error: any) {
    console.error("Logout error:", error);
    // Clear local storage even if logout request fails
    localStorage.removeItem("token");
    localStorage.removeItem("customer");
  }
};

export const getProfileService = async (): Promise<ProfileResponse> => {
  try {
    const response = await api.get<ProfileResponse>("/customers/profile");
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch profile";
    throw new Error(message);
  }
};

export const updateProfileService = async (updateData: {
  name?: string;
  address?: string;
  mobileno?: string;
}): Promise<ProfileResponse> => {
  try {
    const response = await api.put<ProfileResponse>(
      "/customers/profile",
      updateData
    );
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to update profile";
    throw new Error(message);
  }
};


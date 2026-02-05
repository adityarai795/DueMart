import { api } from "./api";

const productService = {
  // Fetch all products
  getAllProducts: async () => {
    try {
      const response = await api.get("/products");
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch products",
      );
    }
  },
};

export { productService };
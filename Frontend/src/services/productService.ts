import { api } from "./api";

const productService = {
  // Fetch all products
  getAllProducts: async ({ page, limit }: { page: number; limit: number }) => {
    try {
      const response = await api.get("/products", {
        params: { page, limit },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch products",
      );
    }
  },
};

export { productService };
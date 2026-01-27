import api from "./api";


export const getProductsService = async () => {
  try {
    const response = await api.get("/products");
    return response.data;
  } catch (error) {
    console.error("Get products error:", error);
    throw error;
  }
};
export const getProductByIdService = async (productId: string) => {
  try {
    const response = await api.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Get product by ID error:", error);
    throw error;
  }
};
export const getProductsByCategoryService = async (category: string) => {
  try {
    const response = await api.get(`/products/category/${category}`);
    return response.data;
  } catch (error) {
    console.error("Get products by category error:", error);
    throw error;
  }
};
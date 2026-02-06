import { api } from "./api";

export const orderService = {
  // Create order and get Razorpay order details
  createOrder: async (delivery_address: string, items: any[]) => {
    try {
      const response = await api.post("/orders/create", {
        delivery_address,
        items: items.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to create order",
      );
    }
  },

  // Verify payment with Razorpay signature
  verifyPayment: async (paymentData: any) => {
    try {
      const response = await api.post("/orders/verify-payment", paymentData);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to verify payment",
      );
    }
  },

  // Get customer orders (protected - uses auth token)
  getCustomerOrders: async () => {
    try {
      const response = await api.get("/orders/customer");
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch orders",
      );
    }
  },

  // Get order by ID
  getOrderById: async (orderId: string) => {
    try {
      const response = await api.get(`/orders/${orderId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to fetch order");
    }
  },
};

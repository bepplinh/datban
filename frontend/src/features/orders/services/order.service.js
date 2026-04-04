import api from "@/shared/services/api";

export const orderService = {
  createOrder: async (payload) => {
    try {
      const response = await api.post("/orders", payload);
      return response.data;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  },

  addItems: async (items) => {
    try {
      const response = await api.post("/orders/items", { items });
      return response.data;
    } catch (error) {
      console.error("Error adding items to order:", error);
      throw error;
    }
  },

  getOrderStatus: async () => {
    try {
      const response = await api.get("/orders/status");
      return response.data;
    } catch (error) {
      // If no order exists, it might return 404, which is fine
      if (error.response?.status === 404) {
        return null;
      }
      console.error("Error getting order status:", error);
      throw error;
    }
  },
};

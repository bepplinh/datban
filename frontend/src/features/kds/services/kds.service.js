import api from "@/shared/services/api";

export const kdsService = {
  getQueue: async () => {
    const response = await api.get("/kitchen/queue");
    // Returns a list of OrderItems
    return response.data?.data || response.data;
  },

  updateItemStatus: async (itemId, status) => {
    const response = await api.patch(`/kitchen/items/${itemId}/status`, {
      status,
    });
    return response.data?.data || response.data;
  },
};

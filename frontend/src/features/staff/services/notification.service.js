import api from "@/shared/services/api";

export const notificationService = {
  getPendingRequests: async () => {
    const response = await api.get("/service-requests/pending");
    return response.data;
  },

  resolveRequest: async (id) => {
    const response = await api.patch(`/service-requests/${id}/resolve`);
    return response.data;
  },
};

import api from "@/shared/services/api";

export const serviceRequestAPI = {
  createRequest: async (tableId, type) => {
    const response = await api.post("/service-requests", { tableId, type });
    return response.data;
  },
};

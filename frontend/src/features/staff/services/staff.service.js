import api from "@/shared/services/api";

export const staffService = {
  getTables: async () => {
    const response = await api.get(`/staff/tables`);
    return response.data?.data || response.data;
  },
  getOrdersByTable: async (tableId) => {
    const response = await api.get(`/staff/tables/${tableId}/orders`);
    return response.data?.data || response.data;
  },

  openTable: async (tableId) => {
    const response = await api.post(`/staff/tables/${tableId}/open`);
    return response.data;
  },

  closeTable: async (tableId) => {
    const response = await api.post(`/staff/tables/${tableId}/close`);
    return response.data;
  },

  addOrderItems: async (tableId, items) => {
    const response = await api.post(`/staff/tables/${tableId}/orders`, {
      items,
    });
    return response.data;
  },
};

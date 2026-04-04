import api from "../../../shared/services/api";

export const adminOrderService = {
  getOrders: async (params) => {
    const res = await api.get("/admin/orders", { params });
    return res;
  },
  getOrderById: async (id) => {
    const res = await api.get(`/admin/orders/${id}`);
    return res;
  },
  updateOrderStatus: async (id, status) => {
    const res = await api.put(`/admin/orders/${id}/status`, { status });
    return res;
  },
};

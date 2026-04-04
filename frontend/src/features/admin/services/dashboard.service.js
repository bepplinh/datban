import api from "../../../shared/services/api";

export const dashboardService = {
  getRevenueStats: async (params) => {
    const res = await api.get("/admin/stats/revenue", { params });
    return res;
  },
  getBestSelling: async (limit) => {
    const res = await api.get("/admin/stats/best-selling", {
      params: { limit },
    });
    return res;
  },
  getSummary: async () => {
    const res = await api.get("/admin/stats/summary");
    return res;
  },
  getRevenueChartData: async (frequency) => {
    const res = await api.get("/admin/stats/revenue-chart", {
      params: { frequency },
    });
    return res;
  },
};

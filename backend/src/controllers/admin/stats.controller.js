import { adminService } from "../../services/admin.service.js";

export const statsController = {
  getRevenueStats: async (req, res, next) => {
    try {
      const { from, to } = req.query;
      const stats = await adminService.getRevenueStats(from, to);
      res.json({ data: stats });
    } catch (err) {
      next(err);
    }
  },

  getBestSellingProducts: async (req, res, next) => {
    try {
      const limit = parseInt(req.query.limit) || 10;
      const stats = await adminService.getBestSellingProducts(limit);
      res.json({ data: stats });
    } catch (err) {
      next(err);
    }
  },

  getDashboardSummary: async (req, res, next) => {
    try {
      const summary = await adminService.getDashboardSummary();
      res.json({ data: summary });
    } catch (err) {
      next(err);
    }
  },

  getRevenueChartData: async (req, res, next) => {
    try {
      const { frequency } = req.query; // 'day' or 'month'
      const data = await adminService.getRevenueChartData(frequency);
      res.json({ data });
    } catch (err) {
      next(err);
    }
  },
};

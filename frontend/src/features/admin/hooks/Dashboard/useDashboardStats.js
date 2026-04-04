import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../../services/dashboard.service";

export const useRevenueStats = (params) => {
  return useQuery({
    queryKey: ["admin-revenue", params],
    queryFn: () => dashboardService.getRevenueStats(params),
  });
};

export const useBestSelling = (limit) => {
  return useQuery({
    queryKey: ["admin-best-selling"],
    queryFn: () => dashboardService.getBestSelling(limit),
  });
};

export const useDashboardSummary = () => {
  return useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: dashboardService.getSummary,
  });
};

export const useRevenueChartData = (frequency = "month") => {
  return useQuery({
    queryKey: ["admin-revenue-chart", frequency],
    queryFn: () => dashboardService.getRevenueChartData(frequency),
  });
};

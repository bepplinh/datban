import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminOrderService } from "../../services/adminOrder.service";
import { toast } from "sonner";

export const useAdminOrders = (params) => {
  return useQuery({
    queryKey: ["admin-orders", params],
    queryFn: () => adminOrderService.getOrders(params),
    keepPreviousData: true,
  });
};

export const useAdminOrderDetails = (id, enabled = false) => {
  return useQuery({
    queryKey: ["admin-order", id],
    queryFn: () => adminOrderService.getOrderById(id),
    enabled: enabled && !!id,
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }) =>
      adminOrderService.updateOrderStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      // Invalidate specific order if needed
      toast.success("Cập nhật trạng thái đơn hàng thành công!");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Lỗi khi cập nhật trạng thái",
      );
    },
  });
};

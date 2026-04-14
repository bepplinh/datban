import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { socket } from "@/shared/lib/socketConfig";
import { staffService } from "../services/staff.service";
import useNotificationStore from "../store/useNotificationStore";
import { toast } from "sonner";

export const tableQueryKeys = {
  orders: (tableId) => ["table", tableId, "orders"],
  tables: () => ["staff", "tables"],
  serviceRequests: () => ["staff", "service-requests"],
};

export function useTables() {
  const queryClient = useQueryClient();
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: tableQueryKeys.tables(),
    queryFn: () => staffService.getTables(),
    staleTime: 30_000,
  });

  useEffect(() => {
    socket.emit("join-room", "staff-room");

    // Initial fetch for notifications
    useNotificationStore.getState().fetchPendingRequests();

    const handleNewOrder = (order) => {
      toast.info(`Đơn hàng mới tại ${order.table.name}`, {
        description: `Mã đơn: ${order.id.slice(-4).toUpperCase()}`,
      });
      queryClient.invalidateQueries({ queryKey: tableQueryKeys.tables() });
    };

    const handleDishReady = ({ tableId, item }) => {
      queryClient.invalidateQueries({ queryKey: tableQueryKeys.tables() });
      queryClient.invalidateQueries({
        queryKey: tableQueryKeys.orders(tableId),
      });
    };

    const handleServiceRequest = (request) => {
      toast.warning(`Yêu cầu hỗ trợ: ${request.table.name}`, {
        description:
          request.type === "CALL_STAFF"
            ? "Gọi nhân viên"
            : "Yêu cầu thanh toán",
      });
      useNotificationStore.getState().addNotification(request);
      queryClient.invalidateQueries({
        queryKey: tableQueryKeys.serviceRequests(),
      });
    };

    socket.on("new_order", handleNewOrder);
    socket.on("dish_ready", handleDishReady);
    socket.on("new_service_request", handleServiceRequest);
    socket.on("service_request_resolved", ({ id }) => {
      useNotificationStore.getState().removeNotification(id);
      queryClient.invalidateQueries({
        queryKey: tableQueryKeys.serviceRequests(),
      });
    });

    socket.on("table_status_updated", () => {
      queryClient.invalidateQueries({ queryKey: tableQueryKeys.tables() });
    });

    return () => {
      socket.off("new_order", handleNewOrder);
      socket.off("dish_ready", handleDishReady);
      socket.off("new_service_request", handleServiceRequest);
      socket.off("service_request_resolved");
      socket.off("table_status_updated");
    };
  }, [queryClient]);

  return {
    tables: data ?? [],
    isLoading,
    isRefreshing: isFetching && !isLoading,
    refetch,
    isConnected: socket.connected,
  };
}

export function useOpenTable() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ tableId }) => staffService.openTable(tableId),
    onSuccess: (_data, { tableName }) => {
      toast.success(`Đã mở ${tableName}`);
      queryClient.invalidateQueries({ queryKey: tableQueryKeys.tables() });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Lỗi khi mở bàn");
    },
  });
}

export function useTableOrders(tableId) {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: tableQueryKeys.orders(tableId),
    queryFn: () => staffService.getOrdersByTable(tableId),
    select: (data) => ({
      orderId: data?.[0]?.id,
      items: data?.[0]?.items ?? [],
    }),
    enabled: !!tableId,
    staleTime: 30_000,
  });

  return {
    orderId: data?.orderId,
    orders: data?.items ?? [],
    isLoading,
    isRefreshing: isFetching && !isLoading,
    refetch,
  };
}

export function useBaoBep(tableId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (items) => staffService.addOrderItems(tableId, items),
    onSuccess: () => {
      toast.success("Đã báo bếp thành công");
      queryClient.invalidateQueries({
        queryKey: tableQueryKeys.orders(tableId),
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Lỗi khi báo bếp");
    },
  });
}

export function useCloseTable() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tableId) => staffService.closeTable(tableId),
    onSuccess: (_data, tableId) => {
      queryClient.removeQueries({ queryKey: tableQueryKeys.orders(tableId) });
      queryClient.invalidateQueries({ queryKey: tableQueryKeys.tables() });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Lỗi khi đóng bàn");
    },
  });
}

// New hooks for Service Requests
import { notificationService } from "../services/notification.service";

export function useServiceRequests() {
  return useQuery({
    queryKey: tableQueryKeys.serviceRequests(),
    queryFn: () => notificationService.getPendingRequests(),
    select: (res) => res.data || [],
    staleTime: 30_000,
  });
}

export function useResolveRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => notificationService.resolveRequest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: tableQueryKeys.serviceRequests(),
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Lỗi khi xử lý yêu cầu");
    },
  });
}

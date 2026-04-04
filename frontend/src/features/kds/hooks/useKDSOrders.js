import { useMemo, useEffect, useCallback, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { kdsService } from "../services/kds.service";
import { socket } from "@/shared/lib/socketConfig";
import { toast } from "sonner";

export const KDS_STATUSES = {
  PENDING: "PENDING",
  PREPARING: "PREPARING",
  READY: "READY",
  OUT_OF_STOCK: "OUT_OF_STOCK",
};

// UI mapping for columns
export const COLUMN_STATUSES = {
  "CHƯA LÀM": KDS_STATUSES.PENDING,
  "ĐANG CHẾ BIẾN": KDS_STATUSES.PREPARING,
  "ĐÃ XONG": KDS_STATUSES.READY,
};

export const useKDSOrders = () => {
  const queryClient = useQueryClient();
  const [activeFilter, setActiveFilter] = useState("all");

  const {
    data: rawQueue = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["kds", "queue"],
    queryFn: kdsService.getQueue,
    staleTime: 10_000,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ itemId, status }) =>
      kdsService.updateItemStatus(itemId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kds", "queue"] });
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Lỗi khi cập nhật trạng thái");
    },
  });

  // Group OrderItems into "Order Cards" for UI
  const orders = useMemo(() => {
    const orderMap = new Map();

    rawQueue.forEach((item) => {
      // Use the new item.createdAt for grouping batches properly
      const itemTimestamp = item.createdAt || item.order.createdAt;
      const cardKey = `${item.order.id}_${itemTimestamp}`;

      if (!orderMap.has(cardKey)) {
        orderMap.set(cardKey, {
          id: cardKey,
          table: item.order.table.name,
          orderId: item.order.id.slice(-4).toUpperCase(),
          createdAt: new Date(itemTimestamp),
          items: [],
          waitTime: Math.floor((new Date() - new Date(itemTimestamp)) / 60000),
        });
      }

      orderMap.get(cardKey).items.push({
        id: item.id,
        name: item.product.name,
        quantity: item.quantity,
        status: item.status,
        completed: item.status === KDS_STATUSES.READY,
      });
    });

    // The card's final status is calculated based on its items
    const processedOrders = Array.from(orderMap.values()).map((order) => {
      const hasPending = order.items.some(
        (i) => i.status === KDS_STATUSES.PENDING,
      );
      const hasPreparing = order.items.some(
        (i) => i.status === KDS_STATUSES.PREPARING,
      );

      // Card status for UI column filtering
      let cardStatus = KDS_STATUSES.READY;
      if (hasPending) cardStatus = KDS_STATUSES.PENDING;
      else if (hasPreparing) cardStatus = KDS_STATUSES.PREPARING;

      return { ...order, status: cardStatus };
    });

    return processedOrders.sort((a, b) => a.createdAt - b.createdAt);
  }, [rawQueue]);

  // Hook for real-time updates
  useEffect(() => {
    socket.emit("join-room", "kitchen-room");

    const handleUpdate = () => {
      queryClient.invalidateQueries({ queryKey: ["kds", "queue"] });
    };

    socket.on("new_order", handleUpdate);
    socket.on("dish_ready", handleUpdate);
    socket.on("kds_update", handleUpdate); // Adding generic kds_update listener

    return () => {
      socket.off("new_order", handleUpdate);
      socket.off("dish_ready", handleUpdate);
      socket.off("kds_update", handleUpdate);
    };
  }, [queryClient]);

  const updateOrderItemStatus = useCallback(
    (itemId, currentStatus) => {
      let nextStatus = KDS_STATUSES.PREPARING;
      if (currentStatus === KDS_STATUSES.PREPARING)
        nextStatus = KDS_STATUSES.READY;

      updateStatusMutation.mutate({ itemId, status: nextStatus });
    },
    [updateStatusMutation],
  );

  const updateOrderItems = useCallback(
    (order) => {
      // Find items to update in this batch
      const itemsToUpdate = order.items.filter((item) => {
        // If some items are still PENDING, update those to PREPARING first
        if (order.items.some((i) => i.status === KDS_STATUSES.PENDING)) {
          return item.status === KDS_STATUSES.PENDING;
        }
        // Otherwise update PREPARING to READY
        return item.status === KDS_STATUSES.PREPARING;
      });

      itemsToUpdate.forEach((item) => {
        let ns = KDS_STATUSES.PREPARING;
        if (item.status === KDS_STATUSES.PREPARING) ns = KDS_STATUSES.READY;
        updateStatusMutation.mutate({ itemId: item.id, status: ns });
      });
    },
    [updateStatusMutation],
  );

  const getOrdersByColumnStatus = useCallback(
    (colStatus) => {
      // Return orders where at least one item matches the column status
      return orders.filter((order) =>
        order.items.some((item) => item.status === colStatus),
      );
    },
    [orders],
  );

  return {
    orders,
    isLoading,
    isError,
    activeFilter,
    setActiveFilter,
    updateOrderItemStatus,
    updateOrderItems,
    getOrdersByColumnStatus,
    pendingCount: rawQueue.filter((i) => i.status === KDS_STATUSES.PENDING)
      .length,
    isConnected: socket.connected,
  };
};

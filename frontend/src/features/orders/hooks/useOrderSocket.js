import { useEffect } from "react";
import { socket } from "@/shared/lib/socketConfig";
import { toast } from "sonner";
import { useOrderStore } from "../store/useOrderStore";
import { orderService } from "../services/order.service";

export const useOrderSocket = (tableId) => {
  const { setActiveOrder, activeOrder } = useOrderStore();

  useEffect(() => {
    if (!tableId) return;

    socket.emit("join-room", `table-${tableId}`);

    const handleDishReady = ({ tableId: tId, item }) => {
      toast.success(`Món "${item.product.name}" đã hoàn thành!`, {
        description: "Nhân viên sẽ phục vụ bạn ngay.",
        duration: 5000,
      });

      if (activeOrder) {
        orderService.getOrderStatus(tableId).then(setActiveOrder);
      }
    };

    const handleOutOfStock = ({ product }) => {
      toast.error(`Rất tiếc, món "${product.name}" đã hết hàng.`, {
        description: "Chúng tôi đã cập nhật lại đơn hàng của bạn.",
        duration: 8000,
      });

      if (activeOrder) {
        orderService.getOrderStatus(tableId).then(setActiveOrder);
      }
    };

    const handleOrderDelivered = (order) => {
      setActiveOrder(order);
    };

    socket.on("dish_ready", handleDishReady);
    socket.on("out_of_stock", handleOutOfStock);
    socket.on("order_delivered", handleOrderDelivered);

    return () => {
      socket.off("dish_ready", handleDishReady);
      socket.off("out_of_stock", handleOutOfStock);
      socket.off("order_delivered", handleOrderDelivered);
    };
  }, [tableId, activeOrder, setActiveOrder]);

  return { isConnected: socket.connected };
};

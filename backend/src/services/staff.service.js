import { orderRepo } from "../repositories/order.repository.js";
import tableRepo from "../repositories/table.repository.js";
import { sessionRepo } from "../repositories/session.repo.js";
import { NotFoundError, ConflictError } from "../utils/AppError.js";
import { orderService } from "./order.service.js";
import { socketService } from "./socket.service.js";
import { notificationService } from "./notification.service.js";
import prisma from "../libs/prisma.js";

const STATUS_TRANSITIONS = {
  PENDING: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["PREPARING", "CANCELLED"],
  PREPARING: ["READY"],
  READY: ["SERVED"],
  SERVED: ["PAID"],
};

export const staffService = {
  listOrders: async (filters = {}) => {
    return orderRepo.findAll(filters);
  },

  updateOrderStatus: async (orderId, newStatus) => {
    const order = await orderRepo.findById(orderId);
    if (!order) {
      throw new NotFoundError("Order not found");
    }

    const allowedTransitions = STATUS_TRANSITIONS[order.status];
    if (!allowedTransitions || !allowedTransitions.includes(newStatus)) {
      throw new ConflictError(
        `Cannot transition from "${order.status}" to "${newStatus}". Allowed: ${(allowedTransitions || []).join(", ") || "none"}`,
      );
    }

    const { updatedOrder, notification } = await prisma.$transaction(
      async (tx) => {
        const upOrder = await tx.order.update({
          where: { id: orderId },
          data: { status: newStatus },
        });

        let noti = null;
        // If we want a notification when an order is served (delivered)
        if (newStatus === "SERVED") {
          noti = await notificationService.createNotification(
            {
              tableId: upOrder.tableId,
              type: "ORDER_SERVED",
            },
            tx,
          );
        }

        return { updatedOrder: upOrder, notification: noti };
      },
    );

    // Socket Notifications
    if (newStatus === "SERVED") {
      socketService.emitDelivered(updatedOrder.tableId, updatedOrder);
    }

    // Broadcast status change to staff room as well
    socketService.emitToRoom(
      "staff-room",
      "order_status_updated",
      updatedOrder,
    );

    notificationService.emitNotification(notification);

    return updatedOrder;
  },

  getTables: async () => {
    const tables = await prisma.table.findMany({
      include: {
        tablesession: {
          where: { status: "ACTIVE" },
          take: 1,
          include: {
            order: {
              select: { status: true, total: true },
            },
          },
        },
      },
      orderBy: { name: "asc" },
    });

    return tables.map((table) => {
      const activeSession = table.tablesession[0] || null;
      let orderStatus = null;
      let total = 0;
      let sessionTime = null;

      if (activeSession) {
        const diffMs = Date.now() - new Date(activeSession.createdAt).getTime();
        const diffMins = Math.round(diffMs / 60000);
        sessionTime = `${diffMins} phút`;

        if (activeSession.order) {
          orderStatus = activeSession.order.status;
          total = activeSession.order.total;
        }
      }

      return {
        id: table.id,
        name: table.name,
        status: table.status,
        orderStatus,
        sessionTime,
        total,
        hasCall: false,
        hasPaymentRequest: false,
      };
    });
  },

  getOrdersByTable: async (tableId) => {
    const activeSession = await sessionRepo.findActiveSession(tableId);
    if (!activeSession) return [];
    const order = await orderRepo.findOrderWithItems(activeSession.id);
    if (!order) return [];
    return [order]; // frontend expects an array
  },

  openTable: async (tableId) => {
    const table = await tableRepo.findTableById(tableId);
    if (!table) throw new NotFoundError("Table not found");

    if (table.status === "OCCUPIED") {
      throw new ConflictError("Table is already occupied");
    }

    await tableRepo.updateTableStatus(tableId, "OCCUPIED");

    const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000);
    const session = await sessionRepo.createTableSession(tableId, expiresAt);

    // Realtime update for table status
    socketService.emitTableStatusUpdate(tableId, "OCCUPIED");

    return session;
  },

  closeTable: async (tableId) => {
    const table = await tableRepo.findTableById(tableId);
    if (!table) throw new NotFoundError("Table not found");

    if (table.status === "EMPTY") {
      return { message: "Table is already empty" };
    }

    const activeSession = await sessionRepo.findActiveSession(tableId);
    if (activeSession) {
      // Find the order associated with this session
      const order = await orderRepo.findOrderByTableSessionId(activeSession.id);

      // If there's an order that hasn't been paid yet, mark it as paid via cash
      // (This handles the staff clicking "Thanh toán" with Cash)
      if (order && order.status !== "PAID") {
        await prisma.$transaction(async (tx) => {
          await tx.order.update({
            where: { id: order.id },
            data: { status: "PAID" },
          });

          await tx.payment.create({
            data: {
              orderId: order.id,
              method: "CASH",
              status: "SUCCESS",
              amount: order.total,
            },
          });
        });
      }

      await sessionRepo.closeTableSession(activeSession.id);
    }

    await tableRepo.updateTableStatus(tableId, "EMPTY");

    // Realtime update for table status
    socketService.emitTableStatusUpdate(tableId, "EMPTY");

    return { message: "Table closed successfully" };
  },

  addOrderItemsToTable: async (tableId, items) => {
    const activeSession = await sessionRepo.findActiveSession(tableId);
    if (!activeSession) {
      throw new ConflictError("Bàn chưa được mở, không thể gọi món.");
    }

    return orderService.placeOrder({ tableSessionId: activeSession.id, items });
  },
};

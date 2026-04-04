import { NotFoundError, ConflictError } from "../utils/AppError.js";
import { socketService } from "./socket.service.js";
import { notificationService } from "./notification.service.js";
import prisma from "../libs/prisma.js";
import { orderRepo } from "../repositories/order.repository.js";
import productRepo from "../repositories/product.repo.js";
import tableSessionRepo from "../repositories/tableSession.repository.js";

const BASE_INCLUDE = {
  items: {
    include: { product: { select: { id: true, name: true, image: true } } },
  },
  table: { select: { id: true, name: true } },
};

export const orderService = {
  placeOrder: async (data) => {
    const { tableSessionId, items } = data;
    const existing = await orderRepo.findOrderByTableSessionId(tableSessionId);

    if (existing) {
      if (["PAID", "CANCELLED"].includes(existing.status))
        throw new ConflictError("Order closed");
      return orderService.addItems(tableSessionId, items);
    }

    const session = await tableSessionRepo.findTableSessionById(tableSessionId);
    if (!session) throw new NotFoundError("Session not found");

    const { orderItems, total } = await orderService._processOrderItems(items);

    try {
      const { order, noti } = await prisma.$transaction(async (tx) => {
        const o = await orderRepo.createOrder(
          {
            tableId: session.tableId,
            tableSessionId,
            total,
            items: orderItems,
          },
          { include: BASE_INCLUDE },
          tx,
        );
        const n = await notificationService.createNotification(
          { tableId: o.tableId, type: "NEW_ORDER" },
          tx,
        );
        return { order: o, noti: n };
      });
      return orderService._triggerEvents(order, noti);
    } catch (err) {
      if (err.code === "P2002")
        return orderService.addItems(tableSessionId, items);
      throw err;
    }
  },

  addItems: async (tableSessionId, items) => {
    const order = await orderRepo.findOrderByTableSessionId(tableSessionId);
    if (!order || ["PAID", "CANCELLED"].includes(order.status))
      throw new ConflictError("Invalid order state");

    const { orderItems, total: addedTotal } =
      await orderService._processOrderItems(items);

    const { updated, noti } = await prisma.$transaction(async (tx) => {
      await orderRepo.addItems(order.id, orderItems, tx);
      const up = await tx.order.update({
        where: { id: order.id },
        data: { total: { increment: addedTotal } },
        include: BASE_INCLUDE,
      });
      const n = await notificationService.createNotification(
        { tableId: up.tableId, type: "NEW_ORDER" },
        tx,
      );
      return { updated: up, noti: n };
    });
    return orderService._triggerEvents(updated, noti);
  },

  _triggerEvents: (order, noti) => {
    socketService.emitNewOrder(order);
    notificationService.emitNotification(noti);
    return order;
  },

  _processOrderItems: async (items) => {
    const products = await productRepo.findByIds(items.map((i) => i.productId));
    const pMap = new Map(products.map((p) => [p.id, p]));

    const orderItems = items.map((item) => {
      const p = pMap.get(item.productId);
      if (!p || !p.isAvailable)
        throw new ConflictError(
          `Product ${p?.name || item.productId} unavailable`,
        );
      return { productId: p.id, quantity: item.quantity, unitPrice: p.price };
    });

    return {
      orderItems,
      total: orderItems.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0),
    };
  },

  getOrderStatus: (tableSessionId) =>
    orderRepo.findOrderWithItems(tableSessionId),

  createPayment: async (tableSessionId, method = "cash") => {
    const order = await orderRepo.findOrderByTableSessionId(tableSessionId);
    if (!order || order.status === "PAID")
      throw new ConflictError("Payment invalid");

    const payment = await orderRepo.createPayment({
      orderId: order.id,
      method,
      status: "SUCCESS",
      amount: order.total,
    });
    await orderRepo.updateStatus(order.id, "PAID");
    return payment;
  },
};

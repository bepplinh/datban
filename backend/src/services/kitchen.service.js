import { socketService } from "./socket.service.js";
import { notificationService } from "./notification.service.js";
import { NotFoundError } from "../utils/AppError.js";
import prisma from "../libs/prisma.js";
import { orderItemRepo } from "../repositories/orderItem.repository.js";
import productRepo from "../repositories/product.repo.js";

export const kitchenService = {
  listQueue: async () => {
    return orderItemRepo.findPendingAndPreparing();
  },

  updateItemStatus: async (orderItemId, status) => {
    const item = await orderItemRepo.findById(orderItemId);
    if (!item) {
      throw new NotFoundError("OrderItem not found");
    }

    const { updatedItem, notification } = await prisma.$transaction(
      async (tx) => {
        const upItem = await orderItemRepo.updateStatus(
          orderItemId,
          status,
          tx,
        );
        const tableId = upItem.order.tableId;
        let noti = null;

        if (status === "READY") {
          noti = await notificationService.createNotification(
            {
              tableId,
              type: "DISH_READY",
            },
            tx,
          );
        } else if (status === "OUT_OF_STOCK") {
          await productRepo.update(item.productId, { isAvailable: false }, tx);
          noti = await notificationService.createNotification(
            {
              tableId,
              type: "OUT_OF_STOCK",
            },
            tx,
          );
        }

        return { updatedItem: upItem, notification: noti };
      },
    );

    // Emit outside transaction
    if (status === "READY") {
      socketService.emitDishReady(updatedItem.order.tableId, updatedItem);
    } else if (status === "OUT_OF_STOCK") {
      socketService.emitOutOfStock(
        updatedItem.order.tableId,
        updatedItem.product,
      );
    }

    notificationService.emitNotification(notification);

    return updatedItem;
  },
};

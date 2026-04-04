import prisma from "../libs/prisma.js";
import { socketService } from "./socket.service.js";

export const notificationService = {
  // Just save to DB, supports transaction
  createNotification: async ({ tableId, type, data = {} }, tx = null) => {
    const db = tx || prisma;
    return db.servicerequest.create({
      data: {
        tableId,
        type,
        status: "PENDING",
        updatedAt: new Date(),
      },
      include: {
        table: { select: { name: true } },
      },
    });
  },

  // Emit to socket
  emitNotification: (notification) => {
    if (!notification) return;
    socketService.emitToRoom("staff-room", "new_service_request", notification);
  },

  // Convenience method for single calls (Save + Emit)
  sendNotification: async (params) => {
    const notification = await notificationService.createNotification(params);
    notificationService.emitNotification(notification);
    return notification;
  },
};

import { getIO } from "../config/socket.js";

export const socketService = {
  emitToRoom: (room, event, data) => {
    try {
      const io = getIO();
      io.to(room).emit(event, data);
    } catch (error) {
      console.error(`[SocketService] Error emitting to room ${room}:`, error);
    }
  },

  emitToSocket: (socketId, event, data) => {
    try {
      const io = getIO();
      io.to(socketId).emit(event, data);
    } catch (error) {
      console.error(
        `[SocketService] Error emitting to socket ${socketId}:`,
        error,
      );
    }
  },

  broadcast: (event, data) => {
    try {
      const io = getIO();
      io.emit(event, data);
    } catch (error) {
      console.error(
        `[SocketService] Error broadcasting event ${event}:`,
        error,
      );
    }
  },

  joinRoom: (socket, room) => {
    socket.join(room);
    console.log(`[SocketService] Socket ${socket.id} joined room: ${room}`);
  },

  // Specialized methods for Order Flow
  emitNewOrder: (order) => {
    socketService.emitToRoom("staff-room", "new_order", order);
    socketService.emitToRoom("kitchen-room", "new_order", order);
  },

  emitDishReady: (tableId, item) => {
    socketService.emitToRoom("staff-room", "dish_ready", { tableId, item });
  },

  emitOutOfStock: (tableId, product) => {
    socketService.emitToRoom("staff-room", "out_of_stock", {
      tableId,
      product,
    });
    socketService.emitToRoom(`table-${tableId}`, "out_of_stock", { product });
  },

  emitDelivered: (tableId, order) => {
    socketService.emitToRoom(`table-${tableId}`, "order_delivered", order);
  },
};

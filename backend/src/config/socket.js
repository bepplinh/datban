import { Server } from "socket.io";
import { finalAllowedOrigins } from "./cors.js";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: finalAllowedOrigins,
      methods: ["GET", "POST"],
      credentials: true,
    },
    allowEIO3: true,
  });

  io.on("connection", (socket) => {
    console.log(`🔌 New client connected: ${socket.id}`);

    socket.on("join-room", (room) => {
      socket.join(room);
      console.log(`👤 User ${socket.id} joined room: ${room}`);
    });

    socket.on("new-notification", (data) => {
      console.log("du lieu tu client: ", data);
    });

    socket.on("disconnect", () => {
      console.log(`❌ Client disconnected: ${socket.id}`);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

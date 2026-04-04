import { socket } from "../lib/socketConfig";

export const socketService = {
  connect: () => {
    if (!socket.connected) {
      socket.connect();
    }
  },

  disconnect: () => {
    if (socket.connected) {
      socket.disconnect();
    }
  },

  joinRoom: (room) => {
    socket.emit("join-room", room);
  },

  emit: (event, data) => {
    socket.emit(event, data);
  },

  on: (event, callback) => {
    socket.on(event, callback);
  },

  off: (event, callback) => {
    if (callback) {
      socket.off(event, callback);
    } else {
      socket.off(event);
    }
  },
};

import { createContext, useContext, useEffect, useState } from "react";
import { socket } from "../lib/socketConfig";
import { socketService } from "../services/socket";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
  const onConnect =() => {
      setIsConnected(true);
      console.log("✅ Socket connected Context:", socket.id);
    }

    const onDisconnect = () => {
      setIsConnected(false);
      console.log("❌ Socket disconnected Context");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    socketService.connect();

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  const value = {
    socket,
    isConnected,
    socketService,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

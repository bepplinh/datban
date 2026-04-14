import { io } from "socket.io-client";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
// Remove trailing /api if it exists to get the base domain for socket.io
const SOCKET_URL = API_URL.endsWith("/api") ? API_URL.slice(0, -4) : API_URL;

export const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  withCredentials: true,
});

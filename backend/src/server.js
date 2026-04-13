import dotenv from "dotenv";
import { createServer } from "http";
import app from "./app.js";
import { initSocket } from "./config/socket.js";

// Init env variables
dotenv.config();

// Workers
import "./workers/order.worker.js";

const port = process.env.PORT || 3000;
const httpServer = createServer(app);

// Initialize Socket.io
initSocket(httpServer);

httpServer.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

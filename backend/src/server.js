import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import { createServer } from "http";
import corsOptions from "./config/cors.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { checkTableSession } from "./middlewares/checkTableSession.middleware.js";
import { initSocket } from "./config/socket.js";

// Routes
import authRouter from "./routes/auth.route.js";
import adminRouter from "./routes/admin.route.js";
import staffRouter from "./routes/staff.route.js";
import menuRouter from "./routes/menu.route.js";
import tableSessionRouter from "./routes/tableSession.route.js";
import orderRouter from "./routes/order.route.js";
import socketRouter from "./routes/socket.route.js";
import serviceRequestRouter from "./routes/serviceRequest.route.js";
import kitchenRouter from "./routes/kitchen.route.js";
import payosRouter from "./routes/payos.route.js";
import prisma from "./libs/prisma.js";

dotenv.config();
const app = express();
const httpServer = createServer(app);
const port = process.env.PORT || 3000;

// Initialize Socket.io
initSocket(httpServer);

// ─── Global Middleware ───────────────────────────
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  }),
);
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// ─── Public Routes (no auth) ─────────────────────
app.use("/api/auth", authRouter);
app.use("/api/menu", menuRouter);
app.use("/api", tableSessionRouter);
app.use("/api/socket", socketRouter);
app.use("/api/service-requests", serviceRequestRouter);

// ─── Authenticated Routes ────────────────────────
app.use("/api/admin", adminRouter);
app.use("/api/staff", staffRouter);
app.use("/api/kitchen", kitchenRouter);

//PAYOS Routes/
app.use("/api/payos", payosRouter);

// ─── Client Routes (table session required) ──────
app.use("/api/orders", checkTableSession, orderRouter);

// ─── Global Error Handler ────────────────────────
app.use(errorHandler);

app.get("/api/test", async (req, res) => {
  const grouped = await prisma.orderitem.groupBy({
    by: ["productId"],
    _sum: { quantity: true },
    orderBy: { _sum: "desc" },
    take: 10,
  });
  res.json({ data: grouped });
});

httpServer.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

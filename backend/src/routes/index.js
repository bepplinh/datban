import { Router } from "express";
import authRouter from "./auth.route.js";
import adminRouter from "./admin.route.js";
import staffRouter from "./staff.route.js";
import menuRouter from "./menu.route.js";
import tableSessionRouter from "./tableSession.route.js";
import orderRouter from "./order.route.js";
import socketRouter from "./socket.route.js";
import serviceRequestRouter from "./serviceRequest.route.js";
import kitchenRouter from "./kitchen.route.js";
import payosRouter from "./payos.route.js";
import reservationRouter from "./reservation.route.js";
import { checkTableSession } from "../middlewares/checkTableSession.middleware.js";

const routes = Router();

// ─── Public Routes (no auth) ─────────────────────
routes.use("/auth", authRouter);
routes.use("/menu", menuRouter);
routes.use("/", tableSessionRouter);
routes.use("/socket", socketRouter);
routes.use("/service-requests", serviceRequestRouter);
routes.use("/reservations", reservationRouter);

// ─── Authenticated Routes ────────────────────────
routes.use("/admin", adminRouter);
routes.use("/staff", staffRouter);
routes.use("/kitchen", kitchenRouter);

// ─── PAYOS Routes ────────────────────────────────
routes.use("/payos", payosRouter);

// ─── Client Routes (table session required) ──────
routes.use("/orders", checkTableSession, orderRouter);

export default routes;

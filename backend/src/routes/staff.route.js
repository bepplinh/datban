import express from "express";
import { staffController } from "../controllers/staff.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";
import { validateBodyRequest } from "../middlewares/validateBodyRequest.js";
import {
  updateOrderStatusSchema,
  addItemsSchema,
} from "../validations/order.schema.js";

const staffRouter = express.Router();

// All staff routes require authentication + STAFF or ADMIN role
staffRouter.use(authenticate, authorize("STAFF", "ADMIN"));

staffRouter.get("/orders", staffController.listOrders);
staffRouter.get("/tables", staffController.getTables);
staffRouter.patch(
  "/orders/:id/status",
  validateBodyRequest(updateOrderStatusSchema),
  staffController.updateOrderStatus,
);
staffRouter.get("/tables/:tableId/orders", staffController.getOrdersByTable);
staffRouter.post("/tables/:tableId/open", staffController.openTable);
staffRouter.post("/tables/:tableId/close", staffController.closeTable);
staffRouter.post(
  "/tables/:tableId/orders",
  validateBodyRequest(addItemsSchema),
  staffController.addOrderItems,
);

export default staffRouter;

import express from "express";
import { orderController } from "../controllers/order.controller.js";
import { validateBodyRequest } from "../middlewares/validateBodyRequest.js";
import {
  placeOrderSchema,
  addItemsSchema,
} from "../validations/order.schema.js";

const orderRouter = express.Router();

orderRouter.post(
  "/",
  validateBodyRequest(placeOrderSchema),
  orderController.placeOrder,
);
orderRouter.post(
  "/items",
  validateBodyRequest(addItemsSchema),
  orderController.addItems,
);
orderRouter.get("/status", orderController.getOrderStatus);
orderRouter.post("/payment", orderController.createPayment);

export default orderRouter;

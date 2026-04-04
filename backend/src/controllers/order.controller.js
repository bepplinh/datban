import { orderService } from "../services/order.service.js";

export const orderController = {
  placeOrder: async (req, res, next) => {
    try {
      const tableSessionId = req.tableSessionId;
      const data = { tableSessionId, ...req.body };
      const order = await orderService.placeOrder(data);
      res.status(201).json({ data: order });
    } catch (err) {
      next(err);
    }
  },

  addItems: async (req, res, next) => {
    try {
      const tableSessionId = req.tableSessionId;
      const order = await orderService.addItems(tableSessionId, req.body.items);
      res.json({ data: order });
    } catch (err) {
      next(err);
    }
  },

  getOrderStatus: async (req, res, next) => {
    try {
      const tableSessionId = req.tableSessionId;
      const order = await orderService.getOrderStatus(tableSessionId);
      res.json({ data: order });
    } catch (err) {
      next(err);
    }
  },

  createPayment: async (req, res, next) => {
    try {
      const tableSessionId = req.tableSessionId;
      const method = req.body.method || "cash";
      const payment = await orderService.createPayment(tableSessionId, method);
      res.status(201).json({ data: payment });
    } catch (err) {
      next(err);
    }
  },
};

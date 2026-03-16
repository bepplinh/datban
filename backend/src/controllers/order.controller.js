import { orderService } from "../services/order.service.js";

export const orderController = {
  placeOrder: async (req, res) => {
    try {
      const { items } = req.body;
      const order = await orderService.placeOrder(req.tableSession, items);
      res.json(order);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};

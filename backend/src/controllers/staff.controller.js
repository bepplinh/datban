import { staffService } from "../services/staff.service.js";

export const staffController = {
  getTables: async (req, res, next) => {
    try {
      const tables = await staffService.getTables();
      res.json({ data: tables });
    } catch (err) {
      next(err);
    }
  },

  listOrders: async (req, res, next) => {
    try {
      const filters = {};
      if (req.query.status) filters.status = req.query.status;
      if (req.query.tableId) filters.tableId = req.query.tableId;

      const orders = await staffService.listOrders(filters);
      res.json({ data: orders });
    } catch (err) {
      next(err);
    }
  },

  updateOrderStatus: async (req, res, next) => {
    try {
      const order = await staffService.updateOrderStatus(
        req.params.id,
        req.body.status,
      );
      res.json({ data: order });
    } catch (err) {
      next(err);
    }
  },

  getOrdersByTable: async (req, res, next) => {
    try {
      const orders = await staffService.getOrdersByTable(req.params.tableId);
      res.json({ data: orders });
    } catch (err) {
      next(err);
    }
  },

  openTable: async (req, res, next) => {
    try {
      const session = await staffService.openTable(req.params.tableId);
      res.json({ message: "Bàn đã được mở", data: session });
    } catch (err) {
      next(err);
    }
  },

  closeTable: async (req, res, next) => {
    try {
      const result = await staffService.closeTable(req.params.tableId);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },

  addOrderItems: async (req, res, next) => {
    try {
      const { tableId } = req.params;
      const { items } = req.body;
      const order = await staffService.addOrderItemsToTable(tableId, items);
      res.json({ message: "Gọi món thành công", data: order });
    } catch (err) {
      next(err);
    }
  },
};

import { adminService } from "../../services/admin.service.js";

export const tableController = {
  getTables: async (req, res, next) => {
    try {
      const tables = await adminService.getTables();
      res.json({ data: tables });
    } catch (err) {
      next(err);
    }
  },

  createTable: async (req, res, next) => {
    try {
      const table = await adminService.createTable(req.body);
      res.status(201).json({ data: table });
    } catch (err) {
      next(err);
    }
  },

  updateTable: async (req, res, next) => {
    try {
      const table = await adminService.updateTable(req.params.id, req.body);
      res.json({ data: table });
    } catch (err) {
      next(err);
    }
  },

  deleteTable: async (req, res, next) => {
    try {
      await adminService.deleteTable(req.params.id);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  },
};

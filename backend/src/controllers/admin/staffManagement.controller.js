import { adminService } from "../../services/admin.service.js";

export const staffManagementController = {
  getStaffList: async (req, res, next) => {
    try {
      const staff = await adminService.getStaffList();
      res.json({ data: staff });
    } catch (err) {
      next(err);
    }
  },

  createStaff: async (req, res, next) => {
    try {
      const staff = await adminService.createStaff(req.body);
      res.status(201).json({ data: staff });
    } catch (err) {
      next(err);
    }
  },

  updateStaff: async (req, res, next) => {
    try {
      const staff = await adminService.updateStaff(req.params.id, req.body);
      res.json({ data: staff });
    } catch (err) {
      next(err);
    }
  },

  deleteStaff: async (req, res, next) => {
    try {
      await adminService.deleteStaff(req.params.id);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  },
};

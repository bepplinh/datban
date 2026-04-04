import { adminService } from "../../services/admin.service.js";

export const categoryController = {
  getCategories: async (req, res, next) => {
    try {
      const categories = await adminService.getCategories();
      res.json({ data: categories });
    } catch (err) {
      next(err);
    }
  },

  createCategory: async (req, res, next) => {
    try {
      const category = await adminService.createCategory(req.body);
      res.status(201).json({ data: category });
    } catch (err) {
      next(err);
    }
  },

  updateCategory: async (req, res, next) => {
    try {
      const category = await adminService.updateCategory(
        req.params.id,
        req.body,
      );
      res.json({
        success: true,
        message: "Cập nhật danh mục thành công",
        data: category,
      });
    } catch (err) {
      next(err);
    }
  },

  deleteCategory: async (req, res, next) => {
    try {
      await adminService.deleteCategory(req.params.id);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  },
};

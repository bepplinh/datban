import { adminService } from "../../services/admin.service.js";

export const productController = {
  getProducts: async (req, res, next) => {
    try {
      const filters = {};
      if (req.query.categoryId) filters.categoryId = req.query.categoryId;
      if (req.query.isAvailable !== undefined)
        filters.isAvailable = req.query.isAvailable === "true";

      const products = await adminService.getProducts(filters);
      res.json({ data: products });
    } catch (err) {
      next(err);
    }
  },

  createProduct: async (req, res, next) => {
    try {
      const product = await adminService.createProduct(req.body, req.file);
      res.status(201).json({ data: product });
    } catch (err) {
      next(err);
    }
  },

  updateProduct: async (req, res, next) => {
    try {
      const product = await adminService.updateProduct(
        req.params.id,
        req.body,
        req.file,
      );
      res.json({ data: product });
    } catch (err) {
      next(err);
    }
  },

  deleteProduct: async (req, res, next) => {
    try {
      await adminService.deleteProduct(req.params.id);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  },
};

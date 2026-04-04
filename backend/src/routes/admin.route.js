import express from "express";
import { categoryController } from "../controllers/admin/category.controller.js";
import { productController } from "../controllers/admin/product.controller.js";
import { tableController } from "../controllers/admin/table.controller.js";
import { staffManagementController } from "../controllers/admin/staffManagement.controller.js";
import { statsController } from "../controllers/admin/stats.controller.js";
import { orderController } from "../controllers/admin/order.controller.js";
import upload from "../middlewares/upload.middleware.js";

import { authenticate, authorize } from "../middlewares/auth.middleware.js";
import { validateBodyRequest } from "../middlewares/validateBodyRequest.js";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../validations/category.schema.js";
import {
  createProductSchema,
  updateProductSchema,
} from "../validations/product.schema.js";
import {
  createTableSchema,
  updateTableSchema,
} from "../validations/table.schema.js";
import {
  createStaffSchema,
  updateStaffSchema,
} from "../validations/staff.schema.js";

const adminRouter = express.Router();

// All admin routes require authentication + ADMIN role
adminRouter.use(authenticate, authorize("ADMIN"));

// ─── Categories ──────────────────────────────────
adminRouter.get("/categories", categoryController.getCategories);
adminRouter.post(
  "/categories",
  validateBodyRequest(createCategorySchema),
  categoryController.createCategory,
);
adminRouter.put(
  "/categories/:id",
  validateBodyRequest(updateCategorySchema),
  categoryController.updateCategory,
);
adminRouter.delete("/categories/:id", categoryController.deleteCategory);

// ─── Products ────────────────────────────────────
adminRouter.get("/products", productController.getProducts);
adminRouter.post(
  "/products",
  upload.single("image"),
  validateBodyRequest(createProductSchema),
  productController.createProduct,
);
adminRouter.put(
  "/products/:id",
  upload.single("image"),
  validateBodyRequest(updateProductSchema),
  productController.updateProduct,
);
adminRouter.delete("/products/:id", productController.deleteProduct);

// ─── Tables ──────────────────────────────────────
adminRouter.get("/tables", tableController.getTables);
adminRouter.post(
  "/tables",
  validateBodyRequest(createTableSchema),
  tableController.createTable,
);
adminRouter.put(
  "/tables/:id",
  validateBodyRequest(updateTableSchema),
  tableController.updateTable,
);
adminRouter.delete("/tables/:id", tableController.deleteTable);

// ─── Staff ───────────────────────────────────────
adminRouter.get("/staff", staffManagementController.getStaffList);
adminRouter.post(
  "/staff",
  validateBodyRequest(createStaffSchema),
  staffManagementController.createStaff,
);
adminRouter.put(
  "/staff/:id",
  validateBodyRequest(updateStaffSchema),
  staffManagementController.updateStaff,
);
adminRouter.delete("/staff/:id", staffManagementController.deleteStaff);

// ─── Statistics ──────────────────────────────────
adminRouter.get("/stats/summary", statsController.getDashboardSummary);
adminRouter.get("/stats/revenue", statsController.getRevenueStats);
adminRouter.get("/stats/revenue-chart", statsController.getRevenueChartData);
adminRouter.get("/stats/best-selling", statsController.getBestSellingProducts);

// ─── Orders/Invoices ─────────────────────────────
adminRouter.get("/orders", orderController.getOrders);
adminRouter.get("/orders/:id", orderController.getOrderById);
adminRouter.put("/orders/:id/status", orderController.updateOrderStatus);

export default adminRouter;

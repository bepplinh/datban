import bcrypt from "bcrypt";
import categoryRepo from "../repositories/category.repository.js";
import productRepo from "../repositories/product.repo.js";
import tableRepo from "../repositories/table.repository.js";
import userRepo from "../repositories/user.repository.js";
import prisma from "../libs/prisma.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import { NotFoundError, ConflictError } from "../utils/AppError.js";

export const adminService = {
  // ─── Category ──────────────────────────────────
  getCategories: () => categoryRepo.findAllFlat(),

  createCategory: (data) => categoryRepo.create(data),

  updateCategory: async (id, data) => {
    const existing = await categoryRepo.findById(id);
    if (!existing) throw new NotFoundError("Category not found");
    return categoryRepo.update(id, data);
  },

  deleteCategory: async (id) => {
    const existing = await categoryRepo.findById(id);
    if (!existing) throw new NotFoundError("Category not found");
    return categoryRepo.delete(id);
  },

  // ─── Product ───────────────────────────────────
  getProducts: (filters) => productRepo.findAll(filters),

  createProduct: async (data, file) => {
    const productData = { ...data };

    if (typeof productData.price === "string")
      productData.price = parseFloat(productData.price);
    if (productData.isAvailable === "true") productData.isAvailable = true;
    if (productData.isAvailable === "false") productData.isAvailable = false;

    if (file) {
      const uploadResult = await uploadToCloudinary(file.buffer);
      productData.image = uploadResult.secure_url;
    }

    return productRepo.create(productData);
  },

  updateProduct: async (id, data, file) => {
    const existing = await productRepo.findById(id);
    if (!existing) throw new NotFoundError("Product not found");

    const updateData = { ...data };

    // Convert strings from FormData if needed
    if (typeof updateData.price === "string")
      updateData.price = parseFloat(updateData.price);
    if (updateData.isAvailable === "true") updateData.isAvailable = true;
    if (updateData.isAvailable === "false") updateData.isAvailable = false;

    if (file) {
      const uploadResult = await uploadToCloudinary(file.buffer);
      updateData.image = uploadResult.secure_url;
    }

    return productRepo.update(id, updateData);
  },

  deleteProduct: async (id) => {
    const existing = await productRepo.findById(id);
    if (!existing) throw new NotFoundError("Product not found");
    return productRepo.delete(id);
  },

  // ─── Table ─────────────────────────────────────
  getTables: () => tableRepo.findAll(),

  createTable: async (data) => {
    try {
      return await tableRepo.create(data);
    } catch (err) {
      if (err.code === "P2002")
        throw new ConflictError("Table name already exists");
      throw err;
    }
  },

  updateTable: async (id, data) => {
    const existing = await tableRepo.findTableById(id);
    if (!existing) throw new NotFoundError("Table not found");
    return tableRepo.updateTable(id, data);
  },

  deleteTable: async (id) => {
    const existing = await tableRepo.findTableById(id);
    if (!existing) throw new NotFoundError("Table not found");
    return tableRepo.delete(id);
  },

  // ─── Staff ─────────────────────────────────────
  getStaffList: async () => {
    const staffRole = await prisma.role.findUnique({
      where: { role: "STAFF" },
    });
    if (!staffRole) return [];
    return userRepo.findAll({ roleId: staffRole.id });
  },

  createStaff: async (data) => {
    const staffRole = await prisma.role.findUnique({
      where: { role: "STAFF" },
    });
    if (!staffRole) throw new NotFoundError("Staff role not found in system");

    const hashedPassword = await bcrypt.hash(data.password, 10);
    try {
      return await userRepo.create({
        name: data.name,
        username: data.username,
        password: hashedPassword,
        roleId: staffRole.id,
      });
    } catch (err) {
      if (err.code === "P2002")
        throw new ConflictError("Username already exists");
      throw err;
    }
  },

  updateStaff: async (id, data) => {
    const existing = await userRepo.findById(id);
    if (!existing) throw new NotFoundError("Staff not found");

    const updateData = { ...data };
    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }
    return userRepo.update(id, updateData);
  },

  deleteStaff: async (id) => {
    const existing = await userRepo.findById(id);
    if (!existing) throw new NotFoundError("Staff not found");
    return userRepo.delete(id);
  },

  // ─── Statistics ────────────────────────────────
  getRevenueStats: async (from, to) => {
    const where = { status: "PAID" };
    if (from || to) {
      where.createdAt = {};
      if (from) where.createdAt.gte = new Date(from);
      if (to) where.createdAt.lte = new Date(to);
    }

    const result = await prisma.order.aggregate({
      where,
      _sum: { total: true },
      _count: { id: true },
    });

    return {
      totalRevenue: result._sum.total || 0,
      totalOrders: result._count.id || 0,
    };
  },

  getBestSellingProducts: async (limit = 10) => {
    const grouped = await productRepo.findBestSelling(limit);

    // Enrich with product details
    const productIds = grouped.map((g) => g.productId);
    const products = await productRepo.findByIds(productIds);
    const productMap = new Map(products.map((p) => [p.id, p]));

    return grouped.map((g) => ({
      product: productMap.get(g.productId),
      totalSold: g._sum.quantity,
    }));
  },

  getDashboardSummary: async () => {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    // 1. Revenue today
    const revenueToday = await prisma.order.aggregate({
      where: {
        status: "PAID",
        createdAt: { gte: todayStart, lte: todayEnd },
      },
      _sum: { total: true },
      _count: { id: true },
    });

    // 2. Active Tables
    const totalTables = await prisma.table.count();
    const activeTables = await prisma.table.count({
      where: { status: "OCCUPIED" },
    });

    // 3. Pending Service Requests
    const pendingRequests = await prisma.servicerequest.count({
      where: { status: "PENDING" },
    });

    return {
      revenueToday: revenueToday._sum.total || 0,
      ordersToday: revenueToday._count.id || 0,
      totalTables,
      activeTables,
      pendingRequests,
    };
  },

  getRevenueChartData: async (frequency = "month") => {
    const orders = await prisma.order.findMany({
      where: { status: "PAID" },
      select: { total: true, createdAt: true },
      orderBy: { createdAt: "asc" },
    });

    if (frequency === "year") {
      const months = Array.from(
        { length: 12 },
        (_, i) => `Tháng ${(i + 1).toString().padStart(2, "0")}`,
      );
      const dataMap = new Map();

      orders.forEach((order) => {
        const date = new Date(order.createdAt);
        const year = date.getFullYear().toString();
        const monthIndex = date.getMonth();
        const label = months[monthIndex];
        const key = `${year}-${label}`;
        dataMap.set(key, (dataMap.get(key) || 0) + order.total);
      });

      const result = [];
      dataMap.forEach((revenue, key) => {
        const [year, label] = key.split("-");
        result.push({ label, year, revenue });
      });

      // Sort by month label (Tháng 01, Tháng 02...)
      return result.sort((a, b) => a.label.localeCompare(b.label));
    }

    const groupedData = {};

    orders.forEach((order) => {
      let label;
      const date = new Date(order.createdAt);
      if (frequency === "month") {
        label = `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}`;
      } else if (frequency === "week") {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() + 4 - (d.getDay() || 7));
        const yearStart = new Date(d.getFullYear(), 0, 1);
        const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
        label = `${d.getFullYear()}-W${weekNo.toString().padStart(2, "0")}`;
      } else {
        label = date.toISOString().split("T")[0];
      }

      if (!groupedData[label]) {
        groupedData[label] = 0;
      }
      groupedData[label] += order.total;
    });

    return Object.entries(groupedData).map(([label, revenue]) => ({
      label,
      revenue,
    }));
  },
};

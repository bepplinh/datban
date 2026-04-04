import prisma from "../libs/prisma.js";

const productRepo = {
  findByIds: (productIds) => {
    return prisma.product.findMany({
      where: { id: { in: productIds } },
    });
  },

  findAll: (filters = {}) => {
    const where = {};
    if (filters.categoryId) where.categoryId = filters.categoryId;
    if (filters.isAvailable !== undefined)
      where.isAvailable = filters.isAvailable;

    return prisma.product.findMany({
      where,
      include: { category: { select: { id: true, name: true } } },
      orderBy: { name: "asc" },
    });
  },

  findById: (id) => {
    return prisma.product.findUnique({
      where: { id },
      include: { category: { select: { id: true, name: true } } },
    });
  },

  create: (data) => {
    return prisma.product.create({
      data,
      include: { category: { select: { id: true, name: true } } },
    });
  },

  update: (id, data, tx = null) => {
    const db = tx || prisma;
    return db.product.update({
      where: { id },
      data,
      include: { category: { select: { id: true, name: true } } },
    });
  },

  delete: (id) => {
    return prisma.product.delete({ where: { id } });
  },

  findBestSelling: (limit = 10) => {
    return prisma.orderitem.groupBy({
      by: ["productId"],
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: "desc" } },
      take: limit,
    });
  },
};

export default productRepo;

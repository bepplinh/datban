import prisma from "../libs/prisma.js";

export const orderRepo = {
  findOrderByTableSessionId: (tableSessionId) => {
    return prisma.order.findUnique({
      where: { tableSessionId },
    });
  },

  findOrderWithItems: (tableSessionId) => {
    return prisma.order.findUnique({
      where: { tableSessionId },
      select: {
        id: true,
        tableSessionId: true,
        status: true,
        total: true,
        createdAt: true,
        items: {
          include: {
            product: { select: { id: true, name: true, image: true } },
          },
        },
        table: { select: { id: true, name: true } },
      },
    });
  },

  createOrder: async (order, options = {}, tx = null) => {
    const { tableId, tableSessionId, total, items } = order;
    const db = tx || prisma;

    const lastOrder = await db.order.findFirst({
      orderBy: { orderNumber: "desc" },
    });
    const orderNumber = (lastOrder?.orderNumber || 0) + 1;

    return db.order.create({
      data: {
        tableId,
        tableSessionId,
        total,
        orderNumber,
        status: "PENDING",
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            updatedAt: new Date(),
          })),
        },
      },
      ...options,
    });
  },

  addItems: async (orderId, items, tx = null) => {
    const db = tx || prisma;
    for (const item of items) {
      const existingItem = await db.orderitem.findFirst({
        where: { orderId, productId: item.productId },
      });

      if (existingItem) {
        await db.orderitem.update({
          where: { id: existingItem.id },
          data: {
            quantity: { increment: item.quantity },
            updatedAt: new Date(),
          },
        });
      } else {
        await db.orderitem.create({
          data: {
            orderId,
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            updatedAt: new Date(),
          },
        });
      }
    }
  },

  incrementOrderTotal: (orderId, amount) => {
    return prisma.order.update({
      where: { id: orderId },
      data: { total: { increment: amount } },
    });
  },

  findById: (id) => {
    return prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: { select: { id: true, name: true, image: true } },
          },
        },
        table: { select: { id: true, name: true } },
        payment: true,
      },
    });
  },

  findAll: (filters = {}) => {
    const where = {};
    if (filters.status) where.status = filters.status;
    if (filters.tableId) where.tableId = filters.tableId;

    return prisma.order.findMany({
      where,
      include: {
        items: {
          include: { product: { select: { id: true, name: true } } },
        },
        table: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  },

  updateStatus: (id, status) => {
    return prisma.order.update({
      where: { id },
      data: { status },
      include: {
        items: {
          include: { product: { select: { id: true, name: true } } },
        },
        table: { select: { id: true, name: true } },
      },
    });
  },

  findByTableId: (tableId) => {
    return prisma.order.findMany({
      where: { tableId },
      include: {
        items: {
          include: { product: { select: { id: true, name: true } } },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  },

  createPayment: (data) => {
    return prisma.payment.create({ data });
  },

  findByOrderNumber: (orderNumber) => {
    return prisma.order.findUnique({
      where: { orderNumber: Number(orderNumber) },
      include: {
        payment: true,
        table: true,
      },
    });
  },

  updatePaymentStatus: (orderId, status) => {
    return prisma.payment.update({
      where: { orderId },
      data: { status },
    });
  },
};

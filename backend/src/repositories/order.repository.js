import prisma from "../libs/prisma.js";

const ACTIVE_STATUSES = {
  notIn: ["PAID", "CANCELLED"],
};

export const orderRepo = {
  findActiveOrderByTable: (tableId) => {
    return prisma.order.findFirst({
      where: {
        tableId,
        status: ACTIVE_STATUSES,
      },
      include: { items: true },
    });
  },

  createOrder: (data) => {
    return prisma.order.create({
      data,
      include: { items: true },
    });
  },

  replaceOrderItems: (orderId, items, total) => {
    return prisma.order.update({
      where: { id: orderId },
      data: {
        status: "PENDING",
        total,
        items: {
          deleteMany: {},
          create: items,
        },
      },
      include: { items: true },
    });
  },
};

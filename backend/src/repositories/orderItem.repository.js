import prisma from "../libs/prisma.js";

export const orderItemRepo = {
  findById: (id, tx = null) => {
    const db = tx || prisma;
    return db.orderitem.findUnique({
      where: { id },
      include: {
        product: true,
        order: {
          include: {
            table: true,
          },
        },
      },
    });
  },

  updateStatus: (id, status, tx = null) => {
    const db = tx || prisma;
    return db.orderitem.update({
      where: { id },
      data: { status },
      include: {
        product: true,
        order: {
          include: {
            table: true,
          },
        },
      },
    });
  },

  findPendingAndPreparing: () => {
    return prisma.orderitem.findMany({
      where: {
        status: { in: ["PENDING", "PREPARING"] },
        order: {
          status: { notIn: ["PAID", "CANCELLED"] },
        },
      },
      include: {
        product: {
          select: { id: true, name: true, image: true, categoryId: true },
        },
        order: {
          include: {
            table: { select: { id: true, name: true } },
          },
        },
      },
      orderBy: { order: { createdAt: "asc" } },
    });
  },
};

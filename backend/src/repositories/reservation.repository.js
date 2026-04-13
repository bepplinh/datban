import prisma from "../libs/prisma.js";

export const reservationRepo = {
  create: (data) => {
    return prisma.reservation.create({
      data,
    });
  },

  findAll: (filters = {}) => {
    const where = {};
    if (filters.status) where.status = filters.status;
    if (filters.date) {
      const parsedDate = new Date(filters.date);
      where.date = {
        gte: new Date(parsedDate.setHours(0, 0, 0, 0)),
        lte: new Date(parsedDate.setHours(23, 59, 59, 999)),
      };
    }

    return prisma.reservation.findMany({
      where,
      orderBy: [{ date: "asc" }, { time: "asc" }, { createdAt: "desc" }],
    });
  },

  findById: (id) => {
    return prisma.reservation.findUnique({
      where: { id },
    });
  },

  updateStatus: (id, status) => {
    return prisma.reservation.update({
      where: { id },
      data: { status },
    });
  },
};

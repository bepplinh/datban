import prisma from "../libs/prisma.js";

const tableSessionRepo = {
  createTableSession: (tableId, expiresAt) => {
    return prisma.tableSession.create({
      data: { tableId, expiresAt },
    });
  },

  findActiveTableSession: (tableId, now = new Date()) => {
    return prisma.tableSession.findFirst({
      where: {
        tableId,
        status: "ACTIVE",
        expiresAt: { gt: now },
      },
      orderBy: { createdAt: "desc" },
    });
  },

  findById: (id) => {
    return prisma.tableSession.findUnique({
      where: { id },
      include: { table: true },
    });
  },
};

export default tableSessionRepo;

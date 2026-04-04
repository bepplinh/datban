import prisma from "../libs/prisma.js";

const tableSessionRepo = {
  createTableSession: (tableId, expiresAt) => {
    return prisma.tablesession.create({
      data: { tableId, expiresAt },
    });
  },

  findActiveTableSession: (tableId, now = new Date()) => {
    return prisma.tablesession.findFirst({
      where: {
        tableId,
        status: "ACTIVE",
        expiresAt: { gt: now },
      },
      orderBy: { createdAt: "desc" },
    });
  },

  findTableSessionById: (id) => {
    return prisma.tablesession.findUnique({
      where: { id: id },
    });
  },
};

export default tableSessionRepo;

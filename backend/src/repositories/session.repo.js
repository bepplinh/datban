import prisma from "../libs/prisma.js";

export const sessionRepo = {
  createTableSession: (tableId, expiresAt) => {
    return prisma.tablesession.create({
      data: { tableId, expiresAt, status: "ACTIVE" },
      include: {
        table: {
          select: {
            name: true,
          },
        },
      },
    });
  },

  findActiveSession: (tableId) => {
    return prisma.tablesession.findFirst({
      where: { tableId, status: "ACTIVE" },
      include: {
        table: {
          select: { name: true },
        },
      },
    });
  },

  findActiveSessionById: (sessionId) => {
    return prisma.tablesession.findFirst({
      where: { id: sessionId, status: "ACTIVE" },
      include: {
        table: {
          select: { name: true },
        },
      },
    });
  },

  closeTableSession: (sessionId) => {
    return prisma.tablesession.update({
      where: { id: sessionId },
      data: { status: "CLOSED" },
    });
  },
};

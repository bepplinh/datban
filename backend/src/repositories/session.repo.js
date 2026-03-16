import prisma from "../libs/prisma.js";

export const sessionRepo = {
  upsertTableSession: (tableId, expiresAt) => {
    return prisma.tableSession.upsert({
      where: { tableId },
      update: { expiresAt, status: "ACTIVE" },
      create: { tableId, expiresAt, status: "ACTIVE" },
    });
  },
};

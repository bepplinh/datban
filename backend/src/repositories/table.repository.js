import prisma from "../libs/prisma.js";

const tableRepo = {
  findAll: () => {
    return prisma.table.findMany({
      orderBy: { name: "asc" },
    });
  },

  findTableById: (tableId) => {
    return prisma.table.findUnique({
      where: { id: tableId },
    });
  },

  create: (data) => {
    return prisma.table.create({ data });
  },

  updateTable: (tableId, data) => {
    return prisma.table.update({
      where: { id: tableId },
      data,
    });
  },

  updateTableStatus: (tableId, status) => {
    return prisma.table.update({
      where: { id: tableId },
      data: { status },
    });
  },

  delete: (tableId) => {
    return prisma.table.delete({ where: { id: tableId } });
  },
};

export default tableRepo;

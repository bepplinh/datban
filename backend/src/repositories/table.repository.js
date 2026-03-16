import prisma from "../libs/prisma.js";
const tableRepo = {
  findTableById: (tableId) => {
    return prisma.table.findUnique({
      where: { id: tableId },
    });
  },

  updateTable: async (tableId, data) => {
    return prisma.table.update({
      where: { id: tableId },
      data: data,
    });
  },

  updateTableStatus: (tableId, status) => {
    return prisma.table.update({
      where: { id: tableId },
      data: { status },
    });
  },
};

export default tableRepo;

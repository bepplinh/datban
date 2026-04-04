import prisma from "../libs/prisma.js";

const categoryRepo = {
  findAll: () => {
    return prisma.category.findMany({
      include: {
        product: {
          where: { isAvailable: true },
          select: {
            id: true,
            name: true,
            price: true,
            image: true,
            description: true,
          },
        },
      },
      orderBy: { sortOrder: "asc" },
    });
  },

  findAllFlat: () => {
    return prisma.category.findMany({
      orderBy: { sortOrder: "asc" },
    });
  },

  findById: (id) => {
    return prisma.category.findUnique({
      where: { id },
      include: { product: true },
    });
  },

  create: (data) => {
    return prisma.category.create({ data });
  },

  update: (id, data) => {
    return prisma.category.update({ where: { id }, data });
  },

  delete: (id) => {
    return prisma.category.delete({ where: { id } });
  },
};

export default categoryRepo;

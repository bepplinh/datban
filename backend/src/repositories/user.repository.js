import prisma from "../libs/prisma.js";

const userRepo = {
  findByUsername: (username) => {
    return prisma.user.findUnique({
      where: { username },
      include: { role: true },
    });
  },

  findById: (id) => {
    return prisma.user.findUnique({
      where: { id },
      include: { role: true },
    });
  },

  findAll: (where = {}) => {
    return prisma.user.findMany({
      where,
      include: { role: true },
      select: {
        id: true,
        name: true,
        username: true,
        roleId: true,
        role: { select: { role: true } },
      },
    });
  },

  create: (data) => {
    return prisma.user.create({
      data,
      select: {
        id: true,
        name: true,
        username: true,
        role: { select: { role: true } },
      },
    });
  },

  update: (id, data) => {
    return prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        username: true,
        role: { select: { role: true } },
      },
    });
  },

  delete: (id) => {
    return prisma.user.delete({ where: { id } });
  },
};

export default userRepo;

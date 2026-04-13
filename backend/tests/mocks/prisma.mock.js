import { vi } from "vitest";

// Create a mock Prisma client that can be customized per test
const prisma = {
  order: {
    create: vi.fn(),
    findUnique: vi.fn(),
    findFirst: vi.fn(),
    findMany: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
  user: {
    create: vi.fn(),
    findUnique: vi.fn(),
    findFirst: vi.fn(),
    findMany: vi.fn(),
    update: vi.fn(),
  },
  reservation: {
    create: vi.fn(),
    findUnique: vi.fn(),
    findFirst: vi.fn(),
    findMany: vi.fn(),
    update: vi.fn(),
  },
  product: {
    findMany: vi.fn(),
    update: vi.fn(),
  },
  orderItem: {
    create: vi.fn(),
    createMany: vi.fn(),
    findMany: vi.fn(),
    update: vi.fn(),
  },
  payment: {
    create: vi.fn(),
  },
  tableSession: {
    findUnique: vi.fn(),
  },
  $transaction: vi.fn((fn) => fn(prisma)),
};

export default prisma;

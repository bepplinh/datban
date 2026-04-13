import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock all external dependencies
vi.mock("../../../src/repositories/order.repository.js", () => ({
  orderRepo: {
    findOrderByTableSessionId: vi.fn(),
    createOrder: vi.fn(),
    addItems: vi.fn(),
    findOrderWithItems: vi.fn(),
    createPayment: vi.fn(),
    updateStatus: vi.fn(),
  },
}));

vi.mock("../../../src/repositories/product.repo.js", () => ({
  default: {
    findByIds: vi.fn(),
  },
}));

vi.mock("../../../src/repositories/tableSession.repository.js", () => ({
  default: {
    findTableSessionById: vi.fn(),
  },
}));

vi.mock("../../../src/services/socket.service.js", () => ({
  socketService: {
    emitNewOrder: vi.fn(),
  },
}));

vi.mock("../../../src/services/notification.service.js", () => ({
  notificationService: {
    createNotification: vi.fn(),
    emitNotification: vi.fn(),
  },
}));

vi.mock("../../../src/libs/prisma.js", () => {
  const prisma = {
    $transaction: vi.fn((fn) => fn(prisma)),
    order: { update: vi.fn() },
  };
  return { default: prisma };
});

import { orderRepo } from "../../../src/repositories/order.repository.js";
import productRepo from "../../../src/repositories/product.repo.js";
import tableSessionRepo from "../../../src/repositories/tableSession.repository.js";
import { notificationService } from "../../../src/services/notification.service.js";
import { orderService } from "../../../src/services/order.service.js";

describe("orderService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("_processOrderItems", () => {
    it("should calculate total correctly", async () => {
      const items = [
        { productId: "p1", quantity: 2 },
        { productId: "p2", quantity: 1 },
      ];
      productRepo.findByIds.mockResolvedValue([
        { id: "p1", name: "Phở", price: 50000, isAvailable: true },
        { id: "p2", name: "Bún", price: 40000, isAvailable: true },
      ]);

      const result = await orderService._processOrderItems(items);

      expect(result.total).toBe(140000); // 2*50000 + 1*40000
      expect(result.orderItems).toHaveLength(2);
      expect(result.orderItems[0]).toEqual({
        productId: "p1",
        quantity: 2,
        unitPrice: 50000,
      });
    });

    it("should throw ConflictError for unavailable product", async () => {
      const items = [{ productId: "p1", quantity: 1 }];
      productRepo.findByIds.mockResolvedValue([
        { id: "p1", name: "Phở", price: 50000, isAvailable: false },
      ]);

      await expect(orderService._processOrderItems(items)).rejects.toThrow(
        /unavailable/,
      );
    });

    it("should throw ConflictError for non-existing product", async () => {
      const items = [{ productId: "missing", quantity: 1 }];
      productRepo.findByIds.mockResolvedValue([]);

      await expect(orderService._processOrderItems(items)).rejects.toThrow();
    });
  });

  describe("placeOrder", () => {
    const items = [{ productId: "p1", quantity: 2 }];

    it("should create new order when no existing order", async () => {
      orderRepo.findOrderByTableSessionId.mockResolvedValue(null);
      tableSessionRepo.findTableSessionById.mockResolvedValue({
        id: "session-1",
        tableId: "table-1",
      });
      productRepo.findByIds.mockResolvedValue([
        { id: "p1", name: "Phở", price: 50000, isAvailable: true },
      ]);

      const mockOrder = { id: "order-1", tableId: "table-1", total: 100000 };
      orderRepo.createOrder.mockResolvedValue(mockOrder);
      notificationService.createNotification.mockResolvedValue({
        id: "noti-1",
      });

      const result = await orderService.placeOrder({
        tableSessionId: "session-1",
        items,
      });

      expect(orderRepo.createOrder).toHaveBeenCalled();
      expect(result).toEqual(mockOrder);
    });

    it("should throw NotFoundError when session not found", async () => {
      orderRepo.findOrderByTableSessionId.mockResolvedValue(null);
      tableSessionRepo.findTableSessionById.mockResolvedValue(null);

      await expect(
        orderService.placeOrder({ tableSessionId: "bad-session", items }),
      ).rejects.toThrow("Session not found");
    });

    it("should throw ConflictError when existing order is PAID", async () => {
      orderRepo.findOrderByTableSessionId.mockResolvedValue({
        id: "order-1",
        status: "PAID",
      });

      await expect(
        orderService.placeOrder({ tableSessionId: "session-1", items }),
      ).rejects.toThrow("Order closed");
    });
  });

  describe("createPayment", () => {
    it("should create a cash payment for valid order", async () => {
      orderRepo.findOrderByTableSessionId.mockResolvedValue({
        id: "order-1",
        total: 100000,
        status: "CONFIRMED",
      });
      const mockPayment = {
        id: "pay-1",
        orderId: "order-1",
        method: "cash",
        status: "SUCCESS",
        amount: 100000,
      };
      orderRepo.createPayment.mockResolvedValue(mockPayment);
      orderRepo.updateStatus.mockResolvedValue({});

      const result = await orderService.createPayment("session-1", "cash");

      expect(result).toEqual(mockPayment);
      expect(orderRepo.updateStatus).toHaveBeenCalledWith("order-1", "PAID");
    });

    it("should throw ConflictError when order already PAID", async () => {
      orderRepo.findOrderByTableSessionId.mockResolvedValue({
        id: "order-1",
        status: "PAID",
      });

      await expect(orderService.createPayment("session-1")).rejects.toThrow(
        "Payment invalid",
      );
    });

    it("should throw ConflictError when no order exists", async () => {
      orderRepo.findOrderByTableSessionId.mockResolvedValue(null);

      await expect(orderService.createPayment("session-1")).rejects.toThrow(
        "Payment invalid",
      );
    });
  });

  describe("getOrderStatus", () => {
    it("should delegate to orderRepo.findOrderWithItems", async () => {
      const mockOrder = { id: "order-1", items: [] };
      orderRepo.findOrderWithItems.mockResolvedValue(mockOrder);

      const result = await orderService.getOrderStatus("session-1");

      expect(orderRepo.findOrderWithItems).toHaveBeenCalledWith("session-1");
      expect(result).toEqual(mockOrder);
    });
  });
});

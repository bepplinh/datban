import { describe, it, expect } from "vitest";
import {
  placeOrderSchema,
  addItemsSchema,
  updateOrderStatusSchema,
} from "../../../src/validations/order.schema.js";

const VALID_UUID = "550e8400-e29b-41d4-a716-446655440000";

describe("placeOrderSchema", () => {
  const validOrder = {
    items: [{ productId: VALID_UUID, quantity: 2 }],
  };

  it("should pass with valid order", () => {
    const result = placeOrderSchema.safeParse(validOrder);
    expect(result.success).toBe(true);
  });

  it("should allow optional note per item", () => {
    const data = {
      items: [{ productId: VALID_UUID, quantity: 1, note: "No sugar" }],
    };
    const result = placeOrderSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("should reject empty items array", () => {
    const result = placeOrderSchema.safeParse({ items: [] });
    expect(result.success).toBe(false);
  });

  it("should reject quantity less than 1", () => {
    const data = { items: [{ productId: VALID_UUID, quantity: 0 }] };
    const result = placeOrderSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("should reject invalid product ID", () => {
    const data = { items: [{ productId: "not-a-uuid", quantity: 1 }] };
    const result = placeOrderSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("should reject missing items field", () => {
    const result = placeOrderSchema.safeParse({});
    expect(result.success).toBe(false);
  });

  it("should allow passthrough of extra fields", () => {
    const data = { ...validOrder, extraField: "value" };
    const result = placeOrderSchema.safeParse(data);
    expect(result.success).toBe(true);
    expect(result.data.extraField).toBe("value");
  });
});

describe("addItemsSchema", () => {
  it("should pass with valid items", () => {
    const data = { items: [{ productId: VALID_UUID, quantity: 3 }] };
    const result = addItemsSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("should reject empty items array", () => {
    const result = addItemsSchema.safeParse({ items: [] });
    expect(result.success).toBe(false);
  });
});

describe("updateOrderStatusSchema", () => {
  const validStatuses = [
    "CONFIRMED",
    "PREPARING",
    "READY",
    "SERVED",
    "PAID",
    "CANCELLED",
  ];

  it.each(validStatuses)("should accept valid status: %s", (status) => {
    const result = updateOrderStatusSchema.safeParse({ status });
    expect(result.success).toBe(true);
  });

  it("should reject invalid status", () => {
    const result = updateOrderStatusSchema.safeParse({ status: "UNKNOWN" });
    expect(result.success).toBe(false);
  });

  it("should reject empty status", () => {
    const result = updateOrderStatusSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});

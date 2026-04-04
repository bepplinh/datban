import { z } from "zod";

export const placeOrderSchema = z
  .object({
    items: z
      .array(
        z.object({
          productId: z.string().uuid("Invalid product ID"),
          quantity: z.number().int().min(1, "Quantity must be at least 1"),
          note: z.string().optional(),
        }),
      )
      .min(1, "Order must have at least one item"),
  })
  .passthrough();

export const addItemsSchema = z
  .object({
    items: z
      .array(
        z.object({
          productId: z.string().uuid("Invalid product ID"),
          quantity: z.number().int().min(1, "Quantity must be at least 1"),
          note: z.string().optional(),
        }),
      )
      .min(1, "Must add at least one item"),
  })
  .passthrough();

export const updateOrderStatusSchema = z.object({
  status: z.enum(
    ["CONFIRMED", "PREPARING", "READY", "SERVED", "PAID", "CANCELLED"],
    { message: "Invalid order status" },
  ),
});

import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  price: z.coerce.number().positive("Price must be positive"),
  image: z.string().optional(),
  categoryId: z.string().uuid("Invalid category ID"),
  isAvailable: z
    .union([z.boolean(), z.string().transform((v) => v === "true")])
    .optional()
    .default(true),
});

export const updateProductSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  price: z.coerce.number().positive("Price must be positive").optional(),
  image: z.string().optional(),
  categoryId: z.string().uuid("Invalid category ID").optional(),
  isAvailable: z
    .union([z.boolean(), z.string().transform((v) => v === "true")])
    .optional(),
});

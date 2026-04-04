import { z } from "zod";

export const createTableSchema = z.object({
  name: z.string().min(1, "Table name is required"),
});

export const updateTableSchema = z.object({
  name: z.string().min(1).optional(),
  status: z.enum(["EMPTY", "OCCUPIED"]).optional(),
});

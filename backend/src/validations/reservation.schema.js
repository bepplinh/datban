import { z } from "zod";

export const createReservationSchema = z.object({
  customerName: z.string().min(1, "Vui lòng nhập họ và tên"),
  phoneNumber: z
    .string()
    .min(10, "Vui lòng nhập số điện thoại hợp lệ")
    .max(15, "Vui lòng nhập số điện thoại hợp lệ"),
  partySize: z.number().int().min(1, "Số người phải lớn hơn 0"),
  date: z.string().min(1, "Vui lòng chọn ngày"),
  time: z.string().min(1, "Vui lòng chọn giờ"),
  notes: z.string().optional(),
});

export const updateReservationStatusSchema = z.object({
  status: z.enum(["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"], {
    errorMap: () => ({ message: "Trạng thái không hợp lệ" }),
  }),
});

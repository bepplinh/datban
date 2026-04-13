import { describe, it, expect } from "vitest";
import {
  createReservationSchema,
  updateReservationStatusSchema,
} from "../../../src/validations/reservation.schema.js";

describe("createReservationSchema", () => {
  const validReservation = {
    customerName: "Nguyễn Văn A",
    phoneNumber: "0901234567",
    partySize: 4,
    date: "2026-04-15",
    time: "18:00",
  };

  it("should pass with valid reservation data", () => {
    const result = createReservationSchema.safeParse(validReservation);
    expect(result.success).toBe(true);
  });

  it("should allow optional notes", () => {
    const data = { ...validReservation, notes: "Bàn gần cửa sổ" };
    const result = createReservationSchema.safeParse(data);
    expect(result.success).toBe(true);
    expect(result.data.notes).toBe("Bàn gần cửa sổ");
  });

  it("should reject empty customerName", () => {
    const data = { ...validReservation, customerName: "" };
    const result = createReservationSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("should reject phone number shorter than 10 chars", () => {
    const data = { ...validReservation, phoneNumber: "090123" };
    const result = createReservationSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("should reject phone number longer than 15 chars", () => {
    const data = { ...validReservation, phoneNumber: "0901234567890123" };
    const result = createReservationSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("should reject partySize of 0", () => {
    const data = { ...validReservation, partySize: 0 };
    const result = createReservationSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("should reject negative partySize", () => {
    const data = { ...validReservation, partySize: -2 };
    const result = createReservationSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("should reject empty date", () => {
    const data = { ...validReservation, date: "" };
    const result = createReservationSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("should reject empty time", () => {
    const data = { ...validReservation, time: "" };
    const result = createReservationSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("should reject missing all required fields", () => {
    const result = createReservationSchema.safeParse({});
    expect(result.success).toBe(false);
    expect(result.error.issues.length).toBeGreaterThanOrEqual(4);
  });
});

describe("updateReservationStatusSchema", () => {
  const validStatuses = ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"];

  it.each(validStatuses)("should accept valid status: %s", (status) => {
    const result = updateReservationStatusSchema.safeParse({ status });
    expect(result.success).toBe(true);
  });

  it("should reject invalid status", () => {
    const result = updateReservationStatusSchema.safeParse({
      status: "INVALID",
    });
    expect(result.success).toBe(false);
  });

  it("should reject empty object", () => {
    const result = updateReservationStatusSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});

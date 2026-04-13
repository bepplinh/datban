import { describe, it, expect } from "vitest";
import { loginSchema } from "../../../src/validations/auth.schema.js";

describe("loginSchema", () => {
  const validData = {
    username: "admin123",
    password: "Admin@123",
  };

  it("should pass with valid credentials", () => {
    const result = loginSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should reject username shorter than 3 characters", () => {
    const result = loginSchema.safeParse({ ...validData, username: "ab" });
    expect(result.success).toBe(false);
    expect(result.error.issues[0].path).toContain("username");
  });

  it("should reject empty username", () => {
    const result = loginSchema.safeParse({ ...validData, username: "" });
    expect(result.success).toBe(false);
  });

  it("should reject password shorter than 8 characters", () => {
    const result = loginSchema.safeParse({ ...validData, password: "Aa@1" });
    expect(result.success).toBe(false);
  });

  it("should reject password without uppercase letter", () => {
    const result = loginSchema.safeParse({
      ...validData,
      password: "admin@123",
    });
    expect(result.success).toBe(false);
  });

  it("should reject password without lowercase letter", () => {
    const result = loginSchema.safeParse({
      ...validData,
      password: "ADMIN@123",
    });
    expect(result.success).toBe(false);
  });

  it("should reject password without number", () => {
    const result = loginSchema.safeParse({
      ...validData,
      password: "Admin@abc",
    });
    expect(result.success).toBe(false);
  });

  it("should reject password without special character", () => {
    const result = loginSchema.safeParse({
      ...validData,
      password: "Admin1234",
    });
    expect(result.success).toBe(false);
  });

  it("should reject missing fields", () => {
    const result = loginSchema.safeParse({});
    expect(result.success).toBe(false);
    expect(result.error.issues.length).toBeGreaterThanOrEqual(2);
  });
});

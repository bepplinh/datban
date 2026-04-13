import { describe, it, expect } from "vitest";
import {
  AppError,
  NotFoundError,
  ValidationError,
  UnauthorizedError,
  ForbiddenError,
  ConflictError,
} from "../../../src/utils/AppError.js";

describe("AppError", () => {
  it("should create an AppError with correct properties", () => {
    const error = new AppError("Something failed", "CUSTOM_ERROR", 500);
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(AppError);
    expect(error.message).toBe("Something failed");
    expect(error.code).toBe("CUSTOM_ERROR");
    expect(error.statusCode).toBe(500);
    expect(error.isOperational).toBe(true);
    expect(error.details).toBeNull();
  });

  it("should accept optional details", () => {
    const details = { field: "email", reason: "invalid" };
    const error = new AppError("Fail", "FAIL", 400, details);
    expect(error.details).toEqual(details);
  });
});

describe("NotFoundError", () => {
  it("should default to 404 status", () => {
    const error = new NotFoundError();
    expect(error.statusCode).toBe(404);
    expect(error.code).toBe("NOT_FOUND");
    expect(error.message).toBe("Resource not found");
    expect(error.isOperational).toBe(true);
  });

  it("should accept custom message", () => {
    const error = new NotFoundError("User not found");
    expect(error.message).toBe("User not found");
    expect(error.statusCode).toBe(404);
  });
});

describe("ValidationError", () => {
  it("should default to 400 status", () => {
    const error = new ValidationError();
    expect(error.statusCode).toBe(400);
    expect(error.code).toBe("VALIDATION_ERROR");
    expect(error.message).toBe("Validation failed");
  });
});

describe("UnauthorizedError", () => {
  it("should default to 401 status", () => {
    const error = new UnauthorizedError();
    expect(error.statusCode).toBe(401);
    expect(error.code).toBe("UNAUTHORIZED");
    expect(error.message).toBe("Unauthorized");
  });
});

describe("ForbiddenError", () => {
  it("should default to 403 status", () => {
    const error = new ForbiddenError();
    expect(error.statusCode).toBe(403);
    expect(error.code).toBe("FORBIDDEN");
    expect(error.message).toBe("Forbidden");
  });
});

describe("ConflictError", () => {
  it("should default to 409 status", () => {
    const error = new ConflictError();
    expect(error.statusCode).toBe(409);
    expect(error.code).toBe("CONFLICT");
    expect(error.message).toBe("Conflict");
  });

  it("should accept custom message and details", () => {
    const error = new ConflictError("Duplicate entry", { key: "email" });
    expect(error.message).toBe("Duplicate entry");
    expect(error.details).toEqual({ key: "email" });
  });
});

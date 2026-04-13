import { describe, it, expect, vi } from "vitest";
import { errorHandler } from "../../../src/middlewares/errorHandler.js";
import { AppError, NotFoundError } from "../../../src/utils/AppError.js";

// Helper to create mock req/res/next
const createMocks = () => ({
  req: {},
  res: {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
  },
  next: vi.fn(),
});

describe("errorHandler middleware", () => {
  it("should handle AppError with correct status and JSON structure", () => {
    const { req, res, next } = createMocks();
    const error = new NotFoundError("User not found");

    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: {
        code: "NOT_FOUND",
        message: "User not found",
      },
    });
  });

  it("should include details when present in AppError", () => {
    const { req, res, next } = createMocks();
    const details = { field: "email" };
    const error = new AppError(
      "Validation failed",
      "VALIDATION_ERROR",
      400,
      details,
    );

    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: {
        code: "VALIDATION_ERROR",
        message: "Validation failed",
        details: { field: "email" },
      },
    });
  });

  it("should handle generic Error with 500 status", () => {
    const { req, res, next } = createMocks();
    const error = new Error("Something broke");
    // suppress console.error in test output
    vi.spyOn(console, "error").mockImplementation(() => {});

    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: expect.objectContaining({
          code: "INTERNAL_ERROR",
        }),
      }),
    );
  });

  it("should show error message in non-production mode", () => {
    const { req, res, next } = createMocks();
    const error = new Error("Debugging info");
    vi.spyOn(console, "error").mockImplementation(() => {});

    errorHandler(error, req, res, next);

    const jsonArg = res.json.mock.calls[0][0];
    expect(jsonArg.error.message).toBe("Debugging info");
  });
});

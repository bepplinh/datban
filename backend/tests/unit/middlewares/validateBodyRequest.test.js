import { describe, it, expect, vi } from "vitest";
import { validateBodyRequest } from "../../../src/middlewares/validateBodyRequest.js";
import { z } from "zod";

const createMocks = (body = {}) => ({
  req: { body },
  res: {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
  },
  next: vi.fn(),
});

const testSchema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.number().int().min(0, "Age must be non-negative"),
});

describe("validateBodyRequest middleware", () => {
  it("should call next and update req.body with valid data", async () => {
    const { req, res, next } = createMocks({ name: "John", age: 25 });
    const middleware = validateBodyRequest(testSchema);

    await middleware(req, res, next);

    expect(next).toHaveBeenCalledWith();
    expect(req.body).toEqual({ name: "John", age: 25 });
  });

  it("should strip unknown fields (strict by default)", async () => {
    const { req, res, next } = createMocks({
      name: "John",
      age: 25,
      extra: "X",
    });
    const middleware = validateBodyRequest(testSchema);

    await middleware(req, res, next);

    expect(next).toHaveBeenCalledWith();
    expect(req.body).not.toHaveProperty("extra");
  });

  it("should return 400 with field errors on validation failure", async () => {
    const { req, res, next } = createMocks({ name: "", age: -1 });
    const middleware = validateBodyRequest(testSchema);
    vi.spyOn(console, "error").mockImplementation(() => {});

    await middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      errors: expect.arrayContaining([
        expect.objectContaining({ field: "name" }),
        expect.objectContaining({ field: "age" }),
      ]),
    });
    expect(next).not.toHaveBeenCalledWith();
  });

  it("should return 400 for missing required fields", async () => {
    const { req, res, next } = createMocks({});
    const middleware = validateBodyRequest(testSchema);
    vi.spyOn(console, "error").mockImplementation(() => {});

    await middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("should pass non-Zod errors to next", async () => {
    const badSchema = {
      parseAsync: vi.fn().mockRejectedValue(new Error("boom")),
    };
    const { req, res, next } = createMocks({});
    const middleware = validateBodyRequest(badSchema);
    vi.spyOn(console, "error").mockImplementation(() => {});

    await middleware(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});

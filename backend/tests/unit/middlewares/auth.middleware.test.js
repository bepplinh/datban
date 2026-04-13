import { describe, it, expect, vi } from "vitest";
import {
  authenticate,
  authorize,
} from "../../../src/middlewares/auth.middleware.js";
import { generateAccessToken } from "../../../src/utils/jwt.js";

const createMocks = (overrides = {}) => ({
  req: {
    headers: {},
    ...overrides,
  },
  res: {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
  },
  next: vi.fn(),
});

describe("authenticate middleware", () => {
  const tokenPayload = { id: "user-1", username: "admin", role: "ADMIN" };

  it("should set req.user and call next with valid token", () => {
    const token = generateAccessToken(tokenPayload);
    const { req, res, next } = createMocks({
      headers: { authorization: `Bearer ${token}` },
    });

    authenticate(req, res, next);

    expect(req.user).toBeDefined();
    expect(req.user.id).toBe("user-1");
    expect(req.user.username).toBe("admin");
    expect(req.user.role).toBe("ADMIN");
    expect(next).toHaveBeenCalledWith();
  });

  it("should call next with UnauthorizedError when no header", () => {
    const { req, res, next } = createMocks();

    authenticate(req, res, next);

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 401,
        message: "Missing or invalid token",
      }),
    );
  });

  it("should call next with UnauthorizedError for non-Bearer scheme", () => {
    const { req, res, next } = createMocks({
      headers: { authorization: "Basic abc123" },
    });

    authenticate(req, res, next);

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({ statusCode: 401 }),
    );
  });

  it("should call next with UnauthorizedError for invalid token", () => {
    const { req, res, next } = createMocks({
      headers: { authorization: "Bearer invalid.token.here" },
    });

    authenticate(req, res, next);

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 401,
        message: "Token expired or invalid",
      }),
    );
  });
});

describe("authorize middleware", () => {
  it("should call next when user has matching role", () => {
    const { req, res, next } = createMocks();
    req.user = { id: "1", role: "ADMIN" };

    const middleware = authorize("ADMIN", "MANAGER");
    middleware(req, res, next);

    expect(next).toHaveBeenCalledWith();
  });

  it("should call next with ForbiddenError when role not allowed", () => {
    const { req, res, next } = createMocks();
    req.user = { id: "1", role: "STAFF" };

    const middleware = authorize("ADMIN");
    middleware(req, res, next);

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 403,
        code: "FORBIDDEN",
      }),
    );
  });

  it("should call next with ForbiddenError when no user", () => {
    const { req, res, next } = createMocks();

    const middleware = authorize("ADMIN");
    middleware(req, res, next);

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({ statusCode: 403 }),
    );
  });
});

import { describe, it, expect, vi, beforeEach } from "vitest";
import supertest from "supertest";

// Mock authService before importing app
vi.mock("../../src/services/auth.service.js", () => ({
  authService: {
    login: vi.fn(),
    refreshToken: vi.fn(),
  },
}));

// Mock Redis/BullMQ infrastructure to avoid real connections
vi.mock("../../src/config/redis.js", () => ({
  redisConnection: { on: vi.fn(), disconnect: vi.fn() },
  redisConfig: {},
}));

vi.mock("../../src/queues/index.js", () => ({
  orderQueue: { add: vi.fn() },
}));

vi.mock("../../src/config/socket.js", () => ({
  initSocket: vi.fn(),
  getIO: vi.fn(() => ({ emit: vi.fn(), to: vi.fn(() => ({ emit: vi.fn() })) })),
}));

vi.mock("../../src/services/socket.service.js", () => ({
  socketService: {
    emitNewOrder: vi.fn(),
    emitNewReservation: vi.fn(),
    emitDishReady: vi.fn(),
    emitOutOfStock: vi.fn(),
  },
}));

import app from "../../src/app.js";
import { authService } from "../../src/services/auth.service.js";

const request = supertest(app);

describe("Auth Routes – Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ─── POST /api/auth/login ──────────────────────
  describe("POST /api/auth/login", () => {
    const validCredentials = {
      username: "admin123",
      password: "Admin@123",
    };

    it("should return 200 with user and accessToken on success", async () => {
      authService.login.mockResolvedValue({
        user: { id: "1", name: "Admin", username: "admin123", role: "ADMIN" },
        accessToken: "mock-access-token",
        refreshToken: "mock-refresh-token",
      });

      const res = await request.post("/api/auth/login").send(validCredentials);

      expect(res.status).toBe(200);
      expect(res.body.data.user).toBeDefined();
      expect(res.body.data.user.username).toBe("admin123");
      expect(res.body.data.accessToken).toBe("mock-access-token");
    });

    it("should set refreshToken as httpOnly cookie", async () => {
      authService.login.mockResolvedValue({
        user: { id: "1", name: "Admin", username: "admin123", role: "ADMIN" },
        accessToken: "mock-access-token",
        refreshToken: "mock-refresh-token",
      });

      const res = await request.post("/api/auth/login").send(validCredentials);

      const cookies = res.headers["set-cookie"];
      expect(cookies).toBeDefined();
      const refreshCookie = cookies.find((c) => c.startsWith("refreshToken="));
      expect(refreshCookie).toBeDefined();
      expect(refreshCookie).toContain("HttpOnly");
    });

    it("should return 400 for invalid body (short username)", async () => {
      const res = await request
        .post("/api/auth/login")
        .send({ username: "ab", password: "Admin@123" });

      expect(res.status).toBe(400);
      expect(res.body.errors).toBeDefined();
    });

    it("should return 400 for weak password", async () => {
      const res = await request
        .post("/api/auth/login")
        .send({ username: "admin123", password: "weak" });

      expect(res.status).toBe(400);
    });

    it("should return 401 for wrong credentials", async () => {
      const { UnauthorizedError } = await import("../../src/utils/AppError.js");
      authService.login.mockRejectedValue(
        new UnauthorizedError("Invalid username or password"),
      );

      const res = await request.post("/api/auth/login").send(validCredentials);

      expect(res.status).toBe(401);
      expect(res.body.error.code).toBe("UNAUTHORIZED");
    });
  });

  // ─── POST /api/auth/logout ─────────────────────
  describe("POST /api/auth/logout", () => {
    it("should return 200 and clear refreshToken cookie", async () => {
      const res = await request.post("/api/auth/logout");

      expect(res.status).toBe(200);
      expect(res.body.message).toBe("Logged out successfully");
    });
  });

  // ─── GET /api/auth/refresh ─────────────────────
  describe("GET /api/auth/refresh", () => {
    it("should return 401 when no refresh token cookie", async () => {
      const res = await request.get("/api/auth/refresh");

      expect(res.status).toBe(401);
    });

    it("should return 200 with new tokens when valid cookie", async () => {
      authService.refreshToken.mockResolvedValue({
        user: { id: "1", name: "Admin", username: "admin123", role: "ADMIN" },
        accessToken: "new-access-token",
        refreshToken: "new-refresh-token",
      });

      const res = await request
        .get("/api/auth/refresh")
        .set("Cookie", "refreshToken=valid-refresh-token");

      expect(res.status).toBe(200);
      expect(res.body.data.accessToken).toBe("new-access-token");
    });
  });
});

import { describe, it, expect, vi, beforeEach } from "vitest";
import bcrypt from "bcrypt";

// Mock the repository and jwt utils
const mockUser = {
  id: "user-1",
  name: "Admin User",
  username: "admin",
  password: "$2b$10$hashedpassword",
  role: { role: "ADMIN" },
};

vi.mock("../../../src/repositories/user.repository.js", () => ({
  default: {
    findByUsername: vi.fn(),
    findById: vi.fn(),
  },
}));

import userRepo from "../../../src/repositories/user.repository.js";
import { authService } from "../../../src/services/auth.service.js";
import {
  verifyAccessToken,
  verifyRefreshToken,
} from "../../../src/utils/jwt.js";

describe("authService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("login", () => {
    it("should return user, accessToken, refreshToken on valid credentials", async () => {
      userRepo.findByUsername.mockResolvedValue(mockUser);
      vi.spyOn(bcrypt, "compare").mockResolvedValue(true);

      const result = await authService.login("admin", "Admin@123");

      expect(result.user).toEqual({
        id: "user-1",
        name: "Admin User",
        username: "admin",
        role: "ADMIN",
      });
      expect(result.accessToken).toBeTypeOf("string");
      expect(result.refreshToken).toBeTypeOf("string");

      // Verify tokens are valid
      const decoded = verifyAccessToken(result.accessToken);
      expect(decoded.id).toBe("user-1");
      expect(decoded.role).toBe("ADMIN");
    });

    it("should throw UnauthorizedError when user not found", async () => {
      userRepo.findByUsername.mockResolvedValue(null);

      await expect(authService.login("nobody", "pass123")).rejects.toThrow(
        "Invalid username or password",
      );
    });

    it("should throw UnauthorizedError when password is wrong", async () => {
      userRepo.findByUsername.mockResolvedValue(mockUser);
      vi.spyOn(bcrypt, "compare").mockResolvedValue(false);

      await expect(authService.login("admin", "wrongpass")).rejects.toThrow(
        "Invalid username or password",
      );
    });

    it("should call userRepo with the correct username", async () => {
      userRepo.findByUsername.mockResolvedValue(mockUser);
      vi.spyOn(bcrypt, "compare").mockResolvedValue(true);

      await authService.login("admin", "Admin@123");

      expect(userRepo.findByUsername).toHaveBeenCalledWith("admin");
    });
  });

  describe("refreshToken", () => {
    it("should return new tokens with valid refresh token", async () => {
      userRepo.findById.mockResolvedValue(mockUser);

      // Generate a real refresh token to pass in
      const { generateRefreshToken } =
        await import("../../../src/utils/jwt.js");
      const token = generateRefreshToken({
        id: "user-1",
        username: "admin",
        role: "ADMIN",
      });

      const result = await authService.refreshToken(token);

      expect(result.user.id).toBe("user-1");
      expect(result.accessToken).toBeTypeOf("string");
      expect(result.refreshToken).toBeTypeOf("string");
    });

    it("should throw UnauthorizedError with invalid token", async () => {
      await expect(authService.refreshToken("bad-token")).rejects.toThrow(
        "Invalid or expired refresh token",
      );
    });

    it("should throw UnauthorizedError when user no longer exists", async () => {
      userRepo.findById.mockResolvedValue(null);

      const { generateRefreshToken } =
        await import("../../../src/utils/jwt.js");
      const token = generateRefreshToken({
        id: "deleted-user",
        username: "gone",
        role: "ADMIN",
      });

      await expect(authService.refreshToken(token)).rejects.toThrow(
        "Invalid or expired refresh token",
      );
    });
  });
});

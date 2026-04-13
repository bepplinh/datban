import { describe, it, expect } from "vitest";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "../../../src/utils/jwt.js";

const PAYLOAD = { id: "user-1", username: "admin", role: "ADMIN" };

describe("JWT Utilities", () => {
  describe("generateAccessToken", () => {
    it("should return a valid JWT string", () => {
      const token = generateAccessToken(PAYLOAD);
      expect(token).toBeTypeOf("string");
      expect(token.split(".")).toHaveLength(3); // header.payload.signature
    });

    it("should encode the payload correctly", () => {
      const token = generateAccessToken(PAYLOAD);
      const decoded = verifyAccessToken(token);
      expect(decoded.id).toBe(PAYLOAD.id);
      expect(decoded.username).toBe(PAYLOAD.username);
      expect(decoded.role).toBe(PAYLOAD.role);
    });

    it("should include exp and iat claims", () => {
      const token = generateAccessToken(PAYLOAD);
      const decoded = verifyAccessToken(token);
      expect(decoded).toHaveProperty("exp");
      expect(decoded).toHaveProperty("iat");
    });
  });

  describe("generateRefreshToken", () => {
    it("should return a valid JWT string", () => {
      const token = generateRefreshToken(PAYLOAD);
      expect(token).toBeTypeOf("string");
      expect(token.split(".")).toHaveLength(3);
    });

    it("should be verifiable with verifyRefreshToken", () => {
      const token = generateRefreshToken(PAYLOAD);
      const decoded = verifyRefreshToken(token);
      expect(decoded.id).toBe(PAYLOAD.id);
    });
  });

  describe("verifyAccessToken", () => {
    it("should throw for invalid token", () => {
      expect(() => verifyAccessToken("invalid.token.here")).toThrow();
    });

    it("should throw for tampered token", () => {
      const token = generateAccessToken(PAYLOAD);
      const tampered = token.slice(0, -5) + "XXXXX";
      expect(() => verifyAccessToken(tampered)).toThrow();
    });

    it("should reject refresh token as access token", () => {
      const refreshToken = generateRefreshToken(PAYLOAD);
      expect(() => verifyAccessToken(refreshToken)).toThrow();
    });
  });

  describe("verifyRefreshToken", () => {
    it("should throw for invalid token", () => {
      expect(() => verifyRefreshToken("invalid.token.here")).toThrow();
    });

    it("should reject access token as refresh token", () => {
      const accessToken = generateAccessToken(PAYLOAD);
      expect(() => verifyRefreshToken(accessToken)).toThrow();
    });
  });
});

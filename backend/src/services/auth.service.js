import bcrypt from "bcrypt";
import userRepo from "../repositories/user.repository.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";
import { UnauthorizedError } from "../utils/AppError.js";

export const authService = {
  login: async (username, password) => {
    const user = await userRepo.findByUsername(username);
    if (!user) {
      throw new UnauthorizedError("Invalid username or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid username or password");
    }

    const tokenPayload = {
      id: user.id,
      username: user.username,
      role: user.role.role,
    };

    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    return {
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        role: user.role.role,
      },
      accessToken,
      refreshToken, // Still return it, controller will decide what to do
    };
  },

  refreshToken: async (token) => {
    try {
      const decoded = verifyRefreshToken(token);

      // Optional: Check if user still exists or is active
      const user = await userRepo.findById(decoded.id);
      if (!user) {
        throw new UnauthorizedError("User no longer exists");
      }

      const tokenPayload = {
        id: user.id,
        username: user.username,
        role: user.role.role,
      };

      const accessToken = generateAccessToken(tokenPayload);
      const newRefreshToken = generateRefreshToken(tokenPayload);

      return {
        user: {
          id: user.id,
          name: user.name,
          username: user.username,
          role: user.role.role,
        },
        accessToken,
        refreshToken: newRefreshToken,
      };
    } catch (err) {
      throw new UnauthorizedError("Invalid or expired refresh token");
    }
  },
};

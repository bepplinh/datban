import { authService } from "../services/auth.service.js";
import { UnauthorizedError } from "../utils/AppError.js";

const setTokenCookie = (res, refreshToken) => {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: "/", // Crucial: make cookie available for all routes
  });
};

export const authController = {
  login: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const { user, accessToken, refreshToken } = await authService.login(
        username,
        password,
      );

      setTokenCookie(res, refreshToken);

      res.status(200).json({
        data: { user, accessToken },
      });
    } catch (err) {
      next(err);
    }
  },

  refreshToken: async (req, res, next) => {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        throw new UnauthorizedError("Missing refresh token");
      }

      const {
        user,
        accessToken,
        refreshToken: newRefreshToken,
      } = await authService.refreshToken(refreshToken);

      setTokenCookie(res, newRefreshToken);

      res.status(200).json({
        data: { user, accessToken },
      });
    } catch (err) {
      next(err);
    }
  },

  logout: async (req, res, next) => {
    try {
      res.clearCookie("refreshToken");
      res.status(200).json({
        message: "Logged out successfully",
      });
    } catch (err) {
      next(err);
    }
  },
};

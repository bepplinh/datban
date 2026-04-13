import express from "express";
import rateLimit from "express-rate-limit";
import { authController } from "../controllers/auth.controller.js";
import { validateBodyRequest } from "../middlewares/validateBodyRequest.js";
import { loginSchema } from "../validations/auth.schema.js";

const authRouter = express.Router();

// Rate limit for login: max 10 attempts per 15 minutes
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    error: {
      code: "TOO_MANY_REQUESTS",
      message: "Quá nhiều lần đăng nhập. Vui lòng thử lại sau 15 phút.",
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limit for refresh: max 30 per 15 minutes
const refreshLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
});

authRouter.post(
  "/login",
  loginLimiter,
  validateBodyRequest(loginSchema),
  authController.login,
);

authRouter.get("/refresh", refreshLimiter, authController.refreshToken);
authRouter.post("/logout", authController.logout);

export default authRouter;

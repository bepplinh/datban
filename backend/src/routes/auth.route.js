import express from "express";
import { authController } from "../controllers/auth.controller.js";
import { validateBodyRequest } from "../middlewares/validateBodyRequest.js";
import { loginSchema } from "../validations/auth.schema.js";

const authRouter = express.Router();

authRouter.post(
  "/login",
  validateBodyRequest(loginSchema),
  authController.login,
);

authRouter.get("/refresh", authController.refreshToken);
authRouter.post("/logout", authController.logout);

export default authRouter;

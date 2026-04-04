import express from "express";
import payosController from "../controllers/staff/payos.controller.js";

const payosRouter = express.Router();

payosRouter.post("/create-payment-link", payosController.createPaymentLink);
payosRouter.post("/webhook-verify", payosController.webhookVerify);

export default payosRouter;

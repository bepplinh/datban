import express from "express";
import socketController from "../controllers/socket.controller.js";

const router = express.Router();

router.post("/send-notification", socketController.sendNotification);

export default router;

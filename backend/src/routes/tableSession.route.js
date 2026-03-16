import express from "express";
import { createTableSessionController } from "../controllers/tableSession.controller.js";

const router = express.Router();

router.post("/table-session", createTableSessionController);

export default router;

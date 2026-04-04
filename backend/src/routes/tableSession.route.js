import express from "express";
import {TableSessionController} from "../controllers/tableSession.controller.js";

const router = express.Router();

router.post("/table-session", TableSessionController.createTableSession);

export default router;

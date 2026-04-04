import express from "express";
import { kitchenController } from "../controllers/kitchen.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authenticate);
router.use(authorize("KITCHEN", "ADMIN"));

router.get("/queue", kitchenController.listQueue);
router.patch("/items/:id/status", kitchenController.updateItemStatus);

export default router;

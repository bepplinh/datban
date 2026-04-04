import express from "express";
import {
  createServiceRequest,
  getPendingRequests,
  resolveServiceRequest,
} from "../controllers/serviceRequest.controller.js";

const router = express.Router();

// Public route for customers to call staff
router.post("/", createServiceRequest);

// Future implementation: Add staffAuth middleware protecting these routes
router.get("/pending", getPendingRequests);
router.patch("/:id/resolve", resolveServiceRequest);

export default router;

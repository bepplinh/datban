import express from "express";
import { reservationController } from "../controllers/reservation.controller.js";
import { validateBodyRequest } from "../middlewares/validateBodyRequest.js";
import {
  createReservationSchema,
  updateReservationStatusSchema,
} from "../validations/reservation.schema.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";

const reservationRouter = express.Router();

reservationRouter.post(
  "/",
  validateBodyRequest(createReservationSchema),
  reservationController.createReservation,
);

reservationRouter.use(authenticate, authorize("ADMIN", "STAFF"));

reservationRouter.get("/", reservationController.getReservations);
reservationRouter.patch(
  "/:id/status",
  validateBodyRequest(updateReservationStatusSchema),
  reservationController.updateReservationStatus,
);

export default reservationRouter;

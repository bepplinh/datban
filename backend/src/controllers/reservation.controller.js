import { reservationService } from "../services/reservation.service.js";

export const reservationController = {
  createReservation: async (req, res, next) => {
    try {
      // Check if this is a staff member creating it
      const isStaffCreated = req.user
        ? ["ADMIN", "STAFF"].includes(req.user.role)
        : false;
      const reservation = await reservationService.createReservation(
        req.body,
        isStaffCreated,
      );
      res.status(201).json({ data: reservation });
    } catch (err) {
      next(err);
    }
  },

  getReservations: async (req, res, next) => {
    try {
      const filters = {};
      if (req.query.status) filters.status = req.query.status;
      if (req.query.date) filters.date = req.query.date;

      const reservations = await reservationService.getReservations(filters);
      res.json({ data: reservations });
    } catch (err) {
      next(err);
    }
  },

  updateReservationStatus: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updated = await reservationService.updateStatus(id, status);
      res.json({ data: updated });
    } catch (err) {
      next(err);
    }
  },
};

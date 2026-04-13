import { reservationRepo } from "../repositories/reservation.repository.js";
import { socketService } from "./socket.service.js";
import { NotFoundError, ConflictError } from "../utils/AppError.js";

export const reservationService = {
  createReservation: async (data, isStaffCreated = false) => {
    // Parse date from strong yyyy-mm-dd string to JS Date
    const parsedDate = new Date(data.date);

    const reservationData = {
      ...data,
      date: new Date(parsedDate.setHours(0, 0, 0, 0)), // Store at midnight so db.Date works properly
    };

    const reservation = await reservationRepo.create(reservationData);

    // Emit event to staff if it was created by a customer via the landing page
    if (!isStaffCreated) {
      socketService.emitNewReservation(reservation);
    }

    return reservation;
  },

  getReservations: async (filters = {}) => {
    return reservationRepo.findAll(filters);
  },

  updateStatus: async (id, status) => {
    const existing = await reservationRepo.findById(id);
    if (!existing) {
      throw new NotFoundError("Không tìm thấy đơn đặt bàn");
    }

    // Only allow specific transitions if needed, but for now allow any
    const updated = await reservationRepo.updateStatus(id, status);

    // In a real system we might send an SMS/Email to the customer here
    return updated;
  },
};

import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../../src/repositories/reservation.repository.js", () => ({
  reservationRepo: {
    create: vi.fn(),
    findAll: vi.fn(),
    findById: vi.fn(),
    updateStatus: vi.fn(),
  },
}));

vi.mock("../../../src/services/socket.service.js", () => ({
  socketService: {
    emitNewReservation: vi.fn(),
  },
}));

import { reservationRepo } from "../../../src/repositories/reservation.repository.js";
import { socketService } from "../../../src/services/socket.service.js";
import { reservationService } from "../../../src/services/reservation.service.js";

describe("reservationService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("createReservation", () => {
    const data = {
      customerName: "Nguyễn Văn A",
      phoneNumber: "0901234567",
      partySize: 4,
      date: "2026-04-15",
      time: "18:00",
    };

    it("should create reservation and emit socket event for customer", async () => {
      const mockReservation = { id: "res-1", ...data };
      reservationRepo.create.mockResolvedValue(mockReservation);

      const result = await reservationService.createReservation(data);

      expect(reservationRepo.create).toHaveBeenCalled();
      expect(socketService.emitNewReservation).toHaveBeenCalledWith(
        mockReservation,
      );
      expect(result).toEqual(mockReservation);
    });

    it("should NOT emit socket event when created by staff", async () => {
      const mockReservation = { id: "res-1", ...data };
      reservationRepo.create.mockResolvedValue(mockReservation);

      await reservationService.createReservation(data, true);

      expect(socketService.emitNewReservation).not.toHaveBeenCalled();
    });

    it("should normalize date to midnight", async () => {
      reservationRepo.create.mockResolvedValue({ id: "res-1" });

      await reservationService.createReservation(data);

      const calledWith = reservationRepo.create.mock.calls[0][0];
      const date = calledWith.date;
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
    });
  });

  describe("getReservations", () => {
    it("should return all reservations with no filters", async () => {
      const mockList = [{ id: "res-1" }, { id: "res-2" }];
      reservationRepo.findAll.mockResolvedValue(mockList);

      const result = await reservationService.getReservations();

      expect(reservationRepo.findAll).toHaveBeenCalledWith({});
      expect(result).toEqual(mockList);
    });

    it("should pass filters to repository", async () => {
      reservationRepo.findAll.mockResolvedValue([]);

      await reservationService.getReservations({ status: "PENDING" });

      expect(reservationRepo.findAll).toHaveBeenCalledWith({
        status: "PENDING",
      });
    });
  });

  describe("updateStatus", () => {
    it("should update status of existing reservation", async () => {
      reservationRepo.findById.mockResolvedValue({
        id: "res-1",
        status: "PENDING",
      });
      reservationRepo.updateStatus.mockResolvedValue({
        id: "res-1",
        status: "CONFIRMED",
      });

      const result = await reservationService.updateStatus(
        "res-1",
        "CONFIRMED",
      );

      expect(result.status).toBe("CONFIRMED");
      expect(reservationRepo.updateStatus).toHaveBeenCalledWith(
        "res-1",
        "CONFIRMED",
      );
    });

    it("should throw NotFoundError when reservation not found", async () => {
      reservationRepo.findById.mockResolvedValue(null);

      await expect(
        reservationService.updateStatus("bad-id", "CONFIRMED"),
      ).rejects.toThrow("Không tìm thấy đơn đặt bàn");
    });
  });
});

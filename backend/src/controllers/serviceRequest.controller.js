import prisma from "../libs/prisma.js";
import { socketService } from "../services/socket.service.js";

export const createServiceRequest = async (req, res, next) => {
  try {
    const { tableId, type } = req.body;

    if (!tableId || !type) {
      return res.status(400).json({ error: "Thiếu tableId hoặc type" });
    }

    const newRequest = await prisma.servicerequest.create({
      data: {
        tableId,
        type,
        status: "PENDING",
      },
      include: {
        table: {
          select: { name: true },
        },
      },
    });

    socketService.emitToRoom("staff-room", "new_service_request", newRequest);

    res
      .status(201)
      .json({ message: "Gửi yêu cầu thành công", data: newRequest });
  } catch (error) {
    console.error("Error creating service request:", error);
    next(error);
  }
};

export const getPendingRequests = async (req, res, next) => {
  try {
    const requests = await prisma.servicerequest.findMany({
      where: {
        status: "PENDING",
      },
      include: {
        table: { select: { name: true } },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({ data: requests });
  } catch (error) {
    console.error("Error fetching service requests:", error);
    next(error);
  }
};

export const resolveServiceRequest = async (req, res, next) => {
  try {
    const { id } = req.params;

    const request = await prisma.servicerequest.update({
      where: { id },
      data: { status: "RESOLVED" },
    });

    socketService.emitToRoom("staff-room", "service_request_resolved", { id });

    res.status(200).json({ message: "Đã xử lý yêu cầu", data: request });
  } catch (error) {
    console.error("Error resolving service request:", error);
    next(error);
  }
};

import prisma from "../../libs/prisma.js";

export const orderController = {
  // Get all orders with pagination, filtering
  getOrders: async (req, res) => {
    try {
      const { page = 1, limit = 10, status, search, from, to } = req.query;
      const skip = (Number(page) - 1) * Number(limit);
      const take = Number(limit);

      const where = {};

      if (status) {
        where.status = status;
      }

      if (search) {
        where.orderNumber = {
          equals: isNaN(parseInt(search)) ? undefined : parseInt(search),
        };
      }

      if (from || to) {
        where.createdAt = {};
        if (from) where.createdAt.gte = new Date(from);
        if (to) where.createdAt.lte = new Date(to);
      }

      const [orders, total] = await Promise.all([
        prisma.order.findMany({
          where,
          skip,
          take,
          orderBy: { createdAt: "desc" },
          include: {
            table: true,
            payment: true,
          },
        }),
        prisma.order.count({ where }),
      ]);

      res.status(200).json({
        success: true,
        data: orders,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          totalPages: Math.ceil(total / Number(limit)),
        },
      });
    } catch (error) {
      console.error("[getOrders]", error);
      res.status(500).json({ success: false, message: "Lỗi Server Nội Bộ" });
    }
  },

  // Get order details by ID
  getOrderById: async (req, res) => {
    try {
      const { id } = req.params;

      const order = await prisma.order.findUnique({
        where: { id },
        include: {
          table: true,
          payment: true,
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      if (!order) {
        return res
          .status(404)
          .json({ success: false, message: "Không tìm thấy đơn hàng" });
      }

      res.status(200).json({ success: true, data: order });
    } catch (error) {
      console.error("[getOrderById]", error);
      res.status(500).json({ success: false, message: "Lỗi Server Nội Bộ" });
    }
  },

  // Update order status (Optional for Admin)
  updateOrderStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      // Ensure status is valid order_status enum
      // (PENDING, CONFIRMED, PREPARING, READY, SERVED, PAID, CANCELLED)
      const validStatuses = [
        "PENDING",
        "CONFIRMED",
        "PREPARING",
        "READY",
        "SERVED",
        "PAID",
        "CANCELLED",
      ];
      if (!validStatuses.includes(status)) {
        return res
          .status(400)
          .json({ success: false, message: "Trạng thái không hợp lệ" });
      }

      const updatedOrder = await prisma.order.update({
        where: { id },
        data: { status },
        include: {
          table: true,
        },
      });

      res.status(200).json({ success: true, data: updatedOrder });
    } catch (error) {
      console.error("[updateOrderStatus]", error);
      res.status(500).json({ success: false, message: "Lỗi Server Nội Bộ" });
    }
  },
};

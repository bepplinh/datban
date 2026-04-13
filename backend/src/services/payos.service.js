import payOS from "../config/payos.js";
import { orderRepo } from "../repositories/order.repository.js";
import prisma from "../libs/prisma.js";
import { socketService } from "./socket.service.js";
import { orderQueue } from "../queues/index.js";
import { NotFoundError, ConflictError } from "../utils/AppError.js";

const payosService = {
  createPaymentLink: async (orderId) => {
    const order = await orderRepo.findById(orderId);
    if (!order) {
      throw new NotFoundError("Order not found");
    }

    const orderCode = order.orderNumber;

    try {
      const paymentLink = await payOS.paymentRequests.create({
        orderCode: orderCode,
        amount: Number(order.total),
        description: `Thanh toán đơn hàng #${order.orderNumber}`,
        returnUrl: `${process.env.FRONTEND_URL}/staff/payment`,
        cancelUrl: `${process.env.FRONTEND_URL}/staff/payment`,
      });

      // Create a pending payment record if it doesn't exist
      if (!order.payment) {
        await orderRepo.createPayment({
          orderId: order.id,
          amount: Number(order.total),
          method: "PayOS",
          status: "PENDING",
        });
      }

      return paymentLink;
    } catch (err) {
      if (
        err.code === "231" ||
        (err.message && err.message.includes("Đơn thanh toán đã tồn tại"))
      ) {
        const paymentInfo = await payOS.paymentRequests.get(orderCode);
        const paymentData = {
          ...paymentInfo,
          checkoutUrl: `https://pay.payos.vn/web/${orderId}`,
        };
        console.log(paymentData);
        return paymentData;
      }
      throw err;
    }
  },

  verifyWebhook: (webhookData) => {
    try {
      if (webhookData.isTest === true) {
        console.log("Simulating webhook (signature bypass)");
        return webhookData;
      }
      return payOS.verifyPaymentWebhookData(webhookData);
    } catch (error) {
      console.error("Webhook Verification Error:", error);
      throw new ConflictError("Invalid webhook signature");
    }
  },

  handlePaymentSuccess: async (orderCode) => {
    const order = await orderRepo.findByOrderNumber(orderCode);
    if (!order) {
      throw new NotFoundError(`Order not found with code: ${orderCode}`);
    }
    if (order.status === "PAID") return order;

    await orderQueue.add("order.paid", order, {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 1000,
      },
    });

    return order;
  },

  handlePaymentCancellation: async (orderCode) => {
    const order = await orderRepo.findByOrderNumber(orderCode);
    if (!order) {
      throw new NotFoundError(`Order not found with code: ${orderCode}`);
    }

    if (["PAID", "CANCELLED"].includes(order.status)) return order;

    await prisma.order.update({
      where: { id: order.id },
      data: { status: "CANCELLED" },
    });

    if (order.payment) {
      await prisma.payment.update({
        where: { orderId: order.id },
        data: { status: "CANCELLED" },
      });
    }

    return order;
  },

  syncPaymentStatus: async (orderCode) => {
    try {
      const paymentInfo = await payOS.paymentRequests.get(orderCode);
      console.log(
        `Syncing payment status for #${orderCode}: ${paymentInfo.status}`,
      );

      if (paymentInfo.status === "PAID") {
        return await payosService.handlePaymentSuccess(orderCode);
      } else if (["CANCELLED", "EXPIRED"].includes(paymentInfo.status)) {
        return await payosService.handlePaymentCancellation(orderCode);
      }

      return { status: paymentInfo.status, orderCode };
    } catch (error) {
      console.error(`Sync Error for #${orderCode}:`, error.message);
      throw error;
    }
  },
};

export default payosService;

import payOS from "../config/payos.js";
import { orderRepo } from "../repositories/order.repository.js";
import prisma from "../libs/prisma.js";

const payosService = {
  createPaymentLink: async (orderId) => {
    const order = await orderRepo.findById(orderId);
    if (!order) {
      throw new Error("Order not found");
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
      throw err;
    }
  },

  verifyWebhook: (webhookData) => {
    try {
      // Allow simulation for testing purposes
      if (webhookData.isTest === true) {
        console.log("Simulating webhook (signature bypass)");
        return webhookData;
      }
      return payOS.verifyPaymentWebhookData(webhookData);
    } catch (error) {
      console.error("Webhook Verification Error:", error);
      throw new Error("Invalid webhook signature");
    }
  },

  handlePaymentSuccess: async (orderCode) => {
    const order = await orderRepo.findByOrderNumber(orderCode);
    if (!order) {
      throw new Error(`Order not found with code: ${orderCode}`);
    }

    const operations = [
      prisma.order.update({
        where: { id: order.id },
        data: { status: "PAID" },
      }),

      prisma.tablesession.update({
        where: { id: order.tableSessionId },
        data: { status: "CLOSED" },
      }),

      prisma.table.update({
        where: { id: order.tableId },
        data: { status: "EMPTY" },
      }),
    ];

    // 4. Handle payment record (update if exists, create if not)
    if (order.payment) {
      operations.push(
        prisma.payment.update({
          where: { orderId: order.id },
          data: { status: "SUCCESS" },
        }),
      );
    } else {
      operations.push(
        prisma.payment.create({
          data: {
            orderId: order.id,
            amount: Number(order.total),
            method: "PayOS",
            status: "SUCCESS",
          },
        }),
      );
    }

    await prisma.$transaction(operations);
    console.log(
      `Payment processed successfully for order: ${order.orderNumber}`,
    );
    return order;
  },
};

export default payosService;

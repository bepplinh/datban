import { Worker } from "bullmq";
import { redisConnection } from "../config/redis.js";
import prisma from "../libs/prisma.js";
import { socketService } from "../services/socket.service.js";

const orderWorker = new Worker(
  "orderQueue",
  async (job) => {
    const order = job.data;
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

    // Notify both customer and staff about successful payment
    socketService.emitToRoom(`table-${order.tableId}`, "payment_success", {
      orderId: order.id,
      tableId: order.tableId,
      amount: order.total,
    });
    socketService.emitToRoom("staff-room", "payment_success", {
      orderId: order.id,
      tableId: order.tableId,
      amount: order.total,
    });
    socketService.emitTableStatusUpdate(order.tableId, "EMPTY");
  },
  {
    connection: redisConnection,
    concurrency: 5,
  },
);

orderWorker.on("completed", (job) => {
  console.log(`Job ${job.id} has completed!`);
});

orderWorker.on("failed", (job, err) => {
  console.log(`Job ${job.id} has failed with ${err.message}`);
});

export { orderWorker };

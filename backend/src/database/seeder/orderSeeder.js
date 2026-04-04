import prisma from "../../libs/prisma.js";

async function orderSeeder() {
  const tables = await prisma.table.findMany();
  const products = await prisma.product.findMany();

  if (tables.length === 0 || products.length === 0) {
    console.log(
      "No tables or products found. Please run tableSeeder and productSeeder first.",
    );
    return;
  }

  // Clear existing to avoid duplicates
  console.log("Cleaning up existing order data...");
  await prisma.payment.deleteMany();
  await prisma.orderitem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.tablesession.deleteMany();

  let orderCounter = 1000;
  // Start from June 1st of last year (2025)
  const startDate = new Date(2025, 5, 1); // June (0-indexed month 5)
  const endDate = new Date(); // Today

  console.log(
    `Seeding from ${startDate.toDateString()} to ${endDate.toDateString()}...`,
  );

  const statuses = [
    "PAID",
    "PAID",
    "PAID",
    "PAID",
    "PAID",
    "PAID",
    "PAID",
    "PAID",
    "CANCELLED",
    "SERVED",
    "READY",
  ];
  const paymentMethods = ["Tiền mặt", "Chuyển khoản", "Thẻ tín dụng"];

  // Helper to get random item from array
  const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

  // Iterate day by day
  let currentDay = new Date(startDate);
  let totalOrdersGenerated = 0;

  while (currentDay <= endDate) {
    // 3 to 12 orders per day
    const ordersPerDay = Math.floor(Math.random() * 10) + 3;

    for (let i = 0; i < ordersPerDay; i++) {
      const orderDate = new Date(currentDay);
      // Random hour between 10 AM and 10 PM
      orderDate.setHours(
        10 + Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 60),
      );

      const randomTable = randomItem(tables);
      const orderStatus = randomItem(statuses);

      // Random products for this order (1-5 items)
      const numItems = Math.floor(Math.random() * 5) + 1;
      const orderItemsCreateData = [];
      let totalAmount = 0;

      for (let j = 0; j < numItems; j++) {
        const randomProduct = randomItem(products);
        const quantity = Math.floor(Math.random() * 3) + 1;
        const unitPrice = randomProduct.price;
        const subtotal = quantity * unitPrice;
        totalAmount += subtotal;

        orderItemsCreateData.push({
          productId: randomProduct.id,
          quantity,
          unitPrice,
          status:
            orderStatus === "PAID" || orderStatus === "SERVED"
              ? "READY"
              : "PENDING",
          createdAt: orderDate,
          updatedAt: orderDate,
        });
      }

      // Create TableSession, Order, OrderItems, and Payment in a nested write
      await prisma.tablesession.create({
        data: {
          tableId: randomTable.id,
          status:
            orderStatus === "PENDING" ||
            orderStatus === "SERVED" ||
            orderStatus === "READY"
              ? "ACTIVE"
              : "CLOSED",
          createdAt: orderDate,
          expiresAt: new Date(orderDate.getTime() + 2 * 60 * 60 * 1000), // 2 hours later
          order: {
            create: {
              tableId: randomTable.id,
              status: orderStatus,
              total: totalAmount,
              orderNumber: orderCounter++,
              createdAt: orderDate,
              items: {
                create: orderItemsCreateData,
              },
              ...(orderStatus === "PAID" || orderStatus === "CANCELLED"
                ? {
                    payment: {
                      create: {
                        method: randomItem(paymentMethods),
                        status: orderStatus === "PAID" ? "SUCCESS" : "FAILED",
                        amount: totalAmount,
                        createdAt: new Date(
                          orderDate.getTime() + 15 * 60 * 1000,
                        ), // Paid 15 mins later
                      },
                    },
                  }
                : {}),
            },
          },
        },
      });
      totalOrdersGenerated++;
    }

    // Move to next day
    currentDay.setDate(currentDay.getDate() + 1);
  }

  console.log(
    `\nSuccessfully seeded ${totalOrdersGenerated} orders with items and table sessions.`,
  );
}

export default orderSeeder;

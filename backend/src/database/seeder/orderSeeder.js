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

  // Define some random dates for orders
  // Half of the orders will be today, the rest spread over 2 months
  const getRandomDate = (forToday = false) => {
    if (forToday) {
      // Random time today
      const now = new Date();
      const start = new Date(now);
      start.setHours(0, 0, 0, 0);
      return new Date(
        start.getTime() + Math.random() * (now.getTime() - start.getTime()),
      );
    }
    const start = new Date();
    start.setMonth(start.getMonth() - 2);
    const end = new Date();
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime()),
    );
  };

  const statuses = [
    "PAID",
    "PAID",
    "PAID",
    "PAID",
    "CANCELLED",
    "PENDING",
    "SERVED",
  ];

  // Clear existing to avoid duplicates if re-running
  await prisma.payment.deleteMany();
  await prisma.orderitem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.tablesession.deleteMany();

  let orderCounter = 1000;

  for (let i = 0; i < 20; i++) {
    const randomTable = tables[Math.floor(Math.random() * tables.length)];
    // First 8 orders will be today to ensure dashboard has data
    const forToday = i < 8;
    const orderDate = getRandomDate(forToday);
    const orderStatus = statuses[Math.floor(Math.random() * statuses.length)];

    // Create TableSession
    const sessionExpiresAt = new Date(orderDate.getTime() + 2 * 60 * 60 * 1000); // 2 hours later
    const tableSession = await prisma.tablesession.create({
      data: {
        tableId: randomTable.id,
        status:
          orderStatus === "PENDING" || orderStatus === "SERVED"
            ? "ACTIVE"
            : "CLOSED",
        createdAt: orderDate,
        expiresAt: sessionExpiresAt,
      },
    });

    // Create Order
    const newOrder = await prisma.order.create({
      data: {
        tableId: randomTable.id,
        tableSessionId: tableSession.id,
        status: orderStatus,
        total: 0, // We will calculate this
        orderNumber: orderCounter++,
        createdAt: orderDate,
      },
    });

    // Create Order Items
    let orderTotal = 0;
    const numItems = Math.floor(Math.random() * 5) + 1; // 1 to 5 items
    for (let j = 0; j < numItems; j++) {
      const randomProduct =
        products[Math.floor(Math.random() * products.length)];
      const quantity = Math.floor(Math.random() * 3) + 1; // 1 to 3 qty
      const unitPrice = randomProduct.price;

      const itemStatus =
        orderStatus === "PAID" || orderStatus === "SERVED"
          ? "READY"
          : "PENDING";

      await prisma.orderitem.create({
        data: {
          orderId: newOrder.id,
          productId: randomProduct.id,
          quantity: quantity,
          unitPrice: unitPrice,
          status: itemStatus,
          createdAt: orderDate,
          updatedAt: orderDate,
        },
      });

      orderTotal += quantity * unitPrice;
    }

    // Update real total
    await prisma.order.update({
      where: { id: newOrder.id },
      data: { total: orderTotal },
    });

    // Create Payment if PAID
    if (orderStatus === "PAID" || orderStatus === "CANCELLED") {
      const methods = ["Tiền mặt", "Chuyển khoản", "Thẻ tín dụng"];
      await prisma.payment.create({
        data: {
          orderId: newOrder.id,
          method: methods[Math.floor(Math.random() * methods.length)],
          status: orderStatus === "PAID" ? "SUCCESS" : "FAILED",
          amount: orderTotal,
          createdAt: new Date(orderDate.getTime() + 10 * 60 * 1000), // Paid 10 mins later
        },
      });
    }
  }

  console.log("Seeded 20 orders with items, table sessions, and payments.");
}

export default orderSeeder;

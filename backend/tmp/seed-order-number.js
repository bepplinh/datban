import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "asc" },
  });

  console.log(`Found ${orders.length} orders to update.`);

  for (let i = 0; i < orders.length; i++) {
    const order = orders[i];
    const orderNumber = i + 1;
    await prisma.order.update({
      where: { id: order.id },
      data: { orderNumber: orderNumber },
    });
    console.log(`Updated Order ${order.id} with orderNumber ${orderNumber}`);
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

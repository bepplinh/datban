import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const [
    orderCount,
    paidOrderCount,
    productCount,
    categoryCount,
    otherStatuses,
  ] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { status: "PAID" } }),
    prisma.product.count(),
    prisma.category.count(),
    prisma.order.groupBy({
      by: ["status"],
      _count: { status: true },
    }),
  ]);

  console.log(`Total orders: ${orderCount}`);
  console.log(`Paid orders: ${paidOrderCount}`);
  console.log(`Total products: ${productCount}`);
  console.log(`Total categories: ${categoryCount}`);
  const categoriesWithProducts = await prisma.category.findMany({
    include: {
      _count: {
        select: { product: true },
      },
    },
  });

  console.log("Categories and product counts:");
  categoriesWithProducts.forEach((c) => {
    console.log(`- ${c.name}: ${c._count.product} products`);
  });

  console.log("Status breakdown:");
  otherStatuses.forEach((s) => {
    console.log(`- ${s.status}: ${s._count.status}`);
  });

  if (orderCount === paidOrderCount) {
    console.log("Success: All orders are PAID.");
  } else {
    console.log("Failure: Some orders are not PAID.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

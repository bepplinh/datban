import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany({
    select: {
      name: true,
      isAvailable: true,
    },
  });

  console.log(`Total products: ${products.length}`);
  const availableCount = products.filter((p) => p.isAvailable).length;
  console.log(`Available products: ${availableCount}`);

  if (products.length > 0) {
    console.log("First 5 products availability:");
    products.slice(0, 5).forEach((p) => {
      console.log(`- ${p.name}: ${p.isAvailable}`);
    });
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

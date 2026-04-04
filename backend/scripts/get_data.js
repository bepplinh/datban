import prisma from "../src/libs/prisma.js";

async function main() {
  const session = await prisma.tableSession.findFirst({
    where: { status: "ACTIVE" },
  });
  const product = await prisma.product.findFirst();

  console.log(
    JSON.stringify({ sessionId: session?.id, productId: product?.id }),
  );
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

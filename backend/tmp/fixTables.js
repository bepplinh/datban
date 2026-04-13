import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const result = await prisma.table.updateMany({
    where: {
      status: "OCCUPIED",
      tablesession: {
        none: {
          status: "ACTIVE",
        },
      },
    },
    data: {
      status: "EMPTY",
    },
  });

  console.log(`Updated ${result.count} tables to EMPTY status.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

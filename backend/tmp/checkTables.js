import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const tables = await prisma.table.findMany({
    include: {
      tablesession: {
        where: { status: "ACTIVE" },
      },
    },
  });

  console.log("Table statuses:");
  tables.forEach((t) => {
    console.log(
      `- ${t.name}: status=${t.status}, activeSessions=${t.tablesession.length}`,
    );
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

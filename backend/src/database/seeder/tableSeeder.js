import prisma from "../../libs/prisma.js";

async function tableSeeder() {
  const tables = [];

  for (let i = 1; i <= 10; i++) {
    tables.push({
      name: `Table ${i}`,
    });
  }

  await prisma.table.createMany({
    data: tables,
    skipDuplicates: true,
  });

  console.log("Seeded tables");
}

export default tableSeeder;

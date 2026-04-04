import prisma from "../../libs/prisma.js";
import crypto from "crypto";

async function tableSeeder() {
  const tables = [];

  for (let i = 1; i <= 10; i++) {
    tables.push({
      name: `Table ${i}`,
      token: `table_${i}_token_${crypto.randomUUID()}`,
    });
  }

  await prisma.table.createMany({
    data: tables,
    skipDuplicates: true,
  });

  console.log("Seeded tables");
}

export default tableSeeder;

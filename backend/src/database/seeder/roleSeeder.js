import prisma from "../../libs/prisma.js";

async function roleSeeder() {
  await prisma.role.createMany({
    data: [{ role: "ADMIN" }, { role: "STAFF" }],
    skipDuplicates: true,
  });

  console.log("Seeded roles");
}

export default roleSeeder;

import prisma from "../src/libs/prisma.js";
import runSeeders from "../src/database/seeder/index.js";

async function main() {
  console.log("Start seeding...");

  await runSeeders();

  console.log("Seeding finished");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

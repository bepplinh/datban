import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Tạo Role
  const adminRole = await prisma.role.upsert({
    where: { role: "ADMIN" },
    update: {},
    create: { role: "ADMIN" },
  });

  const staffRole = await prisma.role.upsert({
    where: { role: "STAFF" },
    update: {},
    create: { role: "STAFF" },
  });

  // Tạo 5 User Staff
  const staffRoleData = await prisma.role.findUnique({
    where: { role: "STAFF" },
  });
  const staffHash = await bcrypt.hash("Abc@12345", 10);

  console.log("Creating 5 staff users...");
  for (let i = 0; i < 5; i++) {
    const randomNum = Math.floor(100 + Math.random() * 900); // 3 chữ số
    const username = `staff${randomNum}`;

    await prisma.user.upsert({
      where: { username },
      update: { password: staffHash, roleId: staffRoleData.id },
      create: {
        name: `Nhân viên ${randomNum}`,
        username,
        password: staffHash,
        roleId: staffRoleData.id,
      },
    });
    console.log(`- Created: ${username} | Password: Abc@12345`);
  }

  console.log("\nSeeding done!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import prisma from "../../libs/prisma.js";
import bcrypt from "bcrypt";

async function userSeeder() {
  const adminRole = await prisma.role.findUnique({
    where: { role: "ADMIN" },
  });

  const staffRole = await prisma.role.findUnique({
    where: { role: "STAFF" },
  });

  const password = await bcrypt.hash("123456", 10);

  await prisma.user.createMany({
    data: [
      {
        name: "Admin",
        email: "admin@gmail.com",
        password,
        roleId: adminRole.id,
      },
      {
        name: "Staff",
        email: "staff@gmail.com",
        password,
        roleId: staffRole.id,
      },
    ],
    skipDuplicates: true,
  });

  console.log("Seeded users");
}

export default userSeeder;

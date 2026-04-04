import prisma from "../../libs/prisma.js";
import bcrypt from "bcrypt";

async function userSeeder() {
  const adminRole = await prisma.role.findUnique({
    where: { role: "ADMIN" },
  });

  const staffRole = await prisma.role.findUnique({
    where: { role: "STAFF" },
  });

  const kitchenRole = await prisma.role.findUnique({
    where: { role: "KITCHEN" },
  });

  const password = await bcrypt.hash("Admin@123", 10);

  const users = [
    {
      name: "Admin",
      username: "admin",
      password,
      roleId: adminRole.id,
    },
    {
      name: "Staff",
      username: "staff",
      password,
      roleId: staffRole.id,
    },
    {
      name: "Kitchen",
      username: "kitchen",
      password,
      roleId: kitchenRole.id,
    },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { username: user.username },
      update: {
        password: user.password,
        roleId: user.roleId,
        name: user.name,
      },
      create: user,
    });
  }

  console.log("Seeded users");
}

export default userSeeder;

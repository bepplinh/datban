import prisma from "../../libs/prisma.js";

async function categorySeeder() {
  const food = await prisma.category.create({
    data: {
      name: "Food",
    },
  });

  const drink = await prisma.category.create({
    data: {
      name: "Drink",
    },
  });

  await prisma.category.createMany({
    data: [
      { name: "Pizza", parentId: food.id },
      { name: "Burger", parentId: food.id },
      { name: "Coffee", parentId: drink.id },
      { name: "Tea", parentId: drink.id },
    ],
  });

  console.log("Seeded categories");
}

export default categorySeeder;

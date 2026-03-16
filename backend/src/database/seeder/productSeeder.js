import prisma from "../../libs/prisma.js";

async function productSeeder() {
  const pizzaCategory = await prisma.category.findFirst({
    where: { name: "Pizza" },
  });

  const coffeeCategory = await prisma.category.findFirst({
    where: { name: "Coffee" },
  });

  await prisma.product.createMany({
    data: [
      {
        name: "Pepperoni Pizza",
        price: 12,
        categoryId: pizzaCategory.id,
      },
      {
        name: "Cheese Pizza",
        price: 10,
        categoryId: pizzaCategory.id,
      },
      {
        name: "Black Coffee",
        price: 3,
        categoryId: coffeeCategory.id,
      },
      {
        name: "Milk Coffee",
        price: 4,
        categoryId: coffeeCategory.id,
      },
    ],
  });

  console.log("Seeded products");
}

export default productSeeder;

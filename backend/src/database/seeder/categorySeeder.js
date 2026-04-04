import prisma from "../../libs/prisma.js";

async function categorySeeder() {
  const categoryData = [
    // --- Priority 1: Main Food Groups ---
    { name: "Món Ăn", sortOrder: 10 },
    { name: "Món Khai Vị", sortOrder: 11 },
    { name: "Món Chính", sortOrder: 12 },
    { name: "Món Tráng Miệng", sortOrder: 13 },
    { name: "Điểm Tâm", sortOrder: 14 },
    { name: "Đồ Chay", sortOrder: 15 },

    // --- Priority 2: Specialties & Featured ---
    { name: "Đặc Sản", sortOrder: 20 },
    { name: "Đặc Sản 3 Miền", sortOrder: 21 },
    { name: "Hải Sản", sortOrder: 22 },
    { name: "Đồ Nướng", sortOrder: 23 },

    // --- Priority 3: Drinks ---
    { name: "Đồ Uống", sortOrder: 30 },
    { name: "Cà phê", sortOrder: 31 },
    { name: "Trà", sortOrder: 32 },
    { name: "Sinh Tố & Nước Ép", sortOrder: 33 },
    { name: "Đồ Có Cồn", sortOrder: 34 },
    { name: "Đồ Uống Khác", sortOrder: 35 },

    // --- Priority 4: Combos & Deals ---
    { name: "Combo & Khuyến Mãi", sortOrder: 40 },
    { name: "Cơm Trưa Văn Phòng", sortOrder: 41 },
    { name: "Combo Cho Nhóm", sortOrder: 42 },
  ];

  for (const data of categoryData) {
    const existing = await prisma.category.findFirst({
      where: { name: data.name },
    });

    if (existing) {
      await prisma.category.update({
        where: { id: existing.id },
        data: { sortOrder: data.sortOrder },
      });
    } else {
      await prisma.category.create({ data });
    }
  }

  console.log("Seeded categories with priority");
}

export default categorySeeder;

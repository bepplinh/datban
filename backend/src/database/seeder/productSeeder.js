import prisma from "../../libs/prisma.js";
import cloudinary from "../../config/cloudinary.js";

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
};

async function productSeeder() {
  // Fetch required categories for linkage
  const categories = await prisma.category.findMany();

  // Helper to find category by name
  const getCatId = (name) => {
    const cat = categories.find((c) => c.name === name);
    if (!cat)
      throw new Error(
        `Category ${name} not found. Did you run categorySeeder first?`,
      );
    return cat.id;
  };

  const productData = [
    // --- Món Khai Vị ---
    {
      name: "Súp Cua Măng Tây",
      price: 45000,
      categoryId: getCatId("Món Khai Vị"),
      description:
        "Súp cua nóng hổi, thịt cua tươi ngọt cùng măng tây sần sật.",
    },
    {
      name: "Gỏi Cuốn Tôm Thịt",
      price: 35000,
      categoryId: getCatId("Món Khai Vị"),
      description: "Gỏi cuốn thanh mát kèm tương đen mặn ngọt.",
    },
    {
      name: "Chả Giò Hải Sản",
      price: 55000,
      categoryId: getCatId("Món Khai Vị"),
      description: "Chả giò chiên giòn rụm nhân hải sản đậm đà.",
    },
    {
      name: "Salad Cá Hồi",
      price: 85000,
      categoryId: getCatId("Món Khai Vị"),
      description: "Rau xanh tươi mát kết hợp cá hồi Nauy thượng hạng.",
    },

    // --- Món Chính ---
    {
      name: "Bò Lúc Lắc Khoai Tây Phô Mai",
      price: 125000,
      categoryId: getCatId("Món Chính"),
      description: "Thịt bò mềm mọng, khoai tây chiên phủ phô mai béo ngậy.",
    },
    {
      name: "Cơm Chiên Dương Châu",
      price: 65000,
      categoryId: getCatId("Món Chính"),
      description: "Cơm chiên hạt tơi, xá xíu, tôm sú và rau củ.",
    },
    {
      name: "Mì Ý Sốt Bò Băm",
      price: 85000,
      categoryId: getCatId("Món Chính"),
      description: "Mì Ý sợi dai dai, sốt cà chua thịt bò băm đậm đà.",
    },
    {
      name: "Sườn Nướng BBQ",
      price: 155000,
      categoryId: getCatId("Món Chính"),
      description: "Sườn heo nướng nguyên tảng sốt BBQ kiểu Mỹ.",
    },
    {
      name: "Gà Nướng Mật Ong Nguyên Con",
      price: 210000,
      categoryId: getCatId("Món Chính"),
      description: "Gà ta thả vườn nướng mật ong óng ả.",
    },

    // --- Món Tráng Miệng ---
    {
      name: "Bánh Flan Caramel",
      price: 25000,
      categoryId: getCatId("Món Tráng Miệng"),
      description: "Bánh flan mềm mịn, đắng nhẹ vị caramel.",
    },
    {
      name: "Chè Khúc Bạch",
      price: 35000,
      categoryId: getCatId("Món Tráng Miệng"),
      description: "Chè thanh mát, nhãn lồng cùi dày và hạnh nhân lát.",
    },
    {
      name: "Kem Gelato Vani",
      price: 40000,
      categoryId: getCatId("Món Tráng Miệng"),
      description: "Kem Ý dẻo thơm nguyên bản.",
    },
    {
      name: "Trái Cây Theo Mùa Dĩa Nhỏ",
      price: 50000,
      categoryId: getCatId("Món Tráng Miệng"),
      description: "Dưa hấu, mít, thanh long và trái cây tươi theo mùa.",
    },

    // --- Đồ Chay ---
    {
      name: "Đậu Hũ Tứ Xuyên Chay",
      price: 55000,
      categoryId: getCatId("Đồ Chay"),
      description: "Đậu hũ non sốt cay nồng vị Tứ Xuyên.",
    },
    {
      name: "Canh Nấm Thập Cẩm",
      price: 60000,
      categoryId: getCatId("Đồ Chay"),
      description: "Canh nêm nếm thanh đạm từ 5 loại nấm quý.",
    },
    {
      name: "Cơm Chiên Lá É",
      price: 45000,
      categoryId: getCatId("Đồ Chay"),
      description: "Cơm chiên thơm dậy mùi lá é.",
    },
    {
      name: "Gỏi Ngó Sen Chay",
      price: 50000,
      categoryId: getCatId("Đồ Chay"),
      description: "Ngó sen giòn sần sật chua ngọt vừa phải.",
    },

    // --- Điểm Tâm ---
    {
      name: "Bánh Bao Xá Xíu",
      price: 25000,
      categoryId: getCatId("Điểm Tâm"),
      description: "Bánh bao nóng nhân xá xíu mềm ngọt.",
    },
    {
      name: "Há Cảo Tôm Tươi",
      price: 45000,
      categoryId: getCatId("Điểm Tâm"),
      description: "Vỏ mỏng trong suốt, nhân tôm sú tươi rói.",
    },
    {
      name: "Xíu Mại Trứng Muối",
      price: 45000,
      categoryId: getCatId("Điểm Tâm"),
      description: "Xíu mại nhân thịt băm bọc trứng muối.",
    },
    {
      name: "Bánh Cuốn Nóng",
      price: 35000,
      categoryId: getCatId("Điểm Tâm"),
      description: "Bánh cuốn tráng tay ruốc tôm thịt.",
    },

    // --- Cà phê ---
    {
      name: "Cà Phê Đen Đá",
      price: 20000,
      categoryId: getCatId("Cà phê"),
      description: "Cà phê robusta nguyên chất, đậm vị truyền thống.",
    },
    {
      name: "Cà Phê Sữa Đá",
      price: 25000,
      categoryId: getCatId("Cà phê"),
      description: "Cà phê pha phin truyền thống với sữa đặc ngọt ngào.",
    },
    {
      name: "Bạc Xỉu",
      price: 29000,
      categoryId: getCatId("Cà phê"),
      description: "Sữa đá pha chút cafe cho người chuộng ngọt.",
    },
    {
      name: "Cà Phê Muối",
      price: 32000,
      categoryId: getCatId("Cà phê"),
      description: "Cà phê đậm đà kết hợp lớp kem muối béo ngậy.",
    },
    {
      name: "Espresso",
      price: 35000,
      categoryId: getCatId("Cà phê"),
      description: "Cà phê rang mộc chiết xuất máy nguyên chất.",
    },

    // --- Trà ---
    {
      name: "Trà Đào Cam Sả",
      price: 40000,
      categoryId: getCatId("Trà"),
      description: "Thanh mát vị đào, chua nhẹ cam sành và thơm mùi sả.",
    },
    {
      name: "Trà Sen Vàng",
      price: 45000,
      categoryId: getCatId("Trà"),
      description: "Trà nhài thơm lừng, hạt sen dẻo ngọt và kem cheese.",
    },
    {
      name: "Trà Vải Nhiệt Đới",
      price: 40000,
      categoryId: getCatId("Trà"),
      description: "Trà ô long kết hợp vải ngâm và trái cây nhiệt đới.",
    },
    {
      name: "Trà Sâm Dứa",
      price: 15000,
      categoryId: getCatId("Trà"),
      description: "Trà đá sâm dứa tuổi thơ mát lạnh giải khát.",
    },

    // --- Sinh Tố & Nước Ép ---
    {
      name: "Nước Ép Dưa Hấu",
      price: 35000,
      categoryId: getCatId("Sinh Tố & Nước Ép"),
      description: "Ép 100% dưa hấu tươi mát lạnh.",
    },
    {
      name: "Nước Ép Cam Tươi",
      price: 40000,
      categoryId: getCatId("Sinh Tố & Nước Ép"),
      description: "Cam vắt nguyên chất bổ sung vitamin C.",
    },
    {
      name: "Sinh Tố Bơ Ngũ Cốc",
      price: 45000,
      categoryId: getCatId("Sinh Tố & Nước Ép"),
      description: "Bơ sáp Đà Lạt béo ngậy xay cùng ngũ cốc giòn rụm.",
    },
    {
      name: "Sinh Tố Dâu Hỗn Hợp",
      price: 45000,
      categoryId: getCatId("Sinh Tố & Nước Ép"),
      description: "Sinh tố chua ngọt dịu từ dâu tây tươi dầm.",
    },

    // --- Đồ Có Cồn ---
    {
      name: "Bia Tiger Bạc Chaik",
      price: 25000,
      categoryId: getCatId("Đồ Có Cồn"),
      description: "Bia chai ướp lạnh mượt mà.",
    },
    {
      name: "Bia Heineken Hộp",
      price: 30000,
      categoryId: getCatId("Đồ Có Cồn"),
      description: "Dòng bia chất lượng đẳng cấp.",
    },
    {
      name: "Rượu Soju Vị Nho",
      price: 65000,
      categoryId: getCatId("Đồ Có Cồn"),
      description: "Rượu Soju nhẹ nhàng, ngọt ngào dễ uống.",
    },
    {
      name: "Cocktail Margarita",
      price: 95000,
      categoryId: getCatId("Đồ Có Cồn"),
      description: "Tequila sảng khoái với chanh tươi và muối viền ly.",
    },

    // --- Đặc Sản 3 Miền ---
    {
      name: "Phở Bò Hà Nội",
      price: 55000,
      categoryId: getCatId("Đặc Sản 3 Miền"),
      description: "Nước dùng xương hầm 12 tiếng, bánh phở dai ngon.",
    },
    {
      name: "Mì Quảng Tôm Thịt",
      price: 50000,
      categoryId: getCatId("Đặc Sản 3 Miền"),
      description: "Mì dai đậm vị nước lèo tôm thịt miền Trung.",
    },
    {
      name: "Bún Bò Huế",
      price: 55000,
      categoryId: getCatId("Đặc Sản 3 Miền"),
      description: "Vị cay nồng, đậm đà của ruốc và sả đặc trưng xứ Huế.",
    },
    {
      name: "Bún Đậu Mắm Tôm Mẹt",
      price: 65000,
      categoryId: getCatId("Đặc Sản 3 Miền"),
      description: "Thịt luộc, chả cốm, nem chua rán dọn kèm đậu rán giòn.",
    },

    // --- Hải Sản ---
    {
      name: "Mực Cháy Tỏi",
      price: 160000,
      categoryId: getCatId("Hải Sản"),
      description: "Mực ống tươi dai giòn cháy tỏi ớt thơm lừng.",
    },
    {
      name: "Tôm Sú Hấp Bia",
      price: 180000,
      categoryId: getCatId("Hải Sản"),
      description: "Tôm sú loại 1 hấp cùng bia tươi giữ trọn độ ngọt.",
    },
    {
      name: "Cua Gạch Rang Me",
      price: 450000,
      categoryId: getCatId("Hải Sản"),
      description: "Cua Năm Căn đầy gạch sốt me chua ngọt đậm đà.",
    },
    {
      name: "Ốc Hương Sốt Trứng Muối",
      price: 145000,
      categoryId: getCatId("Hải Sản"),
      description: "Ốc hương to giòn quyện trứng muối béo ngậy.",
    },

    // --- Đồ Nướng ---
    {
      name: "Bò Tảng Nướng Phô Mai",
      price: 175000,
      categoryId: getCatId("Đồ Nướng"),
      description: "Bò nguyên tảng nướng trên than hồng, chấm ngập phô mai đỏ.",
    },
    {
      name: "Ba Chỉ Thịt Heo Nướng Hàn Quốc",
      price: 120000,
      categoryId: getCatId("Đồ Nướng"),
      description: "Thịt heo ba rọi cắt lát chuẩn vị ăn kèm panchan.",
    },
    {
      name: "Nầm Bò Nướng Mọi",
      price: 140000,
      categoryId: getCatId("Đồ Nướng"),
      description: "Nầm bò giòn sần sật ướp gia vị nướng than hoa.",
    },

    // --- Combo & Khuyến Mãi ---
    {
      name: "Combo Trưa: Cơm Sườn + Mứt Đá",
      price: 69000,
      categoryId: getCatId("Cơm Trưa Văn Phòng"),
      description: "Nạp năng lượng bữa trưa siêu tốc và tiết kiệm.",
    },
    {
      name: "Combo Gia Đình: 1 Lẩu + 2 Nướng",
      price: 399000,
      categoryId: getCatId("Combo Cho Nhóm"),
      description: "Phù hợp gia đình 3-4 người ăn thả ga ngày cuối tuần.",
    },
    {
      name: "Bữa Cơm Quê Mẹ",
      price: 299000,
      categoryId: getCatId("Combo Cho Nhóm"),
      description:
        "Canh chua, Thịt kho tiêu, Gà xé phay, Rau luộc kho quẹt dư dả cho nhóm bạn.",
    },
  ];

  console.log("Fetching Cloudinary images for mapping...");
  const cloudinaryResources = await cloudinary.api.resources({
    type: "upload",
    prefix: "products/",
    max_results: 500,
  });

  const imageMap = {};
  cloudinaryResources.resources.forEach((res) => {
    // Extract public_id without folder prefix
    const nameOnly = res.public_id.replace("products/", "");
    imageMap[nameOnly] = res.public_id;
  });

  // Assign images to productData if match found
  productData.forEach((product) => {
    const slug = slugify(product.name);
    if (imageMap[slug]) {
      product.image = imageMap[slug];
      console.log(`- Mapped image for: ${product.name} -> ${imageMap[slug]}`);
    } else {
      // Manual mappings for demonstration
      if (product.name === "Súp Cua Măng Tây") {
        product.image = "products/ylpaksiqbyukzan23nmf";
        console.log(`- Manually mapped: ${product.name} -> ${product.image}`);
      } else if (product.name === "Salad Cá Hồi") {
        product.image = "samples/food/fish-vegetables";
        console.log(`- Manually mapped: ${product.name} -> ${product.image}`);
      } else if (product.name === "Bánh Flan Caramel") {
        product.image = "samples/food/dessert-bowl";
        console.log(`- Manually mapped: ${product.name} -> ${product.image}`);
      }
    }
  });

  for (const data of productData) {
    const existing = await prisma.product.findFirst({
      where: {
        name: data.name,
        categoryId: data.categoryId,
      },
    });

    if (existing) {
      await prisma.product.update({
        where: { id: existing.id },
        data,
      });
    } else {
      await prisma.product.create({ data });
    }
  }

  console.log(`Seeded ${productData.length} products`);
}

export default productSeeder;

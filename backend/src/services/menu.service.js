import categoryRepo from "../repositories/category.repository.js";

export const menuService = {
  getMenu: async () => {
    const categories = await categoryRepo.findAll();
    return categories.map(({ product, ...cat }) => ({
      ...cat,
      products: product || [],
    }));
  },
};

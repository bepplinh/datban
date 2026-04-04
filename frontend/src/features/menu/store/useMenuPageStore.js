import { create } from "zustand";
import { fetchMenuPageData } from "../pages/Test/menuPageService";

const useMenuPageStore = create((set, get) => ({
  categories: [],
  products: [],
  error: null,
  loading: false,
  search: "",
  selectedCategoryId: "all",

  setSearch: (value) => set({ search: value }),
  setSelectedCategoryId: (value) => set({ selectedCategoryId: value }),

  fetchMenu: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetchMenuPageData();
      console.log(res);

      const allProducts = res.data.data.flatMap((category) =>
        (category.products || []).map((p) => ({
          ...p,
          categoryId: category.id,
        })),
      );
      set({ categories: res.data.data, products: allProducts, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));

export default useMenuPageStore;

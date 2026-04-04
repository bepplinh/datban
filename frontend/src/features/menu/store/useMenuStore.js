import { create } from "zustand";

export const useMenuStore = create((set) => ({
  searchTerm: "",
  selectedCategoryId: "all",
  sortOrder: "default",
  priceLimit: 0,

  setSearchTerm: (val) => set({ searchTerm: val }),
  setSelectedCategoryId: (val) => set({ selectedCategoryId: val }),
  setSortOrder: (val) => set({ sortOrder: val }),
  setPriceLimit: (val) => set({ priceLimit: val }),

  reset: () =>
    set({
      searchTerm: "",
      selectedCategoryId: "all",
      sortOrder: "default",
      priceLimit: 0,
    }),
}));

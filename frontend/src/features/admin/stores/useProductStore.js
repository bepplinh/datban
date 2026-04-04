import { create } from "zustand";

const useProductStore = create((set, get) => ({
  isModalVisible: false,
  editingProduct: null,
  selectedCategory: "all",
  search: "",
  priceRange: "all",

  showModal: (product) =>
    set({ isModalVisible: true, editingProduct: product }),
  hideModal: () => set({ isModalVisible: false, editingProduct: null }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSearch: (search) => set({ search: search }),
  setPriceRange: (range) => set({ priceRange: range }),
}));

export default useProductStore;

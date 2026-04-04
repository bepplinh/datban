import { create } from "zustand";

const useAdminOrderStore = create((set, get) => ({
  filters: {
    status: "",
    page: 1,
    limit: 10,
    search: "",
    from: "",
    to: "",
  },
  selectedOrderId: null,
  isDetailsVisible: false,

  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters, page: newFilters.page || 1 },
    })),
  resetFilters: () =>
    set({
      filters: { status: "", page: 1, limit: 10, search: "", from: "", to: "" },
    }),
  setSelectedOrderId: (id) => set({ selectedOrderId: id }),
  setIsDetailsVisible: (visible) => set({ isDetailsVisible: visible }),
}));

export default useAdminOrderStore;

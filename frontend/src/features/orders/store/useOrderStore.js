import { create } from "zustand";

export const useOrderStore = create((set) => ({
  activeOrder: null,
  loading: false,
  error: null,

  setActiveOrder: (order) => set({ activeOrder: order, error: null }),

  clearActiveOrder: () => set({ activeOrder: null, error: null }),

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));

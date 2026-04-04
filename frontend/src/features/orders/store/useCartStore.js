import { create } from "zustand";

const calculateTotalCount = (items) =>
  items.reduce((sum, item) => sum + item.quantity, 0);

const calculateTotalAmount = (items) =>
  items.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);

export const useCartStore = create((set, get) => ({
  items: [],
  totalCount: 0,
  totalAmount: 0,
  showModal: false,
  setShowModal: (val) => set({ showModal: val }),

  addToCart: (product) => {
    set((state) => {
      const existingItem = state.items.find((item) => item.id === product.id);
      const newItems = existingItem
        ? state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        : [...state.items, { ...product, quantity: 1, note: "" }];

      return {
        items: newItems,
        totalCount: calculateTotalCount(newItems),
        totalAmount: calculateTotalAmount(newItems),
      };
    });
  },

  updateQuantity: (productId, quantity) => {
    set((state) => {
      const newItems = state.items
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: Math.max(0, item.quantity + quantity) }
            : item,
        )
        .filter((item) => item.quantity > 0);

      return {
        items: newItems,
        totalCount: calculateTotalCount(newItems),
        totalAmount: calculateTotalAmount(newItems),
      };
    });
  },

  setItemQuantity: (productId, newQuantity) => {
    set((state) => {
      const newItems = state.items
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: Math.max(0, newQuantity) }
            : item,
        )
        .filter((item) => item.quantity > 0);

      return {
        items: newItems,
        totalCount: calculateTotalCount(newItems),
        totalAmount: calculateTotalAmount(newItems),
      };
    });
  },

  setItemNote: (productId, note) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.id === productId ? { ...item, note } : item,
      ),
    }));
  },

  removeFromCart: (productId) => {
    set((state) => {
      const newItems = state.items.filter((item) => item.id !== productId);
      return {
        items: newItems,
        totalCount: calculateTotalCount(newItems),
        totalAmount: calculateTotalAmount(newItems),
      };
    });
  },

  clearCart: () => set({ items: [], totalCount: 0, totalAmount: 0 }),
}));

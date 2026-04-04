import { create } from "zustand";

export const useStaffCartStore = create((set, get) => ({
  // Store drafts keyed by tableId: { [tableId]: { items: [] } }
  drafts: {},

  getDraftSettings: (tableId) => {
    const draft = get().drafts[tableId] || { items: [] };
    const totalCount = draft.items.reduce(
      (sum, item) => sum + item.quantity,
      0,
    );
    const totalAmount = draft.items.reduce(
      (sum, item) => sum + (item.price || 0) * item.quantity,
      0,
    );
    return { items: draft.items, totalCount, totalAmount };
  },

  addToCart: (tableId, product) => {
    set((state) => {
      const draft = state.drafts[tableId] || { items: [] };
      const existingItem = draft.items.find((item) => item.id === product.id);

      const newItems = existingItem
        ? draft.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        : [...draft.items, { ...product, quantity: 1, note: "" }];

      return {
        drafts: {
          ...state.drafts,
          [tableId]: { items: newItems },
        },
      };
    });
  },

  updateQuantity: (tableId, productId, quantityChange) => {
    set((state) => {
      const draft = state.drafts[tableId] || { items: [] };
      const newItems = draft.items
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: Math.max(0, item.quantity + quantityChange) }
            : item,
        )
        .filter((item) => item.quantity > 0);

      return {
        drafts: {
          ...state.drafts,
          [tableId]: { items: newItems },
        },
      };
    });
  },

  removeFromCart: (tableId, productId) => {
    set((state) => {
      const draft = state.drafts[tableId] || { items: [] };
      const newItems = draft.items.filter((item) => item.id !== productId);

      return {
        drafts: {
          ...state.drafts,
          [tableId]: { items: newItems },
        },
      };
    });
  },

  clearCart: (tableId) => {
    set((state) => {
      const newDrafts = { ...state.drafts };
      delete newDrafts[tableId];
      return { drafts: newDrafts };
    });
  },
}));

export const useStaffDraft = (tableId) => {
  const drafts = useStaffCartStore((state) => state.drafts);
  const draft = drafts[tableId] || { items: [] };

  const totalCount = draft.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = draft.items.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity,
    0,
  );

  return { items: draft.items, totalCount, totalAmount };
};

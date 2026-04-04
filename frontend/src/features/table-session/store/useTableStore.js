import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTableStore = create(
  persist(
    (set) => ({
      tableId: null,
      tableName: null,
      orderId: null,

      setOrderId: (orderId) => set({ orderId }),
      setTableInfo: (tableId, tableName) => set({ tableId, tableName }),
      clearTableInfo: () => set({ tableId: null, tableName: null }),
    }),
    {
      name: "table-storage",
    },
  ),
);

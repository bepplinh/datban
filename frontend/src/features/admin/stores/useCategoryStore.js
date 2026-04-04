import { create } from "zustand";

const useCategoryStore = create((set) => ({
  // Data
  categories: [
    {
      id: "1",
      name: "Món Khai Vị",
      description: "Các món ăn nhẹ trước bữa chính",
      status: "active",
      itemCount: 15,
      createdAt: "2024-03-20 10:00",
    },
    {
      id: "2",
      name: "Món Chính - Lẩu",
      description: "Các loại lẩu đặc biệt của nhà hàng",
      status: "active",
      itemCount: 8,
      createdAt: "2024-03-21 14:30",
    },
    {
      id: "3",
      name: "Tráng Miệng",
      description: "Chè, trái cây, kem",
      status: "inactive",
      itemCount: 12,
      createdAt: "2024-03-22 09:15",
    },
    {
      id: "4",
      name: "Đồ Uống",
      description: "Nước ngọt, bia, rượu",
      status: "active",
      itemCount: 25,
      createdAt: "2024-03-23 16:45",
    },
  ],

  // UI States
  isModalVisible: false,
  editingCategory: null,
  searchText: "",

  // Actions
  setCategories: (categories) => set({ categories }),

  setSearchText: (text) => set({ searchText: text }),

  showModal: (category = null) =>
    set({
      isModalVisible: true,
      editingCategory: category,
    }),

  hideModal: () =>
    set({
      isModalVisible: false,
      editingCategory: null,
    }),

  addCategory: (values) =>
    set((state) => ({
      categories: [
        {
          id: Math.random().toString(36).substr(2, 9),
          ...values,
          itemCount: 0,
          createdAt: new Date().toISOString().slice(0, 16).replace("T", " "),
        },
        ...state.categories,
      ],
    })),

  updateCategory: (id, values) =>
    set((state) => ({
      categories: state.categories.map((cat) =>
        cat.id === id ? { ...cat, ...values } : cat,
      ),
    })),

  deleteCategory: (id) =>
    set((state) => ({
      categories: state.categories.filter((cat) => cat.id !== id),
    })),
}));

export default useCategoryStore;

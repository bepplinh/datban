import api from "../../../shared/services/api.js";

const categoryService = {
  getAllCategories: async () => {
    const res = await api.get("/admin/categories");
    return res.data;
  },

  addCategory: async (category) => {
    const res = await api.post("/admin/categories", category);
    return res.data;
  },

  updateCategory: async (id, category) => {
    const res = await api.put(`/admin/categories/${id}`, category);
    return res.data;
  },

  deleteCategory: async (id) => {
    const res = await api.delete(`/admin/categories/${id}`);
    return res.data;
  },
};

export default categoryService;

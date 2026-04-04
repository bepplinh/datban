import api from "../../../shared/services/api";

const productService = {
  getAllProducts: async () => {
    const response = await api.get("/admin/products");
    console.log(response);
    return response.data;
  },

  getProductById: async (id) => {
    const response = await api.get(`/admin/products/${id}`);
    return response.data;
  },

  addProduct: async (formData) => {
    const response = await api.post("/admin/products", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  updateProduct: async ({ id, formData }) => {
    const response = await api.put(`/admin/products/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  deleteProduct: async (id) => {
    return await api.delete(`/admin/products/${id}`);
  },
};

export default productService;

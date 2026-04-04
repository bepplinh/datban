import api from "../../../shared/services/api";

const adminTableService = {
  getAllTables: async () => {
    const res = await api.get("/admin/tables");
    return res.data;
  },
  createTable: async (data) => {
    const res = await api.post("/admin/tables", data);
    return res.data;
  },
  updateTable: async (id, data) => {
    const res = await api.put(`/admin/tables/${id}`, data);
    return res.data;
  },
  deleteTable: async (id) => {
    const res = await api.delete(`/admin/tables/${id}`);
    return res.data;
  },
};

export { adminTableService };

import api from "@/shared/services/api";

export const tableSessionService = {
  /**
   * Khởi tạo hoặc lấy session bàn hiện tại.
   * Backend sẽ tự động set cookie 'tableSessionId'.
   * @param {string} tableId
   */
  createTableSession: async (tableId, token) => {
    try {
      const response = await api.post("/table-session", { tableId, token });
      return response.data;
    } catch (error) {
      console.error("Error creating table session:", error);
      throw error;
    }
  },
};

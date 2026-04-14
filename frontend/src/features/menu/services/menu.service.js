import api from "@/shared/services/api";

export const menuService = {
  getMenu: async () => {
    try {
      const response = await api.get("/menu");
      return response;
    } catch (error) {
      console.error("Error fetching menu:", error);
      throw error;
    }
  },
};

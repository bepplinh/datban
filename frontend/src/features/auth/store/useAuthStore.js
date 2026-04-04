import { create } from "zustand";
import api from "@/shared/services/api";

const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,

  login: async (username, password) => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.post("/auth/login", { username, password });
      const { user, accessToken } = res.data;

      localStorage.setItem("staff_has_session", "true");
      set({ user, accessToken, isAuthenticated: true, isLoading: false });
      return true;
    } catch (err) {
      set({
        isLoading: false,
        error:
          err.response?.data?.error ||
          err.response?.data?.message ||
          "Tài khoản hoặc mật khẩu không chính xác",
      });
      return false;
    }
  },

  checkAuth: async () => {
    // Nếu không có hint đã login, set loading false luôn để tránh chờ đợi refresh call vô ích
    if (localStorage.getItem("staff_has_session") !== "true") {
      set({ isLoading: false });
      return;
    }

    set({ isLoading: true });
    try {
      const res = await api.get("/auth/refresh");
      const { user, accessToken } = res.data;

      localStorage.setItem("staff_has_session", "true");
      set({ user, accessToken, isAuthenticated: true, isLoading: false });
    } catch (err) {
      localStorage.removeItem("staff_has_session");
      set({
        user: null,
        accessToken: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },

  logout: async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      localStorage.removeItem("staff_has_session");
      set({ user: null, accessToken: null, isAuthenticated: false });
    }
  },
}));

export default useAuthStore;

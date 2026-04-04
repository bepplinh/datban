import { create } from "zustand";
import { notificationService } from "../services/notification.service";

const useNotificationStore = create((set, get) => ({
  notifications: [],
  unreadCount: 0,
  isFetching: false,

  addNotification: (request) => {
    set((state) => {
      const isExist = state.notifications.some((n) => n.id === request.id);
      if (isExist) return state;

      return {
        notifications: [request, ...state.notifications],
        unreadCount: state.unreadCount + 1,
      };
    });
  },

  removeNotification: (id) => {
    set((state) => {
      const filtered = state.notifications.filter((n) => n.id !== id);
      const countDiff = state.notifications.length - filtered.length;

      return {
        notifications: filtered,
        unreadCount: Math.max(0, state.unreadCount - countDiff),
      };
    });
  },

  fetchPendingRequests: async () => {
    set({ isFetching: true });
    try {
      const payload = await notificationService.getPendingRequests();

      const requests = payload.data || [];
      set({
        notifications: requests,
        unreadCount: requests.length,
        isFetching: false,
      });
    } catch (error) {
      console.error("Lỗi lấy danh sách thông báo:", error);
      set({ isFetching: false });
    }
  },

  resolveRequest: async (id) => {
    try {
      await notificationService.resolveRequest(id);
    } catch (error) {
      console.error("Lỗi khi xử lý yêu cầu:", error);
      throw error;
    }
  },

  markAllAsRead: () => {
    set({ unreadCount: 0 });
  },
}));

export default useNotificationStore;

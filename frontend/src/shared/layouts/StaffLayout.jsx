import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Store, ClipboardList, Settings, Bell, CalendarCheck } from "lucide-react";
import StaffHeader from "@/features/staff/components/StaffHeader";
import StaffSidebar from "@/features/staff/components/StaffSidebar";
import StaffBottomNav from "@/features/staff/components/StaffBottomNav";
import useNotificationStore from "@/features/staff/store/useNotificationStore";
import { useSocket } from "@/shared/providers/SocketProvider";

export default function StaffLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { socketService } = useSocket();
  const { fetchPendingRequests, addNotification, removeNotification, unreadCount } = useNotificationStore();

  useEffect(() => {
    fetchPendingRequests();

    socketService.joinRoom('staff-room');

    socketService.on('new_service_request', addNotification);
    socketService.on('service_request_resolved', (data) => removeNotification(data.id));

    return () => {
      socketService.off('new_service_request', addNotification);
      socketService.off('service_request_resolved');
    };
  }, [fetchPendingRequests, addNotification, removeNotification, socketService]);

  const navItems = [
    { name: "Sơ Đồ Bàn", path: "/staff/tables", icon: Store },
    { name: "Đặt Bàn", path: "/staff/reservations", icon: CalendarCheck },
    { name: "Đơn Hàng", path: "/staff/orders", icon: ClipboardList },
    { name: "Thông báo", path: "/staff/notifications", icon: Bell },
    { name: "Cài Đặt", path: "/staff/settings", icon: Settings },
  ];

  return (
    <div className="flex flex-col md:flex-row h-screen bg-background text-text font-sans">
      <StaffHeader 
        onOpenMenu={() => setIsMenuOpen(true)}
        unreadCount={unreadCount} 
      />

      <StaffSidebar 
        navItems={navItems} 
        unreadCount={unreadCount} 
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />

      <main className="flex-1 overflow-y-auto pb-16 md:pb-0 relative">
        <Outlet />
      </main>

      <StaffBottomNav navItems={navItems} />
    </div>
  );
}

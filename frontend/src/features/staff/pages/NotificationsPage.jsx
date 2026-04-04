import { useEffect } from "react";
import { Bell, CheckCircle, Clock, MapPin } from "lucide-react";
import useNotificationStore from "@/features/staff/store/useNotificationStore";

const NOTIFICATION_STYLES = {
  CALL_STAFF: {
    label: "GỌI PHỤC VỤ",
    badgeClass: "bg-[#ca8a04]/10 text-[#ca8a04]",
    description: "Cần hỗ trợ tại bàn",
  },
  REQUEST_PAYMENT: {
    label: "GỌI THANH TOÁN",
    badgeClass: "bg-primary/10 text-primary",
    description: "Yêu cầu thanh toán hóa đơn",
  }
};

const getNotificationStyle = (type) => {
  return NOTIFICATION_STYLES[type] || {
    label: type,
    badgeClass: "bg-gray-100 text-gray-600",
    description: "Yêu cầu mới",
  };
};

export default function NotificationsPage() {
  const { notifications, resolveRequest, markAllAsRead } = useNotificationStore();

  // Đánh dấu đã đọc khi vào trang này
  useEffect(() => {
    markAllAsRead();
  }, [markAllAsRead]);

  const handleResolve = async (id) => {
    try {
      await resolveRequest(id);
    } catch (error) {
      console.error(error);
    }
  };

  const formatTime = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="p-4 max-w-3xl mx-auto pb-24 md:pb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-black text-gray-900 flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            Thông báo ({notifications.length})
          </h1>
        </div>
      </div>

      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400 bg-white rounded-3xl border border-dashed border-gray-200">
          <CheckCircle className="w-10 h-10 mb-3 opacity-20 text-green-500" />
          <p className="font-bold text-gray-700">Không có thông báo mới</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((noti) => {
            const style = getNotificationStyle(noti.type);
            return (
              <div 
                key={noti.id} 
                className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className={`p-2.5 rounded-xl shrink-0 ${style.badgeClass.split(' ')[0]}`}>
                    <Bell className={`w-5 h-5 ${style.badgeClass.split(' ')[1]}`} />
                  </div>
                  
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[14px] font-black text-gray-900 uppercase">
                        {noti.table?.name || noti.tableId}
                      </span>
                      <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-md uppercase tracking-tight ${style.badgeClass}`}>
                        {style.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="text-xs text-gray-500 truncate font-medium">
                        {style.description}
                      </p>
                      <span className="text-[10px] text-gray-400 flex items-center gap-1 font-medium whitespace-nowrap">
                        <Clock size={10} />
                        {formatTime(noti.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={() => handleResolve(noti.id)}
                  className="px-4 py-2 bg-primary/10 text-primary text-[11px] font-black rounded-xl hover:bg-primary hover:text-white transition-all active:scale-[0.98] cursor-pointer shrink-0 border border-primary/20"
                >
                  Xác nhận
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

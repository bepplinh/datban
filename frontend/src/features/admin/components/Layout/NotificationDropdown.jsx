import { Bell, Check, AlertCircle, Info, Clock } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const FAKE_NOTIFICATIONS = [
  {
    id: 1,
    type: 'success',
    title: 'New Order Received',
    message: 'Table 5 has just placed a new order for 4 items.',
    time: '2 minutes ago',
    isRead: false,
  },
  {
    id: 2,
    type: 'warning',
    title: 'Payment Pending',
    message: 'Order #1234 on Table 2 is awaiting payment confirmation.',
    time: '15 minutes ago',
    isRead: false,
  },
  {
    id: 3,
    type: 'info',
    title: 'System Update',
    message: 'A new version of the dashboard is available. Please refresh.',
    time: '1 hour ago',
    isRead: true,
  },
  {
    id: 4,
    type: 'success',
    title: 'Chef Ready',
    message: 'Main kitchen staff has started preparing Table 10 orders.',
    time: '2 hours ago',
    isRead: true,
  },
  {
    id: 5,
    type: 'success',
    title: 'Chef Ready',
    message: 'Main kitchen staff has started preparing Table 10 orders.',
    time: '2 hours ago',
    isRead: true,
  }
];

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(FAKE_NOTIFICATIONS);
  const dropdownRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const getIcon = (type) => {
    switch (type) {
      case 'success': return <Check size={16} className="text-emerald-500" />;
      case 'warning': return <AlertCircle size={16} className="text-amber-500" />;
      case 'info': return <Info size={16} className="text-blue-500" />;
      default: return <Bell size={16} className="text-slate-500" />;
    }
  };

  const getBgColor = (type) => {
    switch (type) {
      case 'success': return 'bg-emerald-50';
      case 'warning': return 'bg-amber-50';
      case 'info': return 'bg-blue-50';
      default: return 'bg-slate-50';
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen((prev) => !prev)}
        className={`relative p-2 rounded-xl transition-all duration-300 ${isOpen ? 'bg-indigo-50 text-indigo-600 ring-2 ring-indigo-100' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}`}
      >
        <Bell size={22} />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white text-[10px] font-bold text-white items-center justify-center">
              {unreadCount}
            </span>
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-14 right-0 w-[380px] bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in duration-200 z-50">
          <div className="p-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
            <div>
              <h3 className="font-bold text-slate-800">Notifications</h3>
              <p className="text-xs text-slate-500 font-medium">You have {unreadCount} unread messages</p>
            </div>
            {unreadCount > 0 && (
              <button 
                onClick={markAllAsRead}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors px-2 py-1 rounded-lg hover:bg-indigo-50"
              >
                Mark all as read
              </button>
            )}
          </div>
          
          <div className="max-h-[400px] overflow-y-auto no-scrollbar">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div 
                  key={notification.id}
                  className={`p-4 border-b border-slate-50 hover:bg-slate-50/80 transition-all cursor-pointer flex gap-4 relative group ${!notification.isRead ? 'bg-white' : 'opacity-75'}`}
                >
                  {!notification.isRead && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 rounded-r-full" />
                  )}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${getBgColor(notification.type)}`}>
                    {getIcon(notification.type)}
                  </div>
                  <div className="space-y-1 overflow-hidden">
                    <div className="flex items-center justify-between gap-2">
                      <p className={`text-sm font-bold leading-tight truncate ${!notification.isRead ? 'text-slate-900' : 'text-slate-600'}`}>
                        {notification.title}
                      </p>
                      <span className="text-[11px] font-medium text-slate-400 whitespace-nowrap flex items-center gap-1">
                        <Clock size={10} />
                        {notification.time}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">
                      {notification.message}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bell size={24} className="text-slate-300" />
                </div>
                <p className="text-sm font-bold text-slate-800">No notifications yet</p>
                <p className="text-xs text-slate-500 mt-1">We'll notify you when something happens.</p>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-slate-50 bg-slate-50/30 text-center">
            <button className="text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors w-full py-1">
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;

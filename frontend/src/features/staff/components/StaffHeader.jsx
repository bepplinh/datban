import { Bell, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function StaffHeader({ onOpenMenu, unreadCount }) {
  const navigate = useNavigate();
  
  return (
    <header className="md:hidden bg-white shadow-sm h-14 flex items-center px-4 justify-between shrink-0 sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <button 
          onClick={onOpenMenu}
          className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full cursor-pointer transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold" style={{ fontFamily: 'Playfair Display SC' }}>Warm App</h1>
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={() => navigate("/staff/notifications")}
          className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full cursor-pointer transition-colors"
        >
          <Bell className="w-6 h-6" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
              {unreadCount}
            </span>
          )}
        </button>
        <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
          S
        </div>
      </div>
    </header>
  );
}

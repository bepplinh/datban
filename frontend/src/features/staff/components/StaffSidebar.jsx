import { NavLink } from "react-router-dom";
import { Bell, X } from "lucide-react";

export default function StaffSidebar({ navItems, unreadCount, isOpen, onClose }) {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed md:static top-0 left-0 h-full w-64 bg-white shadow-2xl md:shadow-[0_4px_6px_rgba(0,0,0,0.1)] z-40 shrink-0
        transition-transform duration-300 transform md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        flex flex-col
      `}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100">
          <h1 className="text-lg font-bold text-primary" style={{ fontFamily: 'Playfair Display SC' }}>
            Warm Restaurant
          </h1>
          <button 
            onClick={onClose}
            className="md:hidden p-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      <nav className="flex-1 py-4 flex flex-col gap-2 px-3">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => {
              if (window.innerWidth < 768) onClose();
            }}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors duration-200 cursor-pointer ${
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-secondary"
              }`
            }
          >
            <div className="relative">
              <item.icon className="w-5 h-5" />
              {item.path === "/staff/notifications" && unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white animate-pulse">
                  {unreadCount}
                </span>
              )}
            </div>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-100 flex items-center gap-3">
        <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
          S
        </div>
        <div>
          <p className="font-semibold text-sm">Nguyễn Văn Staff</p>
          <p className="text-xs text-gray-500">Ca Sáng</p>
        </div>
      </div>
      </aside>
    </>
  );
}

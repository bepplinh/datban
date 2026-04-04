import { NavLink } from "react-router-dom";
import useNotificationStore from "@/features/staff/store/useNotificationStore";

export default function StaffBottomNav({ navItems }) {
  const { unreadCount } = useNotificationStore();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex items-center justify-around z-20 pb-safe">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full gap-1 transition-colors duration-200 cursor-pointer ${
              isActive ? "text-primary" : "text-gray-500 hover:text-secondary"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <div className="relative">
                <item.icon className="w-6 h-6" fill={isActive ? "currentColor" : "none"} />
                {item.path === "/staff/notifications" && unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium">{item.name}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}

import { LayoutDashboard, BookOpen, Shield, Calendar, Wallet, Settings, LogOut, Layers, Coffee, ReceiptText } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

function SideBar() {
  const location = useLocation();
  const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { label: 'Quản lý Bàn', icon: BookOpen, path: '/admin/tables' },
    { label: 'Danh mục', icon: Layers, path: '/admin/categories' },
    { label: 'Món ăn', icon: Coffee, path: '/admin/products' },
    { label: 'Đơn hàng & Hóa đơn', icon: ReceiptText, path: '/admin/orders' },
    { label: 'Security', icon: Shield, path: '/admin/security' },
    { label: 'Wallet', icon: Wallet, path: '/admin/wallet' },
    { label: 'Cài đặt', icon: Settings, path: '/admin/settings' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-100 hidden lg:flex flex-col justify-between shadow-sm z-20">
      <div>
        <div className="h-20 flex items-center justify-center border-b border-slate-100">
          <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-indigo-500 to-purple-600">
            VENUS
          </h1>
        </div>
        <nav className="p-5 space-y-2">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-3">Main Menu</p>
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-sm' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium'
                }`}
              >
                <Icon size={20} className={isActive ? 'text-indigo-600' : 'text-slate-400'} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-5 border-t border-slate-100">
        <button className="flex items-center gap-3 w-full px-4 py-3 font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 rounded-2xl transition-colors">
          <LogOut size={20} />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}

export default SideBar;
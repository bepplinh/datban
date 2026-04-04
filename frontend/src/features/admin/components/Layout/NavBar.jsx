import { Menu } from 'lucide-react';
import SearchBar from './SearchBar';
import NotificationDropdown from './NotificationDropdown';
import UserMenu from './UserMenu';

const NavBar = () => {
  return (
    <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-slate-100 flex items-center justify-between px-6 sticky top-0 z-50 shadow-sm transition-all duration-300">
      <div className="flex items-center gap-4">
        <button className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors">
          <Menu size={24} />
        </button>
        <SearchBar />
      </div>
      
      <div className="flex items-center gap-6">
        <NotificationDropdown />
        <UserMenu />
      </div>
    </header>
  );
};

export default NavBar;

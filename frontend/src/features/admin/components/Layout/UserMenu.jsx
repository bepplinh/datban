import useAuthStore from "../../../auth/store/useAuthStore";

const UserMenu = () => {
  const user = useAuthStore((state) => state.user);
  return (
    <div className="flex items-center gap-3 cursor-pointer p-1.5 pr-3 hover:bg-slate-50 rounded-full transition-colors border border-transparent hover:border-slate-100 group">
      <div className="relative">
        <img 
          src="https://i.pravatar.cc/150?img=11" 
          alt="User avatar" 
          className="w-10 h-10 rounded-full object-cover shadow-sm bg-white ring-2 ring-transparent group-hover:ring-slate-100 transition-all"
        />
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
      </div>
      <div className="hidden sm:block">
        <p className="text-sm font-bold text-slate-800 leading-none mb-1 group-hover:text-indigo-600 transition-colors">Andrei</p>
        <p className="text-xs font-medium text-slate-500 leading-none">{user.name}</p>
      </div>
    </div>
  );
};

export default UserMenu;

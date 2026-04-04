import { Search } from 'lucide-react';

const SearchBar = () => {
  return (
    <div className="relative hidden md:block group">
      <Search 
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" 
        size={18} 
      />
      <input 
        type="text" 
        placeholder="Search here..." 
        className="pl-12 pr-4 py-2.5 bg-slate-50 border border-transparent rounded-2xl w-64 md:w-80 focus:outline-none focus:bg-white focus:border-indigo-100 focus:ring-4 focus:ring-indigo-50/50 text-sm font-medium text-slate-700 transition-all placeholder:text-slate-400"
      />
    </div>
  );
};

export default SearchBar;

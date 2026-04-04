import { useState } from "react";
import { Search, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Cart from "@/features/orders/components/Cart";
import { useTableStore } from "../../table-session/store/useTableStore";

const SearchBar = ({ onSearch, defaultValue = "" }) => {
  const [value, setValue] = useState(defaultValue);
  const navigate = useNavigate();
  const tableId = useTableStore((state) => state.tableId);

  return (
    <div className="flex items-center gap-3 p-4 bg-white">
      <div 
        onClick={() => navigate(`/table/${tableId}`)} 
        className="p-2 border border-orange-100 rounded-lg bg-orange-50/50 cursor-pointer hover:bg-orange-50 transition-colors"
      >
        <Home size={20} className="text-orange-500" />
      </div>

      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all font-medium placeholder:text-gray-400 placeholder:font-normal"
          placeholder="Bạn muốn tìm món gì ?"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onSearch(e.target.value);
          }}
        />
      </div>

      <Cart />
    </div>
  );
};

export default SearchBar;

import React from "react";
import { Search, Filter, ArrowUpDown, DollarSign } from "lucide-react";

const MenuFilters = ({ 
  searchTerm, setSearchTerm, 
  selectedCategoryId, setSelectedCategoryId, 
  priceLimit, setPriceLimit, 
  sortOrder, setSortOrder,
  categoryOptions, maxPossiblePrice
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12 border border-gray-100">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* 1. Search */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-text/50 flex items-center gap-2">
            <Search className="w-3 h-3" /> Tìm kiếm
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Bạn đang thèm món gì?"
              className="input w-full pr-4 py-2.5"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* 2. Category Dropdown (Hierarchical) */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-text/50 flex items-center gap-2">
            <Filter className="w-3 h-3" /> Danh mục
          </label>
          <select
            className="input w-full py-2.5 cursor-pointer"
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
          >
            <option value="all">Tất cả danh mục</option>
            {categoryOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {"\u00A0".repeat(opt.depth * 4)}
                {opt.depth > 0 ? "└─ " : ""}
                {opt.name}
              </option>
            ))}
          </select>
        </div>

        {/* 3. Price Range Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold uppercase tracking-wider text-text/50 flex items-center gap-2">
              <DollarSign className="w-3 h-3" /> Khoảng giá
            </label>
            <span className="text-sm font-bold text-cta">
              Lên đến {Math.round(priceLimit).toLocaleString()}đ
            </span>
          </div>
          <div className="pt-3">
            <input
              type="range"
              min="0"
              max={maxPossiblePrice}
              step="1"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              value={priceLimit}
              onChange={(e) => setPriceLimit(Number(e.target.value))}
            />
            <div className="flex justify-between mt-2 text-[10px] font-bold text-gray-400">
              <span>0đ</span>
              <span>{Math.round(maxPossiblePrice).toLocaleString()}đ</span>
            </div>
          </div>
        </div>

        {/* 4. Sort Order */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-text/50 flex items-center gap-2">
            <ArrowUpDown className="w-3 h-3" /> Sắp xếp theo
          </label>
          <select
            className="input w-full py-2.5 cursor-pointer"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="default">Mặc định</option>
            <option value="price_asc">Giá: Thấp đến Cao</option>
            <option value="price_desc">Giá: Cao đến Thấp</option>
            <option value="name_asc">Tên: A đến Z</option>
          </select>
        </div>

      </div>

      {/* Active Filter Summary */}
      {(searchTerm || selectedCategoryId !== "all" || priceLimit < maxPossiblePrice) && (
        <div className="mt-6 pt-6 border-t border-gray-50 flex items-center flex-wrap gap-2">
          <span className="text-xs font-semibold text-text/40 mr-2">BỘ LỌC ĐANG DÙNG:</span>
          <button 
            onClick={() => {
              setSearchTerm("");
              setSelectedCategoryId("all");
              setPriceLimit(maxPossiblePrice);
            }}
            className="text-xs text-primary hover:underline font-bold"
          >
            Đặt lại tất cả
          </button>
        </div>
      )}
    </div>
  );
};

export default MenuFilters;

import React from "react";
import { Plus } from "lucide-react";

const FoodItem = ({ dish }) => {
  return (
    <div className="bg-white rounded-2xl p-3 flex gap-3 shadow-sm border border-gray-50 hover:shadow-md transition-all relative">
      <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 shrink-0">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-center flex-1 py-1">
        <h3 className="text-sm font-bold text-text m-0 mb-1">
          {dish.name}
        </h3>
        <span className="text-primary font-bold text-sm">
          {dish.price.toLocaleString("vi-VN")}
        </span>
      </div>
      <div className="flex items-center pr-1">
        <button className="bg-orange-400 text-white p-1.5 rounded-lg hover:bg-orange-500 transition-colors shadow-sm cursor-pointer">
          <Plus size={18} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
};

export default FoodItem;

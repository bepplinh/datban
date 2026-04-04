import React from 'react';
import { ChefHat, Flame, Snowflake, Coffee } from 'lucide-react';

const KDSBottomBar = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { id: 'all', name: 'Tất cả', icon: ChefHat },
    { id: 'hot', name: 'Bếp nóng', icon: Flame },
    { id: 'cold', name: 'Bếp lạnh', icon: Snowflake },
    { id: 'bar', name: 'Bar', icon: Coffee },
  ];

  return (
    <footer className="h-16 px-6 bg-white border-t border-gray-200 flex items-center justify-center shadow-[0_-2px_10px_rgba(0,0,0,0.05)] sticky bottom-0 z-20">
      <div className="flex items-center bg-gray-100 p-1 rounded-xl w-full max-w-2xl">
        {filters.map((filter) => {
          const Icon = filter.icon;
          const isActive = activeFilter === filter.id;
          return (
            <button
              key={filter.id}
              onClick={() => onFilterChange(filter.id)}
              className={`flex-1 h-10 flex items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-all cursor-pointer
                ${isActive 
                  ? 'bg-white text-[#1D9E75] shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
                }`}
            >
              <Icon size={18} />
              {filter.name}
            </button>
          );
        })}
      </div>
    </footer>
  );
};

export default KDSBottomBar;

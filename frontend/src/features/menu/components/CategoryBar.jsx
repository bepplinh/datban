import React from "react";

const CategoryBar = ({ categories, selectedCategory, onSelect }) => {
  return (
    <div className="py-2.5">
      <div className="overflow-x-auto pb-1 px-4 no-scrollbar">
        <div className="grid grid-rows-2 grid-flow-col gap-2 auto-cols-max">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelect(cat.id)}
                className={`
                  whitespace-nowrap px-4 py-2 rounded-xl text-xs font-semibold
                  transition-all duration-300 min-w-[90px] text-center
                  border-2
                  ${
                    isActive
                      ? "bg-primary/10 border-primary text-primary shadow-sm"
                      : "bg-gray-50/50 border-transparent text-gray-500 hover:bg-gray-100"
                  }
                `}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;

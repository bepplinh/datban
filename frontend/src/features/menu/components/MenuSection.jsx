import React from "react";

const MenuSection = ({title, children, badge, bgColor = "bg-white" }) => {
  return (
    <section className={`px-4 py-4 ${bgColor} relative overflow-hidden`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold m-0 text-text">
          {title}
        </h2>
        {badge && (
          <div className="absolute top-2 right-2 scale-110">
            {badge}
          </div>
        )}
      </div>
      {children}
    </section>
  );
};

export default MenuSection;

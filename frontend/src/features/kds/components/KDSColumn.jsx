import React from 'react';

const KDSColumnHeader = ({ title, count, colorClass }) => (
  <div className="p-4 flex items-center justify-between border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
    <h2 className={`font-bold text-lg flex items-center gap-2 ${colorClass}`}>
      {title}
      <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
        {count}
      </span>
    </h2>
  </div>
);

const KDSColumn = ({ title, status, count, colorClass, children }) => {
  return (
    <div className="flex flex-col h-full bg-gray-50/50 rounded-xl overflow-hidden">
      <KDSColumnHeader title={title} count={count} colorClass={colorClass} />
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {children}
        {count === 0 && (
          <div className="flex items-center justify-center h-40 text-gray-400 text-sm italic">
            Không có đơn hàng
          </div>
        )}
      </div>
    </div>
  );
};

export default KDSColumn;

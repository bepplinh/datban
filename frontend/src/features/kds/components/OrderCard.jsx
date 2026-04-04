import React from 'react';

const OrderCardHeader = ({ table, orderId, waitTime, waitTimeColor }) => (
  <div className="flex justify-between items-start mb-3">
    <div className="flex flex-col">
      <h3 className="text-[18px] font-semibold text-[#1a1b22]">{table}</h3>
      <span className="text-[12px] text-[#888888]">#{orderId}</span>
    </div>
    <div className={`px-2 py-1 rounded text-[12px] font-medium text-white shadow-sm ${waitTimeColor}`}>
      {waitTime} phút
    </div>
  </div>
);

const OrderCardItems = ({ items }) => (
  <ul className="space-y-2 mb-5">
    {items.map((item, index) => (
      <li 
        key={index} 
        className={`flex items-start text-[14px] leading-tight ${item.completed ? 'text-[#444444] line-through' : 'text-[#1a1b22]'}`}
      >
        <span className="font-bold min-w-[24px]">{item.quantity}×</span>
        <span className="flex-1 ml-1">{item.name}</span>
      </li>
    ))}
  </ul>
);

const OrderCardActions = ({ onAction }) => {
  return (
    <button
      onClick={onAction}
      className="w-full h-12 min-h-[48px] px-4 flex items-center justify-center rounded bg-teal-50 border border-teal-100 hover:bg-teal-100 active:bg-teal-200 text-teal-700 font-semibold text-[14px] transition-all cursor-pointer touch-manipulation shadow-sm"
    >
      Xử lý & Chi tiết
    </button>
  );
};

const OrderCard = ({ order, onAction }) => {
  const { table, orderId, waitTime, items, status } = order;

  // Design Tokens
  const statusColors = {
    'CHƯA LÀM': 'border-[#444444]',
    'ĐANG CHẾ BIẾN': 'border-[#EF9F27]',
    'ĐÃ XONG': 'border-[#1D9E75]',
  };

  const getWaitTimeColor = (minutes) => {
    if (minutes < 5) return 'bg-[#444444]';
    if (minutes <= 15) return 'bg-[#EF9F27]';
    return 'bg-[#E24B4A]';
  };

  const isDone = status === 'ĐÃ XONG';
  const isUrgent = waitTime > 15;

  return (
    <div 
      className={`bg-white rounded-lg shadow-sm border-t-4 ${statusColors[status]} transition-all duration-200 
      ${isDone ? 'opacity-60' : 'hover:shadow-md'} 
      ${isUrgent ? 'border-l-4 border-l-[#E24B4A]' : ''}`}
    >
      <div className="p-4">
        <OrderCardHeader 
          table={table} 
          orderId={orderId} 
          waitTime={waitTime} 
          waitTimeColor={getWaitTimeColor(waitTime)} 
        />
        <OrderCardItems items={items} />
        <OrderCardActions onAction={onAction} />
      </div>
    </div>
  );
};

export default OrderCard;

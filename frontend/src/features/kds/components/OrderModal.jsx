import React from 'react';
import { X, CheckCircle2, Loader2, Play } from 'lucide-react';

const OrderModal = ({ isOpen, onClose, order, onUpdateItem }) => {
  if (!isOpen || !order) return null;

  const getStatusInfo = (status) => {
    switch (status) {
      case 'PENDING':
        return { 
          label: 'Chưa làm', 
          color: 'bg-gray-100 text-gray-600',
          nextAction: 'Bắt đầu làm',
          icon: <Play size={16} className="mr-2" />
        };
      case 'PREPARING':
        return { 
          label: 'Đang chế biến', 
          color: 'bg-amber-100 text-amber-600',
          nextAction: 'Xong — báo staff',
          icon: <Loader2 size={16} className="mr-2 animate-spin" />
        };
      case 'READY':
        return { 
          label: 'Đã xong', 
          color: 'bg-teal-100 text-teal-600',
          nextAction: null,
          icon: <CheckCircle2 size={16} className="mr-2" />
        };
      default:
        return { label: status, color: 'bg-gray-100', nextAction: null };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center bg-gray-50/50">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{order.table}</h2>
            <p className="text-sm text-gray-500 mt-1">Mã đơn: #{order.orderId} • {order.items.length} món</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <ul className="space-y-4">
            {order.items.map((item) => {
              const info = getStatusInfo(item.status);
              return (
                <li key={item.id} className="flex items-center justify-between p-4 rounded-lg border bg-white hover:bg-gray-50/50 transition-colors">
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <span className="font-bold text-lg mr-3 w-8">{item.quantity}×</span>
                      <span className="text-gray-900 font-medium">{item.name}</span>
                    </div>
                    <div className={`mt-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium w-fit ${info.color}`}>
                      {info.icon}
                      {info.label}
                    </div>
                  </div>
                  
                  {info.nextAction && (
                    <button
                      onClick={() => onUpdateItem(item.id, item.status)}
                      className="ml-4 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold text-sm transition-all shadow-sm active:transform active:scale-95"
                    >
                      {info.nextAction}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-white border border-gray-200 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;

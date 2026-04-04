import { ReceiptText } from "lucide-react";

function OrderStatusBar({ totalAmount, onClick }) {
  const formatPrice = (price) => {
    if (!price) return "0";
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div className="w-full px-4 py-2 bg-white flex justify-between items-center max-w-md mx-auto shadow-[0_-8px_20px_rgba(0,0,0,0.06)] border-t border-gray-100 pb-safe">
      {/* Left side: Order Info */}
      <div className="flex items-center gap-3 cursor-pointer" onClick={onClick}>
        <div className="relative p-2 bg-blue-50 rounded-lg">
          <ReceiptText size={20} className="text-blue-500" />
        </div>
        <div className="flex flex-col">
          <span className="text-[11px] text-gray-400 font-medium leading-tight">Đơn hàng của bạn</span>
          <span className="text-[14px] font-bold text-gray-800 leading-tight">Đang chuẩn bị</span>
        </div>
      </div>

      {/* Right side: Summary & Action */}
      <div 
        className="w-[60%] bg-blue-500 rounded-[8px] cursor-pointer active:scale-[0.98] transition-all shadow-sm hover:bg-blue-600 flex justify-between items-center px-4 h-11"
        onClick={onClick}
      >
        <span className="text-white font-light text-[14px]">
          {formatPrice(totalAmount)}đ
        </span>
        <span className="text-white font-bold text-[15px]">Xem chi tiết</span>
      </div>
    </div>
  );
}

export default OrderStatusBar;

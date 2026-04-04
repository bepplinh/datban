import { ArrowLeft, CheckCircle } from "lucide-react";

function OrderDetailsModal({ order, onClose }) {
  if (!order) return null;

  const items = order.items || [];
  
  const formatPrice = (price) => {
    if (!price) return "0";
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending": return "Đang chờ xác nhận";
      case "preparing": return "Bếp đang chuẩn bị";
      case "serving": return "Đang phục vụ";
      case "completed": return "Đã hoàn thành";
      case "cancelled": return "Đã hủy";
      default: return "Đã gửi bếp";
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] animate-in slide-in-from-bottom duration-300 w-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 bg-white border-b border-gray-100 shrink-0 sticky top-0 z-20 shadow-sm">
        <button
          onClick={onClose}
          className="flex items-center justify-center -ml-1 text-gray-600 hover:text-gray-900 w-8 h-8 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={22} className="shrink-0" />
        </button>
        <h2 className="text-[17px] font-medium text-gray-800 absolute left-1/2 -translate-x-1/2 whitespace-nowrap">
          Món đã đặt
        </h2>
        <div className="w-8 shrink-0"></div> {/* Spacer for centering */}
      </div>

      {/* Order Status Banner */}
      <div className="bg-blue-50 px-4 py-3 flex items-center gap-3 shrink-0">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
          <CheckCircle size={24} className="text-blue-500" />
        </div>
        <div>
          <h3 className="text-[14px] font-bold text-gray-800">Đơn hàng #{order.id?.toString().slice(-4) || '...'}</h3>
          <p className="text-[13px] text-blue-600 font-medium">{getStatusText(order.status)}</p>
        </div>
      </div>

      {/* Item List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-24">
        {items.map((item, index) => {
          const product = item.product || item.productId || item;
          const name = product?.name || item.name || "Món ăn";
          const image = product?.image || item.image;
          const price = item.unitPrice || product?.price || 0;
          const quantity = item.quantity || 1;
          const note = item.note || "";

          return (
            <div
              key={item.id || index}
              className="bg-white rounded-[12px] p-3 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-50 flex items-start gap-3 relative opacity-80"
            >
              {/* Image */}
              <div className="w-[72px] h-[72px] rounded-[8px] shrink-0 overflow-hidden bg-gray-100 border border-gray-100">
                {image ? (
                  <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200"></div>
                )}
              </div>

              {/* Details */}
              <div className="flex-1 flex flex-col justify-between min-h-[72px]">
                <div className="flex justify-between items-start gap-3">
                  <h3 className="text-[14px] font-medium text-gray-800 leading-[1.3] line-clamp-2">
                    <span className="text-blue-500 font-bold mr-1">
                      {quantity} x
                    </span>
                    {name}
                  </h3>
                </div>

                {/* Note preview */}
                {note && (
                  <p className="text-[12px] text-gray-400 italic mt-1 line-clamp-1">
                    📝 {note}
                  </p>
                )}

                <div className="flex justify-between items-end mt-2">
                  <span className="text-[14px] font-medium text-gray-900">
                    {formatPrice(price * quantity)}đ
                  </span>
                  <span className="text-[11px] px-2 py-0.5 bg-gray-100 text-gray-500 rounded-md">Đã gửi bếp</span>
                </div>
              </div>
            </div>
          )
        })}

        {items.length === 0 && (
          <div className="flex flex-col items-center justify-center h-40 text-gray-400">
            <p>Không có món nào</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-white px-4 py-4 shadow-[0_-8px_20px_rgba(0,0,0,0.06)] border-t border-gray-100 mt-auto shrink-0 pb-safe z-20">
        <div className="flex justify-between items-center mb-4 px-1">
          <span className="text-[16px] text-gray-600">Tổng tiền đã đặt</span>
          <span className="text-[18px] font-bold text-gray-900">
            {formatPrice(order.total)}đ
          </span>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-red-400 text-white font-bold text-[16px] py-3.5 rounded-[8px] active:scale-[0.98] transition-all hover:bg-red-500"
        >
          Đóng
        </button>
      </div>
    </div>
  );
}

export default OrderDetailsModal;

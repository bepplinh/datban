import { X } from "lucide-react";

/**
 * Bottom-sheet modal for reviewing draft items before submitting an order.
 */
const DraftReviewModal = ({
  items,
  totalAmount,
  onClose,
  onSubmit,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex flex-col justify-end md:max-w-md md:mx-auto">
      <div className="bg-white rounded-t-2xl w-full h-[80vh] flex flex-col animate-slide-up">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center shrink-0">
          <h2 className="text-xl font-bold">Xác nhận gọi món</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3 bg-gray-50 p-3 rounded-xl">
              <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm leading-tight text-text line-clamp-2">
                    {item.name}
                  </h3>
                  <div className="text-primary font-semibold text-sm mt-1">
                    {item.price.toLocaleString("vi-VN")}đ
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-red-500 text-xs font-bold"
                  >
                    Xóa
                  </button>
                  <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200"
                    >
                      -
                    </button>
                    <span className="font-bold text-sm min-w-[1ch] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="w-6 h-6 flex items-center justify-center bg-primary/10 text-primary rounded hover:bg-primary/20"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-gray-100 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] shrink-0 pb-10 md:pb-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-500 font-medium text-lg">Tổng cộng</span>
            <span className="text-2xl font-bold text-primary">
              {totalAmount.toLocaleString("vi-VN")} đ
            </span>
          </div>
          <button
            onClick={onSubmit}
            className="w-full bg-primary text-white h-14 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all flex items-center justify-center"
          >
            Xác Nhận Gọi Món
          </button>
        </div>
      </div>
    </div>
  );
};

export default DraftReviewModal;

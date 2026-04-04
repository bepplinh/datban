import { ArrowLeft, X, Trash2, CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import EditItemModal from "./EditItemModal";
import ConfirmDialog from "./ConfirmDialog";
import { useCartStore } from "@/features/orders/store/useCartStore";
import { orderService } from "@/features/orders/services/order.service";
import { useTableStore } from "@/features/table-session/store/useTableStore";
import { useOrderStore } from "@/features/orders/store/useOrderStore";
import { toast } from "sonner";
import { formatCurrency } from "@/shared/utils/format";

function CartDetailsModal({ items, onClose }) {
  const [editingItem, setEditingItem] = useState(null);
  const [confirmData, setConfirmData] = useState(null); // { title, message, onConfirm }
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderError, setOrderError] = useState(null);
  
  const activeOrder = useOrderStore((state) => state.activeOrder);
  const setActiveOrder = useOrderStore((state) => state.setActiveOrder);

  const clearCart = useCartStore((state) => state.clearCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const tableId = useTableStore((state) => state.tableId);

  const formatPrice = formatCurrency;

  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmitOrder = async () => {
    if (!tableId) {
      setOrderError("Không tìm thấy thông tin bàn. Vui lòng quét lại mã QR.");
      return;
    }
    
    setIsSubmitting(true);
    setOrderError(null);
    try {
      console.log("[Order] Starting submission...", { tableId, activeOrderId: activeOrder?.id });
      toast.info("Đang xử lý yêu cầu đặt món...", { id: "order-toast" });

      const itemsPayload = items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        note: item.note || "",
      }));

      let response;
      if (activeOrder) {
        // Cập nhật order hiện tại
        response = await orderService.addItems(itemsPayload);
      } else {
        // Tạo order mới
        const payload = {
          tableId,
          items: itemsPayload,
          totalAmount,
        };
        response = await orderService.createOrder(payload);
      }

      if (response && response.data) {
        console.log("[Order] Order successful:", response.data);
        setActiveOrder(response.data);
      }
      
      setOrderSuccess(true);
      clearCart();
      toast.success("Gọi món thành công!", { id: "order-toast" });
      // Đóng modal sau 2 giây
      setTimeout(() => {
        setOrderSuccess(false);
        onClose();
      }, 2000);
    } catch (err) {
      console.error("[Order] Submission error:", err);
      const errorMessage = err.response?.data?.message || err.response?.data?.error || "Đặt món thất bại. Vui lòng thử lại.";
      setOrderError(errorMessage);
      toast.error(errorMessage, { id: "order-toast" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmOrder = () => {
    setConfirmData({
      title: "Xác nhận gọi món?",
      message: `Bạn đang đặt ${items.length} loại món với tổng ${formatPrice(totalAmount)}đ. Tiếp tục?`,
      onConfirm: () => {
        setConfirmData(null);
        handleSubmitOrder();
      },
    });
  };

  // Success screen
  if (orderSuccess) {
    return (
      <div className="flex flex-col h-full bg-white items-center justify-center gap-4 animate-in fade-in duration-300">
        <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
          <CheckCircle size={48} className="text-green-500" strokeWidth={1.5} />
        </div>
        <div className="text-center">
          <h3 className="text-[20px] font-bold text-gray-800">Gọi món thành công!</h3>
          <p className="text-[14px] text-gray-500 mt-1">Nhà bếp đã nhận được yêu cầu của bạn.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] animate-in slide-in-from-bottom duration-300">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 bg-white border-b border-gray-100 shrink-0 sticky top-0 z-20 shadow-sm">
        <button
          onClick={onClose}
          className="flex items-center justify-center -ml-1 text-gray-600 hover:text-gray-900 w-8 h-8 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={22} className="shrink-0" />
        </button>
        <h2 className="text-[17px] font-medium text-gray-800 absolute left-1/2 -translate-x-1/2 whitespace-nowrap">
          Các món đang chọn
        </h2>
        <button
          onClick={() => {
            setConfirmData({
              title: "Xóa toàn bộ giỏ hàng?",
              message: "Tất cả các món bạn đã chọn sẽ bị xóa khỏi giỏ. Bạn có chắc chắn muốn tiếp tục?",
              onConfirm: () => {
                clearCart();
                onClose();
                setConfirmData(null);
              },
            });
          }}
          className="text-[14px] text-red-500 bg-red-50 px-2.5 py-1.5 rounded-md hover:bg-red-100 transition-colors shrink-0 flex items-center gap-1"
        >
          <Trash2 size={14} />
          Xóa giỏ
        </button>
      </div>

      {/* Item List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-24">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-[12px] p-3 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-50 flex items-start gap-3 relative"
          >
            {/* Image */}
            <div className="w-[72px] h-[72px] rounded-[8px] shrink-0 overflow-hidden bg-gray-100 border border-gray-100">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details */}
            <div className="flex-1 flex flex-col justify-between min-h-[72px] relative z-10 w-full">
              <div className="flex justify-between items-start gap-3 pr-6">
                <h3 className="text-[14px] font-medium text-gray-800 leading-[1.3] line-clamp-2">
                  <span className="text-[#f28627] font-bold mr-1">
                    {item.quantity} x
                  </span>
                  {item.name}
                </h3>
              </div>

              {/* Note preview */}
              {item.note && (
                <p className="text-[12px] text-gray-400 italic mt-1 line-clamp-1">
                  📝 {item.note}
                </p>
              )}

              {/* Delete Button (Top Right Absolute) */}
              <button
                onClick={() => {
                  setConfirmData({
                    title: "Xóa món này?",
                    message: `Bạn có chắc chắn muốn xóa "${item.name}" khỏi giỏ hàng?`,
                    onConfirm: () => {
                      removeFromCart(item.id);
                      setConfirmData(null);
                    },
                  });
                }}
                className="absolute top-0 right-0 p-1 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors flex items-center justify-center -mt-1 -mr-1"
                aria-label="Remove item"
              >
                <X size={18} />
              </button>

              <div className="flex justify-between items-end mt-2">
                <span className="text-[14px] font-medium text-gray-900">
                  {formatPrice(item.price * item.quantity)}
                </span>
                <button
                  className="text-[#f28627] text-[13px] font-medium hover:underline px-2 py-1 -mr-2 rounded transition-colors"
                  onClick={() => setEditingItem(item)}
                >
                  Chỉnh sửa
                </button>
              </div>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="flex flex-col items-center justify-center h-40 text-gray-400">
            <p>Chưa có món nào trong giỏ</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-white px-4 py-4 shadow-[0_-8px_20px_rgba(0,0,0,0.06)] border-t border-gray-100 mt-auto shrink-0 pb-safe z-20">
        <div className="flex justify-between items-center mb-4 px-1">
          <span className="text-[16px] text-gray-600">Tổng tiền</span>
          <span className="text-[18px] font-bold text-gray-900">
            {formatPrice(totalAmount)}
          </span>
        </div>

        {/* Error message */}
        {orderError && (
          <p className="text-[13px] text-red-500 text-center mb-3">{orderError}</p>
        )}

        <button
          onClick={handleConfirmOrder}
          disabled={isSubmitting || items.length === 0}
          className="w-full bg-[#f28627] text-white font-bold text-[16px] py-3.5 rounded-[8px] active:scale-[0.98] transition-all shadow-md hover:bg-[#e4761b] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Đang gửi...
            </>
          ) : (
            "Xác nhận gửi yêu cầu gọi món"
          )}
        </button>
      </div>

      {/* Edit Item Modal overlay */}
      {editingItem && (
        <div className="fixed inset-0 z-60 bg-black/60 max-w-md mx-auto flex flex-col justify-end">
          <EditItemModal
            item={editingItem}
            onClose={() => setEditingItem(null)}
          />
        </div>
      )}
      {/* Confirm Dialog Overlay */}
      {confirmData && (
        <ConfirmDialog
          title={confirmData.title}
          message={confirmData.message}
          onConfirm={confirmData.onConfirm}
          onCancel={() => setConfirmData(null)}
        />
      )}
    </div>
  );
}

export default CartDetailsModal;

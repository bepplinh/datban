import { formatCurrency } from "@/shared/utils/format";

/**
 * Sticky checkout footer with total, Báo Bếp button, and action buttons.
 */
const CheckoutFooter = ({
  totalAmount,
  isEstimate,
  draftCount,
  isSubmitting,
  onBaoBep,
  onGoiMon,
  onThanhToan,
}) => {
  return (
    <div className="bg-white border-t border-gray-100 p-4 shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] md:rounded-b-xl z-10 md:pb-4">
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-500 font-medium">
          Tổng thanh toán {isEstimate && "(Tạm tính)"}
        </span>
        <span className="text-2xl font-bold text-primary">
          {formatCurrency(totalAmount)}
        </span>
      </div>

      {draftCount > 0 && (
        <button
          onClick={onBaoBep}
          disabled={isSubmitting}
          className="w-full mb-3 h-14 bg-orange-500 text-white font-bold rounded-xl shadow-md cursor-pointer hover:bg-orange-600 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isSubmitting ? "Đang xử lý..." : `Báo Bếp (${draftCount} món)`}
        </button>
      )}

      <div className="flex gap-3">
        <button
          onClick={onGoiMon}
          className="flex-1 h-14 bg-white border-2 border-primary text-primary font-bold rounded-xl shadow-sm cursor-pointer hover:bg-primary/5 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <span className="text-xl leading-none mb-0.5">+</span> Gọi món
        </button>
        <button
          onClick={onThanhToan}
          className="flex-1 h-14 bg-primary text-white font-bold rounded-xl shadow-md cursor-pointer hover:bg-primary/90 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
        >
          Thanh Toán
        </button>
      </div>
    </div>
  );
};

export default CheckoutFooter;

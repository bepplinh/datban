import { ShoppingBag } from "lucide-react";

/**
 * Fixed bottom bar showing cart count, total amount, and a CTA button.
 */
const CartSummaryBar = ({ totalCount, totalAmount, onReview }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 shadow-[0_-4px_10px_rgba(0,0,0,0.1)] md:max-w-md md:mx-auto">
      <div className="p-4 flex items-center justify-between">
        <div className="flex gap-4">
          <div className="relative">
            <ShoppingBag className="w-8 h-8 text-primary" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {totalCount}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 font-medium">Tạm tính</span>
            <span className="font-bold text-lg text-primary">
              {totalAmount.toLocaleString("vi-VN")} đ
            </span>
          </div>
        </div>
        <button
          onClick={onReview}
          className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors active:scale-95"
        >
          Xem lại
        </button>
      </div>
    </div>
  );
};

export default CartSummaryBar;

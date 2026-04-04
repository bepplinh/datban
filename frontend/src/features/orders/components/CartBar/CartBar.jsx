
import ConfirmOrder from "./components/ConfirmOrder";
import CartDetailsModal from "./components/CartDetailsModal";
import { useCartStore } from "@/features/orders/store/useCartStore";
import { ShoppingBag } from "lucide-react";

function CartBar() {
  const items = useCartStore((state) => state.items);
  const totalCount = useCartStore((state) => state.totalCount);
  const showModal = useCartStore((state) => state.showModal);
  const setShowModal = useCartStore((state) => state.setShowModal);
  
  const hasItems = items.length > 0;

  return (
    <>
        {!showModal && hasItems && (
            <div className="w-full px-4 py-2 bg-white flex justify-between items-center shadow-2xl border-t border-gray-100 pb-safe">
                {/* Left side: Cart Summary */}
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => setShowModal(true)}>
                    <div className="relative p-2 bg-gray-50 rounded-lg">
                        <ShoppingBag size={20} className="text-primary" />
                        <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-sm">
                            {totalCount}
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[11px] text-gray-400 font-medium leading-tight">Giỏ hàng</span>
                        <span className="text-[14px] font-bold text-text leading-tight">{totalCount} món</span>
                    </div>
                </div>

                {/* Right side: Confirm Button */}
                <div className="w-[60%] bg-[#f58420] rounded-[8px] cursor-pointer active:scale-[0.98] transition-all shadow-sm hover:bg-[#e4761b]" onClick={() => setShowModal(true)}>
                  <ConfirmOrder/>
                </div>
            </div>
        )}

        {/* Cart Details Modal */}
        {showModal && (
            <div className="fixed inset-0 z-[10000] bg-white max-w-md mx-auto h-screen flex flex-col">
                 <CartDetailsModal items={items} onClose={() => setShowModal(false)} />
            </div>
        )}
    </>
  );
}

export default CartBar;

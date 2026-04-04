import React from "react";import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/features/orders/store/useCartStore";

const Cart = () => {
  const totalCount = useCartStore(state => state.totalCount)
  return (
    <div className="relative p-2 border border-orange-100 rounded-lg bg-orange-50/50 cursor-pointer hover:bg-orange-50 transition-all group">
      <ShoppingBag
        size={20}
        className="text-orange-500 group-hover:scale-110 transition-transform"
      />
      {totalCount > 0 && (
        <div className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm ring-1 ring-primary/20 animate-in zoom-in duration-300">
          {totalCount}
        </div>
      )}
    </div>
  );
};

export default Cart;

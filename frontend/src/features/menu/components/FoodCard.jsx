
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { useCartStore } from "@/features/orders/store/useCartStore";
import { formatCurrency } from "@/shared/utils/format";

const FoodCard = ({ dish }) => {
  const addToCart = useCartStore(state => state.addToCart)
return (
    <div className="bg-white rounded-xl p-1.5 shadow-sm border border-gray-50 flex flex-col gap-1.5 relative overflow-hidden group hover:shadow-md transition-all">
      {dish.isNew && (
        <div className="absolute top-1.5 right-1.5 bg-primary text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full z-10 animate-pulse">
          MỚI
        </div>
      )}
      <div className="aspect-4/3 rounded-lg overflow-hidden bg-gray-100">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="px-0.5 pb-0.5">
        <h3 className="text-[12px] font-bold text-text m-0 line-clamp-2 min-h-[30px] leading-tight mb-1">
          {dish.name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-primary font-bold text-xs">
            {formatCurrency(dish.price)}
          </span>
          <button
          onClick={() => {
            addToCart(dish)
            toast.success(`${dish.name} đã được thêm vào giỏ hàng`);
          }} 
          className="bg-orange-400 text-white p-1 rounded-md hover:bg-orange-500 transition-colors shadow-sm cursor-pointer">
            <Plus size={12} strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;

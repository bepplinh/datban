import { useCartStore } from "@/features/orders/store/useCartStore";

function ConfirmOrder() {
    const totalAmount = useCartStore(state => state.totalAmount);
    
    return (
        <div className="flex justify-between items-center px-4 h-11">
           <span className="text-white font-light text-[14px]">
             {totalAmount.toLocaleString('vi-VN')}
           </span>
           <span className="text-white font-bold text-[15px]">Xem và xác nhận</span>
        </div>
    )
}

export default ConfirmOrder;
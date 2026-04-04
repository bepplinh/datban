import { formatCurrency } from "@/shared/utils/format";

function OrderSummary({ 
  subtotal = 450000, 
  tax = 36000, 
  discount = 0, 
  total = 486000 
}) {
  return (
    <div className="mt-4 mb-6 p-4 rounded-2xl bg-white shadow-sm border border-gray-50">
      <div className="space-y-2.5">
        <div className="flex justify-between items-center text-gray-500 font-medium text-sm">
          <span>Tạm tính</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        
        <div className="flex justify-between items-center text-gray-500 font-medium text-sm">
          <div className="flex items-center gap-1.5">
            <span>Thuế</span>
            <span className="text-[9px] bg-gray-100 px-1 py-0.5 rounded text-gray-400 uppercase">8% VAT</span>
          </div>
          <span>{formatCurrency(tax)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between items-center text-rose-500 font-medium italic text-sm">
            <span>Giảm giá</span>
            <span>-{formatCurrency(discount)}</span>
          </div>
        )}

        <div className="pt-3 mt-3 border-t border-dashed border-gray-100">
          <div className="flex justify-between items-center">
            <span className="font-bold text-[#1a1b22] text-base">Tổng cộng</span>
            <span className="font-black text-[#0D9488] text-xl">
              {formatCurrency(total)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;

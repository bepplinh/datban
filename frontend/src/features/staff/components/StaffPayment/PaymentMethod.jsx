import { Banknote, CreditCard, Globe } from "lucide-react";
import useStaffPayment from "../../store/useStaffPayment";

function PaymentMethod() {
  const { paymentMethod, setPaymentMethod } = useStaffPayment();
  const methods = [
    { id: 'cash', label: 'Tiền mặt', icon: <Banknote size={20}/> },
    { id: 'online', label: 'Chuyển khoản / Ví điện tử', icon: <Globe size={20}/> },
    { id: 'card', label: 'Thanh toán thẻ (Visa/Master)', icon: <CreditCard size={20}/> },
  ];

  return (
    <div className="mb-6">
      <p className="font-bold text-[#1a1b22] text-base mb-3">Phương thức thanh toán</p>
      <div className="flex flex-col gap-2">
        {methods.map((method) => (
          <label 
            key={method.id}
            htmlFor={method.id}
            className={`flex items-center gap-3 p-3 rounded-xl shadow-sm cursor-pointer group active:scale-[0.99] transition-all border-2 ${
              paymentMethod === method.id ? "bg-[#F0FDFA] border-[#0D9488]" : "bg-white border-transparent"
            }`}
          >
            <div className="relative flex items-center">
              <input
                className="w-5 h-5 appearance-none border-2 border-gray-200 rounded-full checked:border-[#0D9488] checked:border-[6px] transition-all cursor-pointer"
                type="radio"
                name="paymentMethod"
                id={method.id}
                value={method.id}
                checked={paymentMethod === method.id}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-gray-50 text-gray-400 group-hover:bg-gray-100 transition-colors rounded-lg">
                {method.icon}
              </div>
              <span className="font-bold text-[#1a1b22] text-sm">{method.label}</span>
            </div>
            
          </label>
        ))}
      </div>
      <p className="mt-3 text-[10px] text-gray-400 text-center px-4 leading-relaxed">
        Hệ thống sẽ tự động xuất hóa đơn điện tử gửi qua email hoặc số điện thoại sau khi thanh toán thành công.
      </p>
    </div>
  );
}

export default PaymentMethod;

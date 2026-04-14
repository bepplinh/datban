import { usePayOS } from "@payos/payos-checkout";
import { useState, useEffect } from "react";
import useStaffPayment from "../../store/useStaffPayment";
import payosService from "../../services/payosService";
import { useTableStore } from "../../../table-session/store/useTableStore";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "@/shared/utils/format";
import { toast } from "sonner";

function Footer({ total = 0 }) {
  const paymentMethod = useStaffPayment((state) => state.paymentMethod);
  const { orderId, clearTableInfo } = useTableStore();
  const setPaymentData = useStaffPayment((state) => state.setPaymentData);
  const [checkoutUrl, setCheckoutUrl] = useState("");
  const navigate = useNavigate();

  const { open } = usePayOS({
    RETURN_URL: window.location.origin + "/staff/payment",
    ELEMENT_ID: "payos-checkout",
    CHECKOUT_URL: checkoutUrl,
    embedded: false,
    onSuccess: (event) => {
      console.log("PayOS: Thanh toán thành công:", event);
      toast.success("Thanh toán thành công!");
      clearTableInfo();
      document.getElementById("payos-checkout").innerHTML = "";
      navigate("/staff/tables");
    },
    onCancel: (event) => {
      console.log("PayOS: Người dùng hủy thanh toán:", event);
      toast.warning("Đã hủy thanh toán")
      document.getElementById("payos-checkout").innerHTML = "";
    },
    onExit: (event) => {
      console.log("PayOS: Người dùng thoát popup:", event);
      document.getElementById("payos-checkout").innerHTML = "";
    },
  });


  const handleClick = async () => {
    console.log("PayOS: Clicked 'Xác nhận thanh toán'");
    try {
      const data = await payosService.createPaymentLink(orderId);
      console.log("PayOS: Received payment link data:", data);
      setPaymentData(data);
      if (data?.checkoutUrl) {
        setCheckoutUrl(data.checkoutUrl);
      } else {
        console.error("PayOS: No checkoutUrl in response");
      }
    } catch (err) {
      console.error("PayOS: Error creating payment link:", err);
    }
  };

  return (
    <footer className="shrink-0 p-4 bg-white/80 backdrop-blur-xl border-t border-gray-100 w-full fixed bottom-0 left-0 right-0 z-10 flex flex-col gap-3">
      {checkoutUrl && (
        <button
          onClick={() => open()}
          className="w-full bg-[#10b981] text-white font-bold rounded-xl py-3 text-sm shadow-lg shadow-emerald-700/20 animate-bounce"
        >
          MỞ CỔNG THANH TOÁN (PAYOS)
        </button>
      )}
      
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={handleClick}
          type="button"
          className="flex-1 bg-[#0D9488] text-white font-bold rounded-xl py-3 text-sm shadow-lg shadow-teal-700/20 active:scale-[0.98] transition-all disabled:opacity-50"
        >
          {checkoutUrl ? "Tạo lại liên kết" : "Xác nhận thanh toán"}
        </button>
        <div className="flex flex-col items-end whitespace-nowrap">
          <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">
            Tổng tiền
          </span>
          <span className="text-lg font-black text-[#1a1b22]">
            {formatCurrency(total)}
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

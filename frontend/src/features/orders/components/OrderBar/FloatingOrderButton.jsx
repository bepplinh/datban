import { ReceiptText } from "lucide-react";

function FloatingOrderButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute bottom-16 right-4 z-50 bg-[#f28627] text-white p-3 rounded-full shadow-[0_4px_12px_rgba(242,134,39,0.3)] hover:bg-[#e4761b] hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center animate-in fade-in zoom-in duration-300 pointer-events-auto"
      aria-label="Xem đơn hàng đã đặt"
    >
      <ReceiptText size={24} />
      <span className="absolute -top-2 -right-2 flex h-5 w-5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 items-center justify-center text-[10px] text-white font-bold border-2 border-white">!</span>
      </span>
    </button>
  );
}

export default FloatingOrderButton;

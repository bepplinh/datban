import { formatCurrency } from "@/shared/utils/format";

function CardProductPayment({ name = "Phở bò", quantity = 2, price = 170000, note = "" }) {
  return (
    <div className="p-3 rounded-xl bg-white flex items-center justify-between mb-2 shadow-[0_2px_8px_rgba(0,0,0,0,02)] border border-transparent active:scale-[0.98] transition-transform">
      <div className="flex items-center gap-3">
        <div className="w-1 h-8 rounded-full bg-[#0D9488]"></div>
        <div className="flex flex-col">
          <p className="font-bold text-[#1a1b22] text-base">{name}</p>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-[#0D9488]">x{quantity}</span>
            {note && <span className="text-[10px] text-gray-400">• {note}</span>}
          </div>
        </div>
      </div>
      <div className="text-base font-bold text-[#1a1b22]">
        {formatCurrency(price)}
      </div>
    </div>
  );
}

export default CardProductPayment;

import React from "react";
import { Wallet, ChevronRight } from "lucide-react";

const QRPointsCard = () => {
  return (
    <section className="px-4 py-2">
      <div className="bg-[#eef8fa] rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:bg-[#e4f2f5] transition-all duration-200 border border-secondary/10">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-xl">
            <Wallet className="text-primary" size={20} />
          </div>
          <span className="text-sm font-semibold text-text">Nhập số điện thoại để tích điểm</span>
        </div>
        <ChevronRight size={16} className="text-gray-400" />
      </div>
    </section>
  );
};

export default QRPointsCard;

import React from "react";
import { MapPin, ChevronRight } from "lucide-react";

const QRHeader = () => {
  return (
    <header className="p-4 flex justify-between items-start bg-white sticky top-0 z-10 shadow-sm">
      <div className="flex flex-col gap-1 text-left">
        <h1 className="text-xl font-bold uppercase m-0 text-text">42 NGUYEN HONG - BANH TRANG P...</h1>
        <div className="flex items-start gap-1 text-[10px] text-gray-500">
          <MapPin size={12} className="mt-0.5 shrink-0" />
          <span className="text-sm">42 Nguyễn Hồng, Láng Hạ, Đống Đa, Hà Nội, Việt...</span>
        </div>
      </div>
      <div className="flex items-center gap-1 border rounded-full px-2 py-1 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
        <span className="text-xs">🇻🇳</span>
        <ChevronRight size={12} className="rotate-90" />
      </div>
    </header>
  );
};

export default QRHeader;

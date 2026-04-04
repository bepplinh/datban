import React from "react";
import { Edit2 } from "lucide-react";

const QRWelcome = ({ tableName }) => {
  return (
    <section className="px-4 py-3 text-center">
      <div className="flex items-center justify-center gap-2 mb-1">
        <span className="text-lg">⛅</span>
        <h2 className="text-base font-bold m-0 flex items-center gap-1">
          Chào buổi chiều <span className="text-secondary border-b border-secondary/30">Quý khách</span> 
          <Edit2 size={12} className="text-secondary cursor-pointer" />
        </h2>
      </div>
      <div className="inline-flex items-center gap-2 border border-gray-200 rounded-full px-4 py-1 mt-1">
        <p className="text-[12px] text-gray-500 m-0">Chúng tôi sẽ trả đồ cho bạn tại bàn:</p>
        <span className="bg-gray-100 text-text font-bold text-xs px-2 py-0.5 rounded-full border border-gray-300">{tableName}</span>
      </div>
    </section>
  );
};

export default QRWelcome;

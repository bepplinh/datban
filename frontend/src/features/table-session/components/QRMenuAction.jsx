import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, BookOpen } from "lucide-react";
import { useTableStore } from "@/features/table-session/store/useTableStore";

const QRMenuAction = () => {
  const tableId = useTableStore((state) => state.tableId);

  return (
    <section className="px-4 py-2">
      <Link to={`/table/${tableId}/menu`} className="block no-underline">
        <div className="bg-[#fec21b] rounded-2xl p-6 flex items-center justify-between shadow-lg shadow-orange-200 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
          <div className="flex items-center gap-1 z-10">
            <h3 className="text-white text-xl font-black m-0">Xem Menu - Gọi món</h3>
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <ChevronRight size={16} className="text-white" />
            </div>
          </div>
          <div className="bg-white/20 p-3 rounded-2xl rotate-12 group-hover:rotate-6 transition-transform z-10">
            <BookOpen className="text-white" size={48} />
          </div>
        </div>
      </Link>
    </section>
  );
};

export default QRMenuAction;

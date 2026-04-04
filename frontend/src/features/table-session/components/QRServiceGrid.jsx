import React, { useState } from "react";
import { Wallet, Users, Star } from "lucide-react";
import { toast } from "sonner";
import { useTableStore } from "../store/useTableStore";
import { serviceRequestAPI } from "../services/serviceRequest.service";

const QRServiceGrid = () => {
  const tableId = useTableStore((state) => state.tableId);
  const [loading, setLoading] = useState(false);

  const handleRequest = async (type) => {
    if (!tableId || loading) return;
    setLoading(true);
    try {
      await serviceRequestAPI.createRequest(tableId, type);
      toast.success(type === "CALL_STAFF" ? "Đã gọi nhân viên" : "Đã gửi yêu cầu thanh toán");
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-4 py-2">
      <div className="grid grid-cols-3 gap-3">
        {/* Call Payment */}
        <div 
          onClick={() => handleRequest("REQUEST_PAYMENT")}
          className={`bg-white border border-gray-100 rounded-2xl p-3 flex flex-col gap-4 shadow-sm hover:shadow-md transition-all cursor-pointer group ${loading ? 'opacity-50 pointer-events-none' : ''}`}
        >
          <span className="text-[14px] font-bold text-gray-700">Gọi thanh toán</span>
          <div className="self-end bg-blue-50 p-2 rounded-lg group-hover:bg-blue-100 transition-colors">
            <Wallet className="text-blue-500" size={24} />
          </div>
        </div>

        {/* Call Staff */}
        <div 
          onClick={() => handleRequest("CALL_STAFF")}
          className={`bg-white border border-gray-100 rounded-2xl p-3 flex flex-col gap-4 shadow-sm hover:shadow-md transition-all cursor-pointer group ${loading ? 'opacity-50 pointer-events-none' : ''}`}
        >
          <span className="text-[14px] font-bold text-gray-700">Gọi nhân viên</span>
          <div className="self-end bg-gray-50 p-2 rounded-lg group-hover:bg-gray-100 transition-colors">
            <Users className="text-gray-600" size={24} />
          </div>
        </div>

        {/* Review */}
        <div 
          onClick={() => toast.info("Tính năng đánh giá đang phát triển")}
          className="bg-white border border-gray-100 rounded-2xl p-3 flex flex-col gap-4 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <span className="text-[14px] font-bold text-gray-700">Đánh giá</span>
          <div className="self-end bg-orange-50 p-2 rounded-lg group-hover:bg-orange-100 transition-colors">
            <Star className="text-orange-400 fill-orange-400" size={24} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default QRServiceGrid;

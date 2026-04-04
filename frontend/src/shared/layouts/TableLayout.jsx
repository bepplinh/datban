import { useEffect, useState } from "react";
import { useParams, Outlet, useSearchParams } from "react-router-dom";
import { useTableStore } from "@/features/table-session/store/useTableStore";
import { useOrderStore } from "@/features/orders/store/useOrderStore";
import { tableSessionService } from "@/features/table-session/services/tableSession.service";
import { orderService } from "@/features/orders/services/order.service";

const TableLayout = () => {
  const { tableId: urlTableId } = useParams();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const { tableId: storedTableId, setTableInfo } = useTableStore();
  const [loading, setLoading] = useState(!storedTableId || storedTableId !== urlTableId);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initSession = async () => {
      if (!urlTableId) return;

      setLoading(true);
      setError(null);
      try {
        const session = await tableSessionService.createTableSession(urlTableId, token);
        setTableInfo(urlTableId, session.table?.name || urlTableId);
        
        const orderResponse = await orderService.getOrderStatus();
        if (orderResponse && orderResponse.data) {
          useOrderStore.getState().setActiveOrder(orderResponse.data);
        } else {
          useOrderStore.getState().clearActiveOrder();
        }
      } catch (err) {
        console.error("Failed to initialize session in TableLayout:", err);
        const errorMessage = err.response?.data?.error?.message || err.response?.data?.message || "Không thể nhận diện bàn. Vui lòng thử lại.";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    initSession();
  }, [urlTableId, setTableInfo]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
          <p className="text-gray-500 font-medium">Đang nhận diện bàn...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-6">
        <div className="flex flex-col items-center text-center gap-6 max-w-xs">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Lỗi truy cập</h3>
            <p className="text-gray-500">{error}</p>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-text max-w-md mx-auto shadow-xl relative">
      <Outlet />
    </div>
  );
};

export default TableLayout;

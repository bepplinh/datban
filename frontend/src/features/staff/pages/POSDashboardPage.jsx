import { useTables, useOpenTable } from "../hooks/useTableOrders";
import TableCard from "../components/TableCard";
import { RefreshCw } from "lucide-react";

export default function POSDashboardPage() {
  const { tables, isLoading, isRefreshing, refetch } = useTables();
  const openTableMutation = useOpenTable();

  const handleOpenTable = (tableId, tableName) => {
    openTableMutation.mutate({ tableId, tableName });
  };

  if (isLoading) {
    return <div className="p-6 text-center text-gray-500">Đang tải sơ đồ bàn...</div>;
  }

  const occupiedCount = tables.filter(t => t.status === "OCCUPIED").length;

  return (
    <div className="p-4 md:p-6 w-full max-w-7xl mx-auto">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: "Playfair Display SC" }}>
            Tính Tiền & Quản Lý
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex gap-2 mr-2">
            <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 cursor-pointer transition-all duration-200">
              Tất cả
            </button>
            <button className="px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-lg text-sm font-medium cursor-pointer transition-all duration-200">
              Có khách ({occupiedCount})
            </button>
          </div>

          <button
            onClick={() => refetch()}
            disabled={isRefreshing}
            className="p-2 bg-white border border-gray-200 rounded-lg shadow-sm text-primary hover:bg-gray-50 transition-all disabled:opacity-50"
            title="Làm mới danh sách"
          >
            <RefreshCw className={`w-5 h-5 ${isRefreshing ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
        {tables.map((table) => (
          <TableCard
            key={table.id}
            table={table}
            onOpenTable={handleOpenTable}
          />
        ))}
      </div>
    </div>
  );
}

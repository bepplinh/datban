import { Link } from "react-router-dom";
import { Bell, HandCoins, PlusCircle } from "lucide-react";
import { formatCurrency } from "@/shared/utils/format";

/**
 * Individual table card for the POS dashboard grid.
 */
const TableCard = ({ table, onOpenTable }) => {
  const isOccupied = table.status === "OCCUPIED";
  const isReady = table.orderStatus === "READY";
  const isPending = table.orderStatus === "PENDING";

  const CardComponent = isOccupied ? Link : "div";
  const cardProps = isOccupied
    ? { to: `/staff/tables/${table.id}` }
    : { onClick: () => onOpenTable(table.id, table.name) };

  return (
    <CardComponent
      {...cardProps}
      className={`
        relative p-4 rounded-xl cursor-pointer transition-all duration-200 group flex flex-col h-32
        ${isOccupied
          ? "bg-white shadow-[0_4px_6px_rgba(0,0,0,0.1)] border-2 border-transparent hover:-translate-y-1 hover:shadow-[0_10px_15px_rgba(0,0,0,0.1)]"
          : "bg-gray-100 border-2 border-dashed border-gray-300 hover:border-primary hover:bg-primary/5 hover:-translate-y-1"}
        ${isReady ? "border-primary! shadow-md" : ""}
        ${isPending ? "border-[#ca8a04]! shadow-md" : ""}
      `}
    >
      <div className="flex justify-between items-start mb-auto">
        <span className={`font-bold text-lg ${isOccupied ? "text-text" : "text-gray-500 group-hover:text-primary"}`}>
          {table.name}
        </span>
        <div className="flex gap-1 items-center">
          {table.hasCall && (
            <div className="w-6 h-6 bg-[#ca8a04] text-white rounded-full flex items-center justify-center animate-bounce shadow-sm">
              <Bell className="w-3.5 h-3.5" />
            </div>
          )}
          {table.hasPaymentRequest && (
            <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center animate-pulse shadow-sm">
              <HandCoins className="w-3.5 h-3.5" />
            </div>
          )}
          {isOccupied && table.sessionTime && (
            <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-gray-100 text-gray-600">
              {table.sessionTime}
            </span>
          )}
        </div>
      </div>

      {isOccupied ? (
        <div className="mt-auto pt-2 border-t border-gray-100 flex flex-col">
          {isReady && <span className="text-xs font-bold text-primary mb-1">Món Đã Xong!</span>}
          {isPending && <span className="text-xs font-bold text-[#ca8a04] mb-1">Đơn Mới!</span>}
          <span className="font-semibold text-gray-900">
            {formatCurrency(table.total)}
          </span>
        </div>
      ) : (
        <div className="mt-auto text-center flex items-center justify-center gap-1 text-gray-400 group-hover:text-primary">
          <PlusCircle className="w-4 h-4" />
          <span className="text-xs font-semibold">Mở Bàn</span>
        </div>
      )}
    </CardComponent>
  );
};

export default TableCard;

import { ChevronLeft } from "lucide-react";
import { useTableStore } from "../../../table-session/store/useTableStore";
import { useNavigate } from "react-router-dom";

function Header() {
    const { tableName, orderId, tableId } = useTableStore();
    const navigate = useNavigate();
    const displayOrderId = orderId ? orderId.slice(-6).toUpperCase() : "...";

    return (
        <header className="flex items-center gap-3 w-full px-6 py-3 shrink-0 sticky top-0 bg-white z-10 shadow-sm">
            <button 
                onClick={() => navigate(`/staff/tables/${tableId || ""}`)}
                className="p-1 -ml-1 hover:bg-teal-50 rounded-full transition-colors"
                type="button"
            >
                <ChevronLeft className="text-[#0D9488]" size={24}/>
            </button>
            <div className="flex flex-col">
                <h1 className="text-lg font-bold text-[#1a1b22] leading-tight">{tableName || "Chi tiết"}</h1>
                <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Đơn hàng #{displayOrderId}</p>
            </div>
        </header>
    );
}

export default Header;
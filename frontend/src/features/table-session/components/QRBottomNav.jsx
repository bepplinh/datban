import { Home, ArrowLeft, Plus, Layers, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { useTableStore } from "@/features/table-session/store/useTableStore";

const QRBottomNav = () => {
  const tableId = useTableStore((state) => state.tableId);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center max-w-md mx-auto z-30">
      <Link to={`/table/${tableId}`}>
        <Home size={22} className="text-primary cursor-pointer hover:text-primary/80 transition-colors" />
      </Link>
      <ArrowLeft size={22} className="text-gray-400 cursor-pointer hover:text-text transition-colors" />
      <div className="bg-gray-100 p-2 rounded-xl cursor-pointer hover:bg-gray-200 transition-colors">
        <Plus size={24} className="text-text" />
      </div>
      <Layers size={22} className="text-gray-400 cursor-pointer hover:text-text transition-colors" />
      <MoreHorizontal size={22} className="text-gray-400 cursor-pointer hover:text-text transition-colors" />
    </nav>
  );
};

export default QRBottomNav;

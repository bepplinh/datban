import { ChevronLeft, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SubPageHeader = ({ title, backTo, rightAction }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-white shrink-0 px-4 flex items-center justify-between border-b border-gray-100 shadow-sm sticky top-0 md:top-0 z-10 h-14">
      <div className="z-20">
        <button
          onClick={() => (backTo ? navigate(backTo) : navigate(-1))}
          className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h2 className="font-bold text-[17px] text-text mx-12 text-center line-clamp-1">{title}</h2>
      </div>

      <div className="z-20">
        {rightAction || <div className="w-10" />}
      </div>
    </header>
  );
};

export const RefreshButton = ({ onClick, isRefreshing }) => (
  <button
    onClick={onClick}
    disabled={isRefreshing}
    className="p-2 -mr-2 rounded-full hover:bg-gray-100 transition-colors text-primary disabled:opacity-50 flex items-center justify-center font-bold"
  >
    <RefreshCw className={`w-6 h-6 ${isRefreshing ? "animate-spin" : ""}`} />
  </button>
);

export default SubPageHeader;

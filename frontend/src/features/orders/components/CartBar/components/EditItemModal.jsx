import { ChevronLeft, FileText, Plus, Minus } from "lucide-react";
import { useCartStore } from "@/features/orders/store/useCartStore";
import { useState } from "react";

function EditItemModal({ item, onClose }) {
  const [quantity, setQuantity] = useState(item.quantity);
  const [note, setNote] = useState(item.note || "");
  const setItemQuantity = useCartStore((state) => state.setItemQuantity);
  const setItemNote = useCartStore((state) => state.setItemNote);

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleUpdate = () => {
    setItemQuantity(item.id, quantity);
    setItemNote(item.id, note);
    onClose();
  };

  return (
    <div className="w-full h-full bg-white flex flex-col relative animate-in slide-in-from-bottom duration-300 rounded-t-3xl overflow-hidden mt-6 shadow-2xl">
      {/* Floating Back Button */}
      <button
        onClick={onClose}
        className="absolute top-4 left-4 z-20 w-8 h-8 bg-white/90 backdrop-blur rounded-[8px] flex items-center justify-center shadow-sm text-gray-800"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Hero Image */}
      <div className="w-full h-[40vh] bg-gray-100 relative shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Curved Grey Title Bar over image bottom */}
      <div className="w-full bg-[#B0A69D] rounded-t-[24px] py-2 px-4 -mt-6 z-10 relative flex items-center justify-center">
        <h2 className="text-white text-[16px] font-medium leading-normal text-center w-full">
          {item.name}
        </h2>
      </div>

      {/* White Body taking up rest of space */}
      <div className="flex-1 bg-white pt-6 px-4 z-10 relative overflow-y-auto">
        <div className="bg-[#f8f8f8] rounded-[12px] p-3 flex items-start gap-3">
          <FileText size={18} className="text-gray-400 shrink-0 mt-0.5" />
          <textarea
            className="bg-transparent border-none outline-none w-full text-[14px] text-gray-700 placeholder-gray-400 resize-none min-h-[60px]"
            placeholder="Bạn có nhắn gì với nhà hàng không?"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="bg-white px-4 py-3 shadow-[0_-4px_15px_rgba(0,0,0,0.04)] border-t border-gray-50 flex items-center gap-4 shrink-0 pb-safe">
        {/* Quantity Control */}
        <div className="flex items-center justify-between border border-gray-200 bg-white rounded-[8px] shrink-0 w-[110px] h-[48px] overflow-hidden">
          <button
            className="w-10 h-full flex items-center justify-center text-gray-500 text-lg hover:bg-gray-50 transition-colors"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Minus size={16} />
          </button>
          <span className="text-[15px] font-bold text-gray-800 w-8 text-center">
            {quantity}
          </span>
          <button
            className="w-10 h-full flex items-center justify-center text-[#f28627] text-lg bg-[#fff8ef] hover:bg-[#ffeedb] transition-colors"
            onClick={() => setQuantity(quantity + 1)}
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Update Button */}
        <button
          className="flex-1 bg-[#f28627] text-white font-medium h-[48px] rounded-[8px] flex flex-col items-center justify-center leading-tight active:scale-[0.98] transition-transform shadow-md hover:bg-[#e4761b]"
          onClick={handleUpdate}
        >
          <span className="text-[15px]">Cập nhật</span>
          <span className="text-[12px] font-normal opacity-90">
            ({formatPrice(item.price * quantity)})
          </span>
        </button>
      </div>
    </div>
  );
}

export default EditItemModal;

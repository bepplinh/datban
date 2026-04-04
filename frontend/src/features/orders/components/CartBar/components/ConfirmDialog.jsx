

function ConfirmDialog({ title, message, onConfirm, onCancel, confirmText = "Xác nhận", cancelText = "Hủy" }) {
  return (
    <div className="fixed inset-0 z-[11000] flex items-center justify-center px-6">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onCancel}
      ></div>
      
      <div className="bg-white rounded-[20px] w-full max-w-[320px] relative z-10 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="p-6 text-center">
          <h3 className="text-[18px] font-bold text-gray-900 mb-2">
            {title}
          </h3>
          <p className="text-[14px] text-gray-500 leading-relaxed">
            {message}
          </p>
        </div>
        
        <div className="flex border-t border-gray-100 h-12">
          <button 
            onClick={onCancel}
            className="flex-1 text-[15px] font-medium text-gray-400 border-r border-gray-100 active:bg-gray-50 transition-colors"
          >
            {cancelText}
          </button>
          <button 
            onClick={onConfirm}
            className="flex-1 text-[15px] font-bold text-red-500 active:bg-gray-50 transition-colors"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;

import { Upload } from 'antd';
import { ImagePlus, X } from 'lucide-react';

const ProductImageUpload = ({ preview, onFileSelect, onClear }) => {
  return (
    <div className="relative">
      {preview ? (
        <div className="relative group rounded-xl overflow-hidden border border-slate-200 shadow-sm h-[96px]">
          <img
            src={preview}
            alt="preview"
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={onClear}
            className="absolute top-1.5 right-1.5 bg-white/90 hover:bg-red-50 text-slate-500 hover:text-red-500 rounded-full p-1 shadow transition-all opacity-0 group-hover:opacity-100"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <Upload
          accept="image/*"
          showUploadList={false}
          beforeUpload={(file) => {
            onFileSelect(file, URL.createObjectURL(file));
            return false;
          }}
        >
          <button
            type="button"
            className="w-full h-[96px] rounded-xl border-2 border-dashed border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/50 flex flex-col items-center justify-center gap-1.5 text-slate-400 hover:text-indigo-500 transition-all cursor-pointer"
          >
            <ImagePlus size={22} />
            <span className="text-xs font-medium">Chọn hoặc kéo thả ảnh</span>
          </button>
        </Upload>
      )}
    </div>
  );
};

export default ProductImageUpload;

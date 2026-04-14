import React from "react";
import { formatCurrency } from "@/shared/utils/format";
import { motion } from "framer-motion";

const ProductCard = ({ product, API_BASE_URL }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.3 }}
    className="card group flex flex-col p-4 bg-white hover:shadow-2xl"
  >
    {/* Image */}
    <div className="relative overflow-hidden rounded-xl mb-4 aspect-[4/3] bg-gray-100">
      {product.image ? (
        <img
          src={product.image.startsWith('http') ? product.image : `${API_BASE_URL}${product.image}`}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200">
           <span className="text-gray-300 font-bold text-xs uppercase tracking-widest">Không có ảnh</span>
        </div>
      )}
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <button className="bg-white text-text px-4 py-2 rounded-full font-bold text-xs shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
          Xem nhanh
        </button>
      </div>
    </div>

    {/* Info */}
    <div className="flex flex-col flex-grow">
      <div className="mb-2">
        <span className="text-[10px] font-black uppercase tracking-widest text-secondary block mb-1 px-2 py-0.5 bg-secondary/5 rounded-full w-fit">
          {product.categoryName}
        </span>
        <h3 className="text-lg font-bold text-text leading-tight group-hover:text-primary transition-colors line-clamp-1">
          {product.name}
        </h3>
      </div>

      <p className="text-sm text-text/60 line-clamp-2 mb-4 h-10 leading-relaxed">
        {product.description || "Không có mô tả cho món ăn tinh tế này."}
      </p>

      {/* Price & Action */}
      <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
        <span className="text-xl font-black text-cta font-lexend">
          {formatCurrency(product.price)}
        </span>
        <button className="w-10 h-10 bg-background text-primary rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm border border-gray-100 group/btn">
           <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>
  </motion.div>
);

export default ProductCard;

import React from "react";
import ProductCard from "./ProductCard";
import { Search } from "lucide-react";
import { AnimatePresence } from "framer-motion";

const ProductGrid = ({ products, API_BASE_URL, onReset }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-gray-50 max-w-2xl mx-auto">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <Search className="w-8 h-8 text-gray-200" />
        </div>
        <h3 className="text-2xl text-text mb-3">Không tìm thấy món nào phù hợp</h3>
        <p className="text-text/50 mb-8 max-w-xs mx-auto">
          Chúng tôi không tìm thấy kết quả nào. Hãy thử đổi từ khóa hoặc bộ lọc.
        </p>
        <button onClick={onReset} className="btn-secondary">
          Đặt lại bộ lọc
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      <AnimatePresence mode="popLayout">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} API_BASE_URL={API_BASE_URL} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ProductGrid;

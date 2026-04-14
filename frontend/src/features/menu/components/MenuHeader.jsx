import React from "react";
import { motion } from "framer-motion";

const MenuHeader = () => (
  <motion.div 
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="text-center mb-16"
  >
    <h1 className="mb-4">Thực đơn của chúng tôi</h1>
    <div className="w-24 h-1 bg-cta mx-auto rounded-full mb-6"></div>
    <p className="text-text/80 text-lg max-w-2xl mx-auto">
      Khám phá bản giao hưởng hương vị được chế tác từ những nguyên liệu tốt nhất. 
      Sử dụng bộ lọc để tìm món ăn hoàn hảo cho bạn.
    </p>
  </motion.div>
);

export default MenuHeader;

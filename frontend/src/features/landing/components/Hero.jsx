import React from "react";
import heroImg from "@/assets/hero-food.png";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-8 max-w-[1200px] grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 order-2 md:order-1 text-center md:text-left"
        >
          <h1 className="mb-6 font-bold text-[2.5rem] md:text-[3.5rem] leading-tight text-primary">
            Thưởng thức Đam mê trong từng Miếng ăn
          </h1>
          <p className="text-xl leading-relaxed mb-8 text-text max-w-lg mx-auto md:mx-0">
            Trải nghiệm đỉnh cao ẩm thực với nguyên liệu địa phương, cách trình bày tinh tế và không gian ấm cúng như ở nhà.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a href="#reservation" className="btn-primary">
              Đặt bàn ngay
            </a>
            <a href="#menu" className="btn-secondary">
              Xem thực đơn
            </a>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="relative z-0 order-1 md:order-2 mb-8 md:mb-0"
        >
          <img
            src={heroImg}
            alt="Appetizing dinner dish"
            className="relative z-10 w-full aspect-4/3 object-cover rounded-2xl shadow-2xl transition-transform duration-300 hover:scale-[1.02]"
          />
          <div className="absolute -top-5 -right-5 w-full h-full glass-panel rounded-3xl z-0 rotate-3"></div>
        </motion.div>
      </div>
    </section>
  );
}

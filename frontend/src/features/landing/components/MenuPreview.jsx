import React from "react";
import steakImg from "@/assets/menu-steak.png";
import pastaImg from "@/assets/menu-pasta.png";
import { motion } from "framer-motion";
import { ImageOff } from "lucide-react";
import { Link } from "react-router-dom";

export default function MenuPreview() {
const menuItems = [
    {
      name: "Bò bít tết Nướng Thượng hạng",
      description:
        "Miếng thịt bò thượng hạng dùng kèm sốt đặc biệt, măng tây và khoai tây nghiền tỏi.",
      price: "1.150.000đ",
      img: steakImg,
    },
    {
      name: "Mì Ý Nấm Truffle Tuyệt hảo",
      description:
        "Mì Ý thủ công trộn trong sốt kem truffle béo ngậy với phô mai parmesan.",
      price: "720.000đ",
      img: pastaImg,
    },
    {
      name: "Súp Nóng theo Mùa",
      description:
        "Sự kết hợp ấm lòng của các loại rau củ mùa thu nướng cùng thảo mộc thơm.",
      price: "350.000đ",
      img: null,
    },
  ];

  return (
    <section id="menu" className="section bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-2">Thực đơn Đặc sắc</h2>
          <p className="text-primary font-medium text-lg">
            Một chút hương vị đang chờ đón bạn
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {menuItems.map((item, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="card" 
              key={idx}
            >
              {item.img ? (
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              ) : (
                <div className="w-full h-48 bg-gray-100 flex flex-col items-center justify-center rounded-lg mb-4 text-gray-400">
                  <ImageOff className="w-10 h-10 mb-2 opacity-30" />
                  <span className="text-sm font-medium">Hình ảnh đang cập nhật</span>
                </div>
              )}
              <div className="flex justify-between items-center mb-2">
                <h3 className="m-0 text-xl font-bold">{item.name}</h3>
                <span className="font-bold text-cta text-lg">{item.price}</span>
              </div>
              <p className="text-text/80 leading-relaxed text-base">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/menu" className="btn-secondary inline-block">Xem toàn bộ thực đơn</Link>
        </div>
      </div>
    </section>
  );
}

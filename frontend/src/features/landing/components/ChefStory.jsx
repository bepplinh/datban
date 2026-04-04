import React from "react";
import chefImg from "@/assets/chef.png";

export default function ChefStory() {
  return (
    <section id="chef" className="section bg-background">
      <div className="container mx-auto px-4 md:px-8 max-w-[1200px] grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-16">
        <div className="relative p-4 md:p-8">
          <img
            src={chefImg}
            alt="Our Executive Chef"
            className="relative z-10 w-full rounded-lg shadow-xl aspect-3/4 object-cover"
          />
          <div className="absolute top-0 left-0 w-[90%] h-[90%] border-4 border-cta rounded-lg z-0"></div>
        </div>
        <div className="md:pl-16 mt-8 md:mt-0">
          <h2 className="mb-6">Gặp gỡ Bậc thầy</h2>
          <p className="text-lg leading-relaxed mb-6 text-text text-opacity-90">
            Trong hơn hai thập kỷ, Đầu bếp Marco đã tinh thông nghệ thuật kết hợp
            các món ăn gia đình ấm cúng với cách trình bày hiện đại, tinh tế.
          </p>
          <p className="text-lg leading-relaxed mb-6 text-text text-opacity-90">
            Triết lý của ông rất đơn giản: những bữa ăn ngon nhất là những bữa ăn
            khiến bạn cảm thấy như đang ở nhà, được nâng tầm bởi những nguyên liệu
            truyền cảm hứng và khơi gợi niềm vui. Mỗi món ăn là một câu chuyện,
            và mỗi hương vị đều được chế tác bằng cả đam mê.
          </p>
          <div className="font-outfit text-4xl text-primary opacity-80 mt-8">
            Marco
          </div>
        </div>
      </div>
    </section>
  );
}

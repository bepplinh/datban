import React from "react";

export default function Testimonials() {
  const reviews = [
    {
      name: "Lan Anh",
      title: "Nhà phê bình ẩm thực",
      review:
        "Không gian ở đây thực sự tuyệt vời. Sự kết hợp giữa thiết kế sang trọng và môi trường sôi động khiến bạn cảm thấy như đang dùng bữa tại một nhà hàng đẳng cấp thế giới.",
      stars: 5,
    },
    {
      name: "Minh Tuấn",
      title: "Hướng dẫn viên địa phương",
      review:
        "Tôi đã đưa gia đình đến đây nhiều lần và mỗi lần đều rất tuyệt vời. Thực đơn mới rất tinh tế, và dịch vụ khiến bạn cảm thấy hoàn toàn thoải mái như ở nhà.",
      stars: 5,
    },
    {
      name: "Thu Hương",
      title: "Khách hàng thân thiết",
      review:
        "Một viên ngọc quý! Mì Ý sốt truffle thực sự xuất sắc, và quy trình đặt bàn rất thuận tiện. Rất khuyến khích đặt trước vì chỗ ngồi thường hết rất nhanh.",
      stars: 5,
    },
  ];

  return (
    <section id="testimonials" className="section bg-secondary text-white">
      <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">
        <div className="text-center mb-16">
          <h2 className="text-white mb-2">Khách hàng nói gì về chúng tôi</h2>
          <p className="opacity-90 text-lg">
            Lắng nghe chia sẻ từ những người đã trải nghiệm niềm đam mê của chúng tôi.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {reviews.map((item, idx) => (
            <div
              className="bg-card-bg text-text rounded-xl p-8 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col h-full"
              key={idx}
            >
              <div className="text-[#FCD34D] text-xl mb-4">
                {"★".repeat(item.stars)}
              </div>
              <p className="italic mb-6 flex-1 leading-relaxed text-base">
                "{item.review}"
              </p>
              <div>
                <h4 className="m-0 font-bold text-base text-primary mb-1">
                  {item.name}
                </h4>
                <span className="text-sm opacity-70 block">{item.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from "react";

export default function ReservationSystem() {
  return (
    <section id="reservation" className="section bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h2 className="mb-6">Đặt bàn của bạn</h2>
            <p className="mb-8 text-lg leading-relaxed text-text/90">
              Đặt chỗ ngay để có một trải nghiệm ẩm thực khó quên. Dù là một bữa tối lãng mạn hay buổi họp mặt gia đình, không gian ấm cúng của chúng tôi luôn chào đón bạn.
            </p>
            <div className="flex flex-wrap gap-8 lg:gap-12">
              <div>
                <h4 className="m-0 mb-2 font-bold text-lg text-primary">
                  Giờ mở cửa
                </h4>
                <p className="text-text m-0">Thứ 2 - Chủ nhật: 17:00 - 23:00</p>
              </div>
              <div>
                <h4 className="m-0 mb-2 font-bold text-lg text-primary">
                  Liên hệ
                </h4>
                <p className="text-text m-0">
                  +84 (024) 123-4567
                  <br />
                  xincha@nhahangamap.com
                </p>
              </div>
            </div>
          </div>
          <div className="bg-background rounded-2xl p-8 shadow-lg">
            <h3 className="mt-0 mb-6 text-2xl font-bold text-primary">
              Nội dung đặt bàn
            </h3>
            <form className="flex flex-col gap-5">
              <div>
                <label className="input-label">Họ và tên</label>
                <input type="text" className="input" placeholder="Nguyễn Văn A" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="input-label">Ngày</label>
                  <input type="date" className="input" />
                </div>
                <div>
                  <label className="input-label">Giờ</label>
                  <input type="time" className="input" />
                </div>
              </div>
              <div>
                <label className="input-label">Số người</label>
                <select className="input appearance-none bg-white">
                  <option>2 người</option>
                  <option>3 người</option>
                  <option>4 người</option>
                  <option>5+ người</option>
                </select>
              </div>
              <button type="button" className="btn-primary w-full mt-2">
                Xác nhận Đặt bàn
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

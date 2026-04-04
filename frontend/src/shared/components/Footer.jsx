import React from "react";

export default function Footer() {
  return (
    <footer className="bg-text text-white pt-16 md:pt-24 pb-8">
      <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 mb-16 text-center md:text-left">
          <div>
            <h2 className="text-secondary mb-4 text-3xl">
              Nhà hàng Ấm Áp
            </h2>
            <p className="opacity-80 leading-relaxed m-0">
              Mang đến cho bạn một trải nghiệm ẩm thực khó quên với sự đam mê,
              nguyên liệu địa phương và dịch vụ đẳng cấp thế giới.
            </p>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-white mb-6 text-xl">Liên kết nhanh</h3>
            <ul className="list-none p-0 m-0 flex flex-col gap-3 w-full items-center md:items-start">
              <li>
                <a
                  href="#menu"
                  className="opacity-80 hover:opacity-100 transition-opacity text-white no-underline"
                >
                  Thực đơn
                </a>
              </li>
              <li>
                <a
                  href="#chef"
                  className="opacity-80 hover:opacity-100 transition-opacity text-white no-underline"
                >
                  Về Đầu bếp
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="opacity-80 hover:opacity-100 transition-opacity text-white no-underline"
                >
                  Đánh giá
                </a>
              </li>
              <li>
                <a
                  href="#reservation"
                  className="opacity-80 hover:opacity-100 transition-opacity text-white no-underline"
                >
                  Đặt bàn ngay
                </a>
              </li>
              <li>
                <a
                  href="#location"
                  className="opacity-80 hover:opacity-100 transition-opacity text-white no-underline"
                >
                  Vị trí & Giờ mở cửa
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white mb-6 text-xl">Bản tin</h3>
            <p className="opacity-80 mb-6 m-0">
              Đăng ký để nhận các ưu đãi đặc biệt và thông tin mới nhất.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-3 w-full"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Địa chỉ email của bạn"
                className="px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:border-white/40 flex-1 transition-colors"
                required
              />
              <button
                type="submit"
                className="bg-primary hover:bg-secondary text-white px-6 py-3 rounded-lg font-semibold transition-colors border-none cursor-pointer"
              >
                Đăng ký
              </button>
            </form>
          </div>
        </div>
        <div className="text-center pt-8 border-t border-white/10">
          <p className="opacity-60 text-sm m-0">
            © 2026 Nhà hàng Ấm Áp. Bản quyền được bảo hộ.
          </p>
        </div>
      </div>
    </footer>
  );
}

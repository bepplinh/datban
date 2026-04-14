import React, { useState } from "react";
import api from "@/shared/services/api";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ReservationSystem() {
  const [formData, setFormData] = useState({
    customerName: "",
    phoneNumber: "",
    date: "",
    time: "",
    partySize: 2,
    notes: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "partySize" ? parseInt(value) || 1 : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.phoneNumber || !formData.date || !formData.time) {
      toast.error("Vui lòng điền đầy đủ các thông tin bắt buộc!");
      return;
    }

    setLoading(true);
    try {
      await api.post("/reservations", formData);
      toast.success("Đặt bàn thành công! Chúng tôi sẽ liên hệ sớm để xác nhận.");
      setFormData({
        customerName: "",
        phoneNumber: "",
        date: "",
        time: "",
        partySize: 2,
        notes: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Đã có lỗi xảy ra. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="reservation" className="section bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
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
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="glass-panel bg-white/70 rounded-2xl p-8 shadow-xl"
          >
            <h3 className="mt-0 mb-6 text-2xl font-bold text-primary">
              Nội dung đặt bàn
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="input-label">Họ và tên *</label>
                <input required name="customerName" value={formData.customerName} onChange={handleChange} type="text" className="input" placeholder="Nguyễn Văn A" />
              </div>
              <div>
                <label className="input-label">Số điện thoại *</label>
                <input required name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} type="tel" className="input" placeholder="0912345678" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="input-label">Ngày *</label>
                  <input required name="date" value={formData.date} onChange={handleChange} type="date" className="input" min={new Date().toISOString().split('T')[0]} />
                </div>
                <div>
                  <label className="input-label">Giờ *</label>
                  <input required name="time" value={formData.time} onChange={handleChange} type="time" className="input" />
                </div>
              </div>
              <div>
                <label className="input-label">Số người</label>
                <select name="partySize" value={formData.partySize} onChange={handleChange} className="input appearance-none bg-white">
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} người
                    </option>
                  ))}
                  <option value={15}>Hơn 10 người</option>
                </select>
              </div>
              <div>
                <label className="input-label">Ghi chú thêm</label>
                <textarea name="notes" value={formData.notes} onChange={handleChange} className="input" placeholder="Yêu cầu đặc biệt..." rows={2} />
              </div>
              <button disabled={loading} type="submit" className="btn-primary w-full mt-2 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                {loading ? "Đang xử lý..." : "Xác nhận Đặt bàn"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

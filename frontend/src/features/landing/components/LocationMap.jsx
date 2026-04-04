import React from "react";
import { MapPin, Phone, Clock, ExternalLink } from "lucide-react";

const BRANCHES = [
  {
    id: 1,
    name: "Chi nhánh Hoàn Kiếm",
    address: "Số 123 Đại lộ Ẩm thực, Quận Hoàn Kiếm, Hà Nội",
    phone: "024 123 4567",
    hours: "08:00 - 22:00",
    mapUrl: "https://maps.google.com",
  },
  {
    id: 2,
    name: "Chi nhánh Quận 1",
    address: "Số 456 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh",
    phone: "028 999 8888",
    hours: "08:00 - 23:00",
    mapUrl: "https://maps.google.com",
  },
  {
    id: 3,
    name: "Chi nhánh Hải Châu",
    address: "Số 789 Đường Bạch Đằng, Quận Hải Châu, Đà Nẵng",
    phone: "0236 777 6666",
    hours: "09:00 - 22:00",
    mapUrl: "https://maps.google.com",
  },
];

export default function LocationMap() {
  return (
    <section id="location" className="section bg-background">
      <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">
        <div className="text-center mb-12">
          <h2 className="mb-4">Hệ thống chi nhánh</h2>
          <p className="text-lg text-text max-w-2xl mx-auto">
            Ghé thăm các không gian ẩm thực của chúng tôi tại các thành phố lớn trên cả nước.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BRANCHES.map((branch) => (
            <div key={branch.id} className="card group">
              <div className="flex items-start justify-between mb-6">
                <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <MapPin size={24} />
                </div>
                <a
                  href={branch.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:text-primary transition-colors flex items-center gap-1 text-sm font-semibold"
                >
                  Bản đồ <ExternalLink size={14} />
                </a>
              </div>

              <h3 className="text-xl font-bold mb-4 text-text">{branch.name}</h3>

              <div className="space-y-4 grow">
                <div className="flex gap-3 text-text/80 items-start">
                  <MapPin size={18} className="mt-1 shrink-0 text-primary" />
                  <span className="text-sm leading-relaxed">{branch.address}</span>
                </div>
                <div className="flex gap-3 text-text/80 items-center">
                  <Phone size={18} className="shrink-0 text-primary" />
                  <span className="text-sm font-medium">{branch.phone}</span>
                </div>
                <div className="flex gap-3 text-text/80 items-center">
                  <Clock size={18} className="shrink-0 text-primary" />
                  <span className="text-sm">{branch.hours}</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <button className="w-full btn-secondary text-sm py-2">
                  Đặt bàn tại đây
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

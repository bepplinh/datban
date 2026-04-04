import React from "react";

const QRBanner = () => {
  return (
    <section className="px-4 py-2">
      <div className="relative aspect-21/9 rounded-2xl overflow-hidden shadow-md group cursor-pointer">
        <div className="absolute inset-0 bg-linear-to-r from-green-500/80 to-green-400/80 group-hover:opacity-90 transition-opacity"></div>
        <img 
          src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=1000" 
          alt="Promotion Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 p-4 flex flex-col justify-center">
          <div className="bg-white/90 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded w-fit mb-1">
            GIẢM 10%
          </div>
          <h2 className="text-white text-xl font-black m-0 leading-tight">
            Ưu đãi mang về
          </h2>
        </div>
        <div className="absolute bottom-2 right-4 w-16 h-16 bg-white/20 rounded-full blur-xl"></div>
      </div>
      <div className="flex justify-center gap-1 mt-2">
        <div className="w-4 h-1 bg-primary rounded-full"></div>
        <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
      </div>
    </section>
  );
};

export default QRBanner;

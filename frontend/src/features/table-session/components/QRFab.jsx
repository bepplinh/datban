import React from "react";
import { Megaphone } from "lucide-react";

const QRFab = () => {
  return (
    <button className="fixed bottom-10 right-4 w-12 h-12 bg-[#fff8e6] rounded-full flex items-center justify-center shadow-lg border border-orange-100 hover:scale-110 transition-transform cursor-pointer z-20">
      <Megaphone className="text-orange-500" size={24} />
    </button>
  );
};

export default QRFab;

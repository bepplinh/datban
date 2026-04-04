import React, { useState, useEffect } from 'react';
import { Clock, Bell, Info } from 'lucide-react';

const KDSHeader = ({ shiftName, totalPending, isConnected }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-16 px-6 bg-white border-b border-gray-200 flex items-center justify-between shadow-sm sticky top-0 z-20">
      <div className="flex items-center gap-6">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-[#1a1b22] flex items-center gap-2">
            Kitchen Display System
            {!isConnected && (
              <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
            )}
          </h1>
          <span className="text-[12px] text-gray-500 font-medium uppercase tracking-wider">{shiftName}</span>
        </div>
      </div>

      <div className="flex items-center gap-8">
        {/* Status Dashboard */}
        <div className="flex items-center gap-6 pr-6 border-r border-gray-100">
          {!isConnected && (
            <div className="flex items-center gap-2 px-3 py-1 bg-red-50 rounded-full text-red-600 text-xs font-semibold">
              <Info size={14} />
              Mất kết nối
            </div>
          )}
          <div className="flex items-center gap-3">
             <div className="flex flex-col items-end">
                <span className="text-[10px] text-gray-400 font-bold uppercase">Món chờ</span>
                <span className="text-lg font-black text-[#E24B4A]">{totalPending}</span>
             </div>
             <div className="p-2 bg-red-50 rounded-lg text-[#E24B4A]">
                <Bell size={20} />
             </div>
          </div>
        </div>

        {/* Digital Clock */}
        <div className="flex items-center gap-3 text-gray-800">
          <Clock size={20} className="text-gray-400" />
          <div className="flex flex-col items-start leading-none">
            <span className="text-xl font-bold tracking-tight">
              {time.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
            </span>
            <span className="text-[10px] text-gray-400 font-medium">
              {time.toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long' })}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default KDSHeader;

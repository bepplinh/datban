import { ArrowUpRight } from 'lucide-react';

const ProgressCard = () => {
  return (
    <div className="bg-white rounded-4xl p-8 shadow-sm border border-slate-100/60 flex flex-col justify-between group hover:shadow-md transition-shadow">
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold text-slate-500 tracking-wider uppercase">Spent this month</p>
          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl group-hover:scale-110 transition-transform">
            <ArrowUpRight size={20} strokeWidth={3} />
          </div>
        </div>
        <h3 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">$682.5</h3>
        <p className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-lg mt-1">
          +2.45%
        </p>
      </div>
      
      <div className="mt-10">
        <div className="flex justify-between items-end mb-3">
           <span className="text-sm font-bold text-slate-700">On track</span>
           <span className="text-2xl font-extrabold text-indigo-600 tracking-tight">85%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-4 p-1">
          <div className="bg-indigo-600 h-2 rounded-full relative shadow-sm" style={{ width: '85%' }}>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-white border-4 border-indigo-600 rounded-full shadow-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
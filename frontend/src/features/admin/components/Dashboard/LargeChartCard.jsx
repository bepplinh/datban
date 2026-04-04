import { formatCurrency } from "../../../../shared/utils/format";

const LargeChartCard = ({ totalRevenue }) => {
  return (
    <div className="lg:col-span-2 bg-white rounded-4xl p-8 shadow-sm border border-slate-100/60">
      <div className="flex justify-between items-center mb-8">
        <div>
          <p className="text-sm text-slate-500 font-semibold mb-1 uppercase tracking-wider">TỔNG DOANH THU</p>
          <h3 className="text-4xl font-extrabold text-slate-900 tracking-tight">{formatCurrency(totalRevenue)}</h3>
        </div>
        <button className="px-5 py-2.5 bg-slate-50 text-slate-600 text-sm font-bold rounded-2xl hover:bg-slate-100 hover:text-indigo-600 transition-all duration-200">
          This Year
        </button>
      </div>
      
      <div className="relative h-64 w-full flex items-end justify-between gap-3 pt-10">
        {[40, 70, 45, 90, 65, 55, 80, 50, 60].map((h, i) => (
          <div key={i} className="w-full flex flex-col items-center gap-3 group">
            <div className="w-full h-full flex flex-col justify-end">
              <div 
                className="w-full bg-indigo-50 rounded-xl relative group-hover:bg-indigo-400 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all duration-300 ease-out cursor-pointer"
                style={{ height: `${h}%` }}
              >
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-slate-800 text-white text-xs font-bold py-1.5 px-3 rounded-lg whitespace-nowrap transition-all duration-200 shadow-lg translate-y-2 group-hover:-translate-y-1">
                  {formatCurrency(h * 8.5)}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
                </div>
              </div>
            </div>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">
              {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep'][i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LargeChartCard;

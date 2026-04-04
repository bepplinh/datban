const StatCard = ({ title, amount, icon: Icon, bgClass = 'bg-white', textClass = 'text-slate-900', iconBgClass = 'bg-indigo-50', iconColorClass = 'text-indigo-600', subtitle }) => (
  <div className={`${bgClass} rounded-4xl p-6 shadow-sm border border-slate-100/60 flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all duration-300`}>
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className={`text-sm font-medium ${textClass === 'text-white' ? 'text-white/80' : 'text-slate-500'} mb-1`}>{title}</p>
        <h3 className={`text-3xl font-extrabold ${textClass} tracking-tight`}>{amount}</h3>
        {subtitle && <p className="text-sm text-emerald-500 font-semibold mt-1">{subtitle}</p>}
      </div>
      <div className={`p-4 rounded-2xl ${iconBgClass} shadow-sm`}>
        <Icon size={24} className={iconColorClass} strokeWidth={2.5} />
      </div>
    </div>
  </div>
);

export default StatCard;

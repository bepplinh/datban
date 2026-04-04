import { Calendar as CalendarIcon, Clock } from 'lucide-react';

const MeetingsList = () => {
  const meetings = [
    { time: '01:00 PM - 02:00 PM', title: 'Meet w/ Simmmple', type: 'Design', theme: { border: 'border-l-indigo-500 hover:border-indigo-200', bg: 'hover:bg-indigo-50/50', badgeBg: 'bg-indigo-100', badgeText: 'text-indigo-700' } },
    { time: '03:30 PM - 04:30 PM', title: 'Design Review', type: 'Review', theme: { border: 'border-l-emerald-500 hover:border-emerald-200', bg: 'hover:bg-emerald-50/50', badgeBg: 'bg-emerald-100', badgeText: 'text-emerald-700' } },
    { time: '05:00 PM - 05:30 PM', title: 'Daily Sync', type: 'Team', theme: { border: 'border-l-orange-500 hover:border-orange-200', bg: 'hover:bg-orange-50/50', badgeBg: 'bg-orange-100', badgeText: 'text-orange-700' } },
  ];

  return (
    <div className="bg-white rounded-4xl p-8 shadow-sm border border-slate-100/60 flex flex-col h-full">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
          <CalendarIcon size={24} strokeWidth={2.5} />
        </div>
        <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">Meetings</h3>
      </div>
      
      <div className="space-y-4 flex-1">
        {meetings.map((meet, i) => (
          <div key={i} className={`p-4 border border-slate-100 rounded-2xl ${meet.theme.border} ${meet.theme.bg} hover:-translate-y-1 transition-all duration-300 border-l-[6px] shadow-sm cursor-pointer`}>
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-base font-bold text-slate-900">{meet.title}</h4>
              <span className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider ${meet.theme.badgeBg} ${meet.theme.badgeText}`}>
                {meet.type}
              </span>
            </div>
            <p className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold mt-1">
              <Clock size={14} className="text-slate-400" /> {meet.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetingsList;
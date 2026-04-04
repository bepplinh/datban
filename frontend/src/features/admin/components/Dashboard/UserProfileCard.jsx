import { MapPin } from 'lucide-react';

const UserProfileCard = () => {
  return (
    <div className="bg-white rounded-4xl p-8 shadow-sm border border-slate-100/60 flex flex-col items-center justify-center text-center relative overflow-hidden group">
      {/* Decorative background blob */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-indigo-50 rounded-full blur-3xl opacity-50 group-hover:bg-indigo-100 transition-colors duration-500"></div>
      
      <div className="relative z-10">
        <div className="relative mb-5 inline-block">
          <img 
            src="https://i.pravatar.cc/150?img=68" 
            alt="Charles Robbie" 
            className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-xl" 
          />
          <div className="absolute bottom-2 right-2 w-5 h-5 bg-emerald-400 border-[3px] border-white rounded-full shadow-sm"></div>
        </div>
        
        <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">Charles Robbie</h3>
        <p className="flex items-center justify-center gap-1.5 text-sm text-slate-500 font-medium mt-2">
          <MapPin size={16} className="text-indigo-400" /> New York, USA
        </p>
        
        <div className="w-full grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-slate-100/80">
          <div className="hover:-translate-y-1 transition-transform cursor-pointer">
            <p className="text-2xl font-extrabold text-slate-900">76</p>
            <p className="text-xs text-slate-500 font-semibold tracking-wider uppercase mt-1">Following</p>
          </div>
          <div className="hover:-translate-y-1 transition-transform cursor-pointer">
            <p className="text-2xl font-extrabold text-slate-900">643</p>
            <p className="text-xs text-slate-500 font-semibold tracking-wider uppercase mt-1">Followers</p>
          </div>
          <div className="hover:-translate-y-1 transition-transform cursor-pointer">
            <p className="text-2xl font-extrabold text-slate-900">28</p>
            <p className="text-xs text-slate-500 font-semibold tracking-wider uppercase mt-1">Projects</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
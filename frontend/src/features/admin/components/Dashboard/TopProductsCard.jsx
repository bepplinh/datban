import { TrophyIcon } from 'lucide-react';

const RANK_STYLES = [
  { badge: 'bg-yellow-400 text-white', ring: 'ring-yellow-200' },  // 1st
  { badge: 'bg-slate-400 text-white', ring: 'ring-slate-200' },    // 2nd
  { badge: 'bg-amber-600 text-white', ring: 'ring-amber-200' },    // 3rd
  { badge: 'bg-slate-200 text-slate-600', ring: '' },
  { badge: 'bg-slate-200 text-slate-600', ring: '' },
];

const TopProductsCard = ({ data, isLoading }) => {
  const items = data?.data?.slice(0, 5) || [];

  return (
    <div className="bg-white rounded-4xl p-8 shadow-sm border border-slate-100/60 flex flex-col h-full">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-yellow-50 rounded-2xl flex items-center justify-center">
          <TrophyIcon size={20} className="text-yellow-500" />
        </div>
        <h3 className="text-xl font-extrabold text-slate-900">Top 5 Món Bán Chạy</h3>
      </div>

      <div className="space-y-4 flex-1">
        {isLoading ? (
          [...Array(5)].map((_, i) => (
            <div key={i} className="h-14 bg-slate-50 animate-pulse rounded-2xl" />
          ))
        ) : items.length > 0 ? items.map((item, index) => {
          const style = RANK_STYLES[index] || RANK_STYLES[4];
          const maxSold = items[0]?.totalSold || 1;
          const progress = Math.round((item.totalSold / maxSold) * 100);

          return (
            <div key={item.product?.id || index} className="flex items-center gap-4">
              {/* Rank Badge */}
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-extrabold shrink-0 ${style.badge} ${style.ring}`}>
                {index + 1}
              </div>

              {/* Product Image */}
              <div className="w-10 h-10 rounded-xl bg-slate-100 overflow-hidden shrink-0">
                {item.product?.image ? (
                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-500 font-bold text-sm">
                    {item.product?.name?.charAt(0)}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-slate-800 truncate">{item.product?.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full transition-all duration-700"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Count */}
              <span className="text-sm font-extrabold text-indigo-600 shrink-0">{item.totalSold} sold</span>
            </div>
          );
        }) : (
          <p className="text-sm text-slate-400 text-center py-10">Chưa có dữ liệu</p>
        )}
      </div>
    </div>
  );
};

export default TopProductsCard;

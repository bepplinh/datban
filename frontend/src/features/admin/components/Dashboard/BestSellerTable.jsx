import { Skeleton } from "antd";
import { formatCurrency } from "../../../../shared/utils/format";

const BestSellerTable = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-4xl p-8 shadow-sm border border-slate-100/60 lg:col-span-5 h-[400px]">
        <h3 className="text-xl font-bold text-slate-800 mb-6 font-display">Món Bán Chạy Nhất</h3>
        <Skeleton active paragraph={{ rows: 6 }} />
      </div>
    );
  }

  const bestSellers = data?.data || [];

  return (
    <div className="bg-white rounded-4xl p-8 shadow-sm border border-slate-100/60 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-slate-800 font-display">Món Bán Chạy Nhất</h3>
        <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
          Top {bestSellers.length}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {bestSellers.length === 0 ? (
          <div className="flex items-center justify-center h-full text-slate-400">
            Chưa có dữ liệu
          </div>
        ) : (
          <div className="space-y-4">
            {bestSellers.map((item, index) => (
              <div
                key={item.product?.id || index}
                className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-2xl transition-colors duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden shrink-0">
                    {item.product?.image ? (
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold bg-slate-200">
                        {item.product?.name?.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 line-clamp-1">{item.product?.name}</h4>
                    <p className="text-sm text-slate-500 font-medium">Đã bán: {item.totalSold}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-slate-800">
                    {formatCurrency(item.product?.price)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BestSellerTable;

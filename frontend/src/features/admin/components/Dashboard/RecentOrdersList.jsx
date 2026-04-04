import { CheckCircle2, Clock, XCircle } from 'lucide-react';
import { useAdminOrders } from '../../hooks/Order/useAdminOrder';
import { Tag } from 'antd';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../../../shared/utils/format';

const RecentOrdersList = () => {
  const { data: ordersResponse, isLoading } = useAdminOrders({ page: 1, limit: 5 });
  const orders = ordersResponse?.data || [];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'PAID': return <CheckCircle2 size={20} className="text-emerald-500" />;
      case 'CANCELLED': return <XCircle size={20} className="text-red-500" />;
      default: return <Clock size={20} className="text-orange-500" />;
    }
  };

  return (
    <div className="bg-white rounded-4xl p-8 shadow-sm border border-slate-100/60 flex flex-col h-full">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-extrabold text-slate-900">Đơn hàng gần đây</h3>
        <Link to="/admin/orders" className="text-indigo-600 text-sm font-bold hover:text-indigo-700 hover:bg-indigo-50 px-4 py-2 rounded-xl transition-colors">
          Xem tất cả
        </Link>
      </div>
      
      <div className="space-y-3 flex-1 overflow-auto">
        {isLoading ? (
          <div className="flex flex-col gap-3">
             {[1, 2, 3].map(i => <div key={i} className="h-20 bg-slate-50 animate-pulse rounded-2xl" />)}
          </div>
        ) : orders.length > 0 ? (
          orders.map(order => (
            <div key={order.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                  {getStatusIcon(order.status)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Bàn {order.table?.name} - #{order.orderNumber}</h4>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-extrabold text-slate-900">{formatCurrency(order.total)}</p>
                <Tag color={order.status === 'PAID' ? 'green' : 'orange'} className="mr-0 mt-1 rounded-md border-none text-[10px] uppercase font-bold">
                  {order.status}
                </Tag>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 py-10">
             <p className="text-sm">Chưa có đơn hàng nào</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentOrdersList;

import { DollarSign, Users, Activity, CreditCard } from 'lucide-react';
import StatCard from '../components/Dashboard/StatCard';
import LargeChartCard from '../components/Dashboard/LargeChartCard';
import TopProductsCard from '../components/Dashboard/TopProductsCard';
import BestSellerTable from '../components/Dashboard/BestSellerTable';
import RecentOrdersList from '../components/Dashboard/RecentOrdersList';
import { useRevenueStats, useBestSelling, useDashboardSummary } from '../hooks/Dashboard/useDashboardStats';

import { formatCurrency } from '../../../shared/utils/format';

function AdminDashboardPage() {
  const { data: revenueData } = useRevenueStats();
  const { data: bestSellingData, isLoading: isBestSellingLoading } = useBestSelling();
  const { data: summaryResponse } = useDashboardSummary();

  const summary = summaryResponse?.data || {};
  const totalRevenue = revenueData?.data?.totalRevenue || 0;

  return (
    <div className="max-w-[1400px] mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="mb-10 flex justify-between items-center">
        <div>
          <h2 className="text-base font-bold text-slate-500 tracking-wide mb-1">Hi Andrei,</h2>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Welcome to Venus!</h1>
        </div>

        <div>
          <button
          onClick={() => window.location.reload()}
           className="px-4 py-2 bg-indigo-500 text-white rounded-2xl hover:bg-indigo-600 transition-all duration-200">Làm mới</button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Doanh Thu Hôm Nay" 
          amount={`${formatCurrency(summary.revenueToday)}`} 
          icon={DollarSign} 
        />
        <StatCard 
          title="Đơn Hàng Hôm Nay" 
          amount={(summary.ordersToday || 0).toString()} 
          icon={CreditCard} 
          iconBgClass="bg-blue-50"
          iconColorClass="text-blue-600"
        />
        <StatCard 
          title="Bàn Đang Sử Dụng" 
          amount={`${summary.activeTables || 0}/${summary.totalTables || 0}`} 
          icon={Users} 
          iconBgClass="bg-purple-50"
          iconColorClass="text-purple-600"
        />
        <StatCard 
          title="Yêu Cầu Chờ" 
          amount={(summary.pendingRequests || 0).toString()} 
          icon={Activity} 
          bgClass={summary.pendingRequests > 0 
            ? "bg-linear-to-br from-orange-500 to-red-600 shadow-orange-500/20" 
            : "bg-linear-to-br from-indigo-500 to-purple-600 shadow-indigo-500/20"
          }
          textClass="text-white"
          iconBgClass="bg-white/20"
          iconColorClass="text-white"
        />
      </div>

      {/* Charts & Ranking Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <LargeChartCard totalRevenue={totalRevenue} />
        <TopProductsCard data={bestSellingData} isLoading={isBestSellingLoading} />
      </div>

      {/* Bottom Activities Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12">
        <div className="lg:col-span-4">
          <BestSellerTable data={bestSellingData} isLoading={isBestSellingLoading} />
        </div>

        <div className="lg:col-span-8">
          <RecentOrdersList />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
import React, { useState } from 'react';
import KDSHeader from '../components/KDSHeader';
import KDSColumn from '../components/KDSColumn';
import KDSBottomBar from '../components/KDSBottomBar';
import OrderCard from '../components/OrderCard';
import OrderModal from '../components/OrderModal';
import { useKDSOrders, KDS_STATUSES } from '../hooks/useKDSOrders';

const KDSPage = () => {
  const { 
    activeFilter,
    setActiveFilter,
    updateOrderItems, 
    updateOrderItemStatus,
    getOrdersByColumnStatus, 
    pendingCount,
    isConnected,
    isLoading,
    isError 
  } = useKDSOrders();

  const [selectedOrder, setSelectedOrder] = useState(null);

  const columns = [
    { title: 'CHƯA LÀM', status: KDS_STATUSES.PENDING, color: 'text-gray-600' },
    { title: 'ĐANG CHẾ BIẾN', status: KDS_STATUSES.PREPARING, color: 'text-amber-600' },
    { title: 'ĐÃ XONG', status: KDS_STATUSES.READY, color: 'text-teal-600' },
  ];

  if (isLoading) return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
    </div>
  );

  if (isError) return (
    <div className="h-screen flex items-center justify-center bg-gray-50 text-red-500 font-semibold">
      Đã có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-[#fbf8ff] overflow-hidden">
      <KDSHeader 
        shiftName="Ca Sáng (06:00 - 14:00)" 
        totalPending={pendingCount}
        isConnected={isConnected}
      />
      
      <main className="flex-1 flex gap-6 p-6 overflow-hidden">
        {columns.map((col) => {
          const colOrders = getOrdersByColumnStatus(col.status);
          return (
            <div key={col.status} className="flex-1 h-full min-w-[320px]">
              <KDSColumn 
                title={col.title} 
                status={col.status} 
                count={colOrders.length}
                colorClass={col.color}
              >
                {colOrders.map(order => (
                  <OrderCard 
                    key={order.id} 
                    order={order} 
                    onAction={() => setSelectedOrder(order)} 
                  />
                ))}
              </KDSColumn>
            </div>
          );
        })}
      </main>

      <KDSBottomBar 
        activeFilter={activeFilter} 
        onFilterChange={setActiveFilter} 
      />

      <OrderModal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        order={selectedOrder}
        onUpdateItem={updateOrderItemStatus}
      />
    </div>
  );
};

export default KDSPage;

import { useAdminOrders, useAdminOrderDetails } from "../hooks/Order/useAdminOrder";
import OrderTable from "../components/Order/OrderTable";
import OrderDetailsModal from "../components/Order/OrderDetailsModal";
import OrderFilter from "../components/Order/OrderFilter";
import useAdminOrderStore from "../stores/useAdminOrderStore";

const OrderManagement = () => {
  const { filters, setFilters,selectedOrderId, isDetailsVisible, setSelectedOrderId, setIsDetailsVisible } = useAdminOrderStore();

  // Fetch all orders
  const { data: ordersResponse, isLoading: isLoadingOrders } = useAdminOrders({
    page: filters.page,
    limit: filters.limit,
    status: filters.status,
    search: filters.search,
    from: filters.from,
    to: filters.to,
  });

  const orders = ordersResponse?.data || [];
  const total = ordersResponse?.pagination?.total || 0;

  const pagination = {
    page: filters.page,
    limit: filters.limit,
    total,
  };

  const handlePaginationChange = (newPagination) => {
    setFilters(newPagination);
  };

  // Fetch single order details when modal is open
  const { data: orderDetailsData, isFetching: isFetchingDetails } = useAdminOrderDetails(
    selectedOrderId,
    isDetailsVisible
  );

  const handleViewDetails = (orderId) => {
    setSelectedOrderId(orderId);
    setIsDetailsVisible(true);
  };

  const handleCloseModal = () => {
    setIsDetailsVisible(false);
    setSelectedOrderId(null);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Quản lý Đơn Hàng & Hóa Đơn
          </h1>
          <p className="text-slate-500 mt-1">
            Theo dõi tất cả lịch sử giao dịch và đơn đặt món của nhà hàng
          </p>
        </div>
      </div>

      <OrderFilter />

      <OrderTable
        data={orders}
        loading={isLoadingOrders}
        pagination={pagination}
        setPagination={handlePaginationChange}
        onViewDetails={handleViewDetails}
      />

      <OrderDetailsModal
        open={isDetailsVisible}
        onCancel={handleCloseModal}
        orderId={selectedOrderId}
        orderData={orderDetailsData}
        isLoading={isFetchingDetails}
      />
    </div>
  );
};

export default OrderManagement;

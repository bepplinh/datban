import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStaffCartStore, useStaffDraft } from "@/features/staff/store/useStaffCartStore";
import { useTableOrders, useBaoBep, useCloseTable } from "../hooks/useTableOrders";
import SubPageHeader, { RefreshButton } from "../components/SubPageHeader";
import OrderList from "../components/OrderList";
import CheckoutFooter from "../components/CheckoutFooter";
import ConfirmDialog from "@/features/orders/components/CartBar/components/ConfirmDialog";
import useStaffPaymentStore from "../store/useStaffPaymentStore";
import { useTableStore } from "@/features/table-session/store/useTableStore";

export default function TableDetailPage() {
  const { tableId } = useParams();
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const isShowPaymentModal = useStaffPaymentStore(state => state.isShowPaymentModal);

  const clearCart = useStaffCartStore(state => state.clearCart);
  const { items: draftItems, totalAmount: draftTotal } = useStaffDraft(tableId);
  const { orderId, orders, isLoading, isRefreshing, refetch } = useTableOrders(tableId);
  const setOrderId = useTableStore(state => state.setOrderId);
  useEffect(() => {
    if (orderId) {
      setOrderId(orderId)
    }
  }, [orderId])

  const baoBepMutation = useBaoBep(tableId);
  const closeTableMutation = useCloseTable();

  const handleBaoBep = async () => {
    if (draftItems.length === 0) return;
    const payloadItems = draftItems.map(item => ({
      productId: item.id,
      quantity: item.quantity,
    }));
    await baoBepMutation.mutateAsync(payloadItems);
    clearCart(tableId);
  };

  const setTableInfo = useTableStore(state => state.setTableInfo);
  const handleCloseTable = async () => {
    setTableInfo(tableId, "Bàn " + tableId);
    clearCart(tableId);
    setShowConfirm(false);
    navigate("/staff/payment");
  };

  const confirmedTotal = orders.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const finalTotal = confirmedTotal + draftTotal;
  const draftCount = draftItems.reduce((acc, item) => acc + item.quantity, 0);

  if (isLoading) {
    return <div className="p-6 text-center text-gray-500">Đang tải...</div>;
  }

  return (
    <div className="flex flex-col h-full bg-background md:max-w-md md:mx-auto md:border-l md:border-r md:border-gray-200">
      <SubPageHeader
        title="Chi tiết Bàn"
        backTo="/staff/tables"
        rightAction={<RefreshButton onClick={() => refetch()} isRefreshing={isRefreshing} />}
      />

      {/* Tabs */}
      <div className="bg-white px-4 pb-2 pt-2 border-b border-gray-100 shrink-0 flex gap-4">
        <button className="pb-2 text-sm font-semibold border-b-2 border-primary text-primary transition-colors">
          Tất cả món ({draftItems.length + orders.length})
        </button>
      </div>

      <OrderList draftItems={draftItems} orders={orders} />

      <CheckoutFooter
        totalAmount={finalTotal}
        isEstimate={draftItems.length > 0}
        draftCount={draftCount}
        isSubmitting={baoBepMutation.isPending}
        onBaoBep={handleBaoBep}
        onGoiMon={() => navigate(`/staff/tables/${tableId}/menu`)}
        onThanhToan={() => setShowConfirm(true)}
      />

      {showConfirm && (
        <ConfirmDialog
          title="Xác nhận thanh toán"
          message="Bạn có chắc chắn muốn thanh toán và đóng bàn này không? Lưu ý: Mọi món chưa báo bếp sẽ bị xóa."
          onConfirm={handleCloseTable}
          onCancel={() => setShowConfirm(false)}
          confirmText="Xác nhận"
          cancelText="Bỏ qua"
        />
      )}

      {isShowPaymentModal && (
        <StaffPayment />
      )}
    </div>
  );
}

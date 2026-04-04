import { Modal, Table, Tag, Select, Space, Button } from "antd";
import { formatCurrency } from "../../../../shared/utils/format";
import { useUpdateOrderStatus } from "../../hooks/Order/useAdminOrder";

const OrderDetailsModal = ({ open, onCancel, orderId, orderData, isLoading }) => {
  const { mutate: updateStatus, isLoading: isUpdating } = useUpdateOrderStatus();
  const items = orderData?.data?.items || [];
  const orderInfo = orderData?.data;

  const handleStatusChange = (newStatus) => {
    updateStatus({ id: orderId, status: newStatus });
  };

  const columns = [
    {
      title: "Món ăn",
      dataIndex: "product",
      key: "product",
      render: (product) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
            {product?.image ? (
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-bold text-slate-400">
                {product?.name?.charAt(0)}
              </div>
            )}
          </div>
          <span className="font-semibold text-slate-800">{product?.name}</span>
        </div>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
      render: (qty) => <span className="font-bold text-slate-700">{qty}</span>,
    },
    {
      title: "Đơn giá",
      dataIndex: "unitPrice",
      key: "unitPrice",
      align: "right",
      render: (price) => <span className="text-slate-600">{formatCurrency(price)}</span>,
    },
    {
      title: "Thành tiền",
      key: "total",
      align: "right",
      render: (_, record) => (
        <span className="font-bold text-indigo-600 underline decoration-indigo-200 underline-offset-4">
          {formatCurrency(record.quantity * record.unitPrice)}
        </span>
      ),
    },
  ];

  const statusOptions = [
    { value: "PENDING", label: "Chờ xử lý" },
    { value: "SERVED", label: "Đã phục vụ" },
    { value: "PAID", label: "Đã thanh toán" },
    { value: "CANCELLED", label: "Đã hủy" },
  ];

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={
        <div className="flex justify-between items-center border-t border-slate-100 pt-6 mt-4 px-2">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-500">Trạng thái đơn:</span>
            <Select
              value={orderInfo?.status}
              onChange={handleStatusChange}
              options={statusOptions}
              loading={isUpdating}
              disabled={isLoading || isUpdating}
              style={{ width: 160 }}
              className="status-select"
            />
          </div>
          <Button onClick={onCancel} className="bg-slate-50 text-slate-600 border-slate-200 hover:text-slate-800">
            Đóng
          </Button>
        </div>
      }
      width={750}
      centered
      title={
        <div className="border-b border-slate-100 pb-4 mb-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold text-slate-800">
                Chi tiết đơn hàng #{orderInfo?.orderNumber || orderId?.substring(0, 8)}
              </h2>
              {orderInfo && (
                <div className="flex gap-4 mt-2 text-sm text-slate-500">
                  <p>Bàn: <span className="font-semibold text-slate-800">{orderInfo.table?.name || "N/A"}</span></p>
                  <p>&bull;</p>
                  <p>Ngày: <span className="font-semibold text-slate-800">{new Date(orderInfo.createdAt).toLocaleString()}</span></p>
                </div>
              )}
            </div>
            {orderInfo && (
              <Tag color={
                orderInfo.status === "PAID" ? "success" : 
                orderInfo.status === "PENDING" ? "warning" : 
                orderInfo.status === "CANCELLED" ? "error" : "processing"
              } className="px-3 py-1 font-semibold rounded-full m-0 text-sm capitalize">
                {orderInfo.status}
              </Tag>
            )}
          </div>
        </div>
      }
      classNames={{ content: "rounded-2xl p-6 shadow-2xl" }}
    >
      <div className="max-h-[50vh] overflow-y-auto mb-6 scrollbar-thin">
        <Table
          columns={columns}
          dataSource={items}
          rowKey="id"
          loading={isLoading}
          pagination={false}
          className="[&_.ant-table-thead_th]:bg-slate-50 [&_.ant-table-thead_th]:text-slate-500 [&_.ant-table-thead_th]:font-semibold"
        />
      </div>
      
      {orderInfo && (
        <div className="flex justify-end p-4 bg-indigo-50/30 rounded-xl border border-indigo-100/50">
          <div className="w-64 space-y-3">
            <div className="flex justify-between text-slate-500 text-sm">
              <span>Phương thức thanh toán:</span>
              <span className="font-medium text-slate-800">{orderInfo.payment?.method || "Tiền mặt"}</span>
            </div>
            <div className="flex justify-between text-slate-500 text-sm border-b border-indigo-100/30 pb-2">
              <span>Trạng thái thanh toán:</span>
              <Tag color={orderInfo.payment?.status === "SUCCESS" ? "green" : "orange"} className="m-0 border-0 bg-transparent font-bold">
                {orderInfo.payment?.status === "SUCCESS" ? "ĐÃ THANH TOÁN" : "CHỜ THANH TOÁN"}
              </Tag>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="font-bold text-slate-800 uppercase tracking-wider text-xs">Tổng tiền phải trả:</span>
              <span className="text-2xl font-black text-indigo-600">{formatCurrency(orderInfo.total)}</span>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default OrderDetailsModal;

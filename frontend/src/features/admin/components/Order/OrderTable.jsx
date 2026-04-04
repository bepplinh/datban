import { Table, Tag, Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { formatCurrency } from "../../../../shared/utils/format";

const OrderTable = ({ data, loading, pagination, setPagination, onViewDetails }) => {
  const columns = [
    {
      title: "Mã Đơn",
      dataIndex: "orderNumber",
      key: "orderNumber",
      render: (num) => <span className="font-mono font-semibold text-slate-600">#{num}</span>,
    },
    {
      title: "Thời gian",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: "Bàn",
      dataIndex: "table",
      key: "table",
      render: (table) => <span className="font-semibold">{table?.name || "-"}</span>,
    },
    {
      title: "Tổng Tiền",
      dataIndex: "total",
      key: "total",
      align: "right",
      render: (total) => <span className="font-bold text-indigo-600">{formatCurrency(total)}</span>,
    },
    {
      title: "Trạng Thái Đơn",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const statusMap = {
          PAID: { color: "success", text: "Đã Thanh Toán" },
          PENDING: { color: "warning", text: "Chờ Xử Lý" },
          CANCELLED: { color: "error", text: "Đã Hủy" },
          SERVED: { color: "processing", text: "Đã Phục Vụ" },
        };
        const { color, text } = statusMap[status] || { color: "default", text: status };
        return <Tag color={color} className="font-medium mr-0">{text}</Tag>;
      },
    },
    {
      title: "Thanh Toán",
      dataIndex: "payment",
      key: "payment",
      render: (payment) => {
        if (!payment) return <Tag className="m-0">Chưa thanh toán</Tag>;
        return payment.status === "SUCCESS" ? (
          <Tag color="success" className="m-0">Thành công</Tag>
        ) : (
          <Tag color="warning" className="m-0">Đang chờ</Tag>
        );
      },
    },
    {
      title: "Hành động",
      key: "action",
      align: "right",
      render: (_, record) => (
        <Button
          type="text"
          icon={<EyeOutlined />}
          onClick={() => onViewDetails(record.id)}
          className="text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 font-medium"
        >
          Chi tiết
        </Button>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
        pagination={{
          current: pagination.page,
          pageSize: pagination.limit,
          total: pagination.total,
          onChange: (page, pageSize) => setPagination({ page, limit: pageSize }),
          showSizeChanger: true,
          showTotal: (total) => <span className="text-slate-500">Tổng số {total} đơn hàng</span>,
          className: "px-6 py-4",
        }}
        className="[&_.ant-table-thead_th]:bg-slate-50 [&_.ant-table-thead_th]:text-slate-500 [&_.ant-table-thead_th]:font-semibold"
      />
    </div>
  );
};

export default OrderTable;

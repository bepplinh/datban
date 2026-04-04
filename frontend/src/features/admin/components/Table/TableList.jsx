import { Table, Button, Space, Tag, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const TableList = ({ data, loading, onEdit, onDelete }) => {
  const columns = [
    {
      title: "Tên Bàn",
      dataIndex: "name",
      key: "name",
      render: (text) => <span className="font-semibold text-slate-800">{text}</span>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = status === "EMPTY" ? "green" : "volcano";
        let text = status === "EMPTY" ? "Trống" : "Đang dùng";
        return (
          <Tag color={color} className="rounded-md px-2 py-1 font-medium">
            {text}
          </Tag>
        );
      },
      filters: [
        { text: "Trống", value: "EMPTY" },
        { text: "Đang dùng", value: "OCCUPIED" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Mã token",
      dataIndex: "token",
      key: "token",
      render: (token) => <span className="text-slate-500 font-mono text-sm">{token}</span>,
    },
    {
      title: "Hành động",
      key: "action",
      align: "right",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
            className="text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50"
          />
          <Popconfirm
            title="Xóa bàn này?"
            description="Bạn có chắc chắn muốn xóa bàn này không?"
            onConfirm={() => onDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
            okButtonProps={{ danger: true }}
          >
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              className="hover:bg-red-50"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Tổng số ${total} bàn`,
        }}
        className="[&_.ant-table-thead_th]:bg-slate-50 [&_.ant-table-thead_th]:text-slate-500 [&_.ant-table-thead_th]:font-semibold"
      />
    </div>
  );
};

export default TableList;

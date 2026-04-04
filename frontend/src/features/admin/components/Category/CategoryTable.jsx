import { Table, Tag, Space, Button, Popconfirm, Card, message } from 'antd';
import { Edit2, Trash2 } from 'lucide-react';
import useCategory from '../../hooks/Category/useCategory';

const CategoryTable = () => {
  const { filteredCategories, isLoading, showModal, deleteCategory, isDeleting } = useCategory();

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      message.success('Đã xóa danh mục thành công');
    } catch (error) {
      message.error(error.response?.data?.message || 'Không thể xóa danh mục này');
    }
  };

  const columns = [
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span className="font-semibold text-slate-700">{text}</span>,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Số lượng món',
      dataIndex: 'itemCount',
      key: 'itemCount',
      align: 'center',
      render: (count) => <Tag color="blue" className="rounded-full px-3">{count} món</Tag>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'success' : 'error'} className="rounded-full px-3 uppercase text-[10px] font-bold tracking-wider">
          {status === 'active' ? 'Đang kinh doanh' : 'Ngừng kinh doanh'}
        </Tag>
      ),
      filters: [
        { text: 'Đang kinh doanh', value: 'active' },
        { text: 'Ngừng kinh doanh', value: 'inactive' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="text" 
            className="text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg p-1"
            icon={<Edit2 size={16} />} 
            onClick={() => showModal(record)}
          />
          <Popconfirm
            title="Xóa danh mục?"
            description="Bạn có chắc muốn xóa danh mục này? Hành động không thể hoàn tác."
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
            okButtonProps={{ danger: true, className: 'rounded-lg' }}
            cancelButtonProps={{ className: 'rounded-lg' }}
          >
            <Button 
              type="text" 
              danger 
              className="hover:bg-red-50 rounded-lg p-1"
              icon={<Trash2 size={16} />} 
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card className="rounded-2xl border-slate-100 shadow-sm overflow-hidden" bodyStyle={{ padding: 0 }}>
      <Table 
        columns={columns} 
        dataSource={filteredCategories} 
        loading={isLoading || isDeleting}
        rowKey="id"
        pagination={{ 
          pageSize: 10,
          showSizeChanger: true,
          className: 'px-6' 
        }}
        className="category-table"
      />
    </Card>
  );
};

export default CategoryTable;

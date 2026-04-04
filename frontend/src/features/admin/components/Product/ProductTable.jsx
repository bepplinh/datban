import { useState } from 'react';
import { Table, Tag, Space, Button, Popconfirm, Card, message, Image, Typography } from 'antd';
import { Edit2, Trash2 } from 'lucide-react';
import useCategory from '../../hooks/Category/useCategory';
import useProduct from '../../hooks/Product/useProduct';
import useProductQueries from '../../hooks/Product/useProductQueries';
import { formatCurrency } from '../../../../shared/utils/format';

const { Text } = Typography;

const ProductTable = ({ onEdit }) => {
  const [pageSize, setPageSize] = useState(10);
  const deleteProductMutation = useProductQueries.useDeleteProduct();
  const { categories } = useCategory();
  const { products } = useProduct();


  const getCategoryName = (categoryId) => {
    return categories?.find(c => c.id === categoryId)?.name || 'Không xác định';
  };

  const handleDelete = async (id) => {
    try {
      await deleteProductMutation.mutateAsync(id);
      message.success('Đã xóa món ăn thành công');
    } catch (error) {
      console.log(error);
      message.error('Có lỗi xảy ra khi xóa món ăn');
    }
  };

  const columns = [
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'image',
      width: 80,
      render: (img) => (
        <Image 
          src={img} 
          width={48} 
          height={48} 
          className="rounded-lg object-cover border border-slate-100"
          fallback="https://via.placeholder.com/48?text=No+Image"
        />
      ),
    },
    {
      title: 'Tên món',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span className="font-semibold text-slate-800">{text}</span>,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Danh mục',
      dataIndex: 'categoryId',
      key: 'categoryId',
      render: (categoryId) => (
        <Tag color="cyan" className="rounded-full px-3 py-0.5 shadow-sm border-cyan-100">
          {getCategoryName(categoryId)}
        </Tag>
      ),
      filters: categories?.map(c => ({ text: c.name, value: c.id })) || [],
      onFilter: (value, record) => record.categoryId === value,
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      key: 'price',
      align: 'right',
      render: (price) => (
        <Text strong className="text-indigo-600">
          {formatCurrency(price)}
        </Text>
      ),
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'success' : 'default'} className="rounded-full px-3 uppercase text-[10px] font-bold tracking-wider">
          {status === 'active' ? 'Đang phục vụ' : 'Hết món'}
        </Tag>
      ),
      filters: [
        { text: 'Đang phục vụ', value: 'active' },
        { text: 'Hết món', value: 'inactive' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 120,
      align: 'center',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="text" 
            className="text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg p-1 transition-colors"
            icon={<Edit2 size={16} />} 
            onClick={() => onEdit(record)}
          />
          <Popconfirm
            title="Xóa món ăn?"
            description="Bạn có chắc muốn xóa món này? Hành động không thể hoàn tác."
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
            okButtonProps={{ danger: true, className: 'rounded-lg shadow-sm font-medium' }}
            cancelButtonProps={{ className: 'rounded-lg font-medium' }}
          >
            <Button 
              type="text" 
              danger 
              className="hover:bg-red-50 rounded-lg p-1 transition-colors"
              icon={<Trash2 size={16} />} 
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card 
      className="rounded-2xl border-slate-200 shadow-sm overflow-hidden" 
      styles={{ body: { padding: 0 } }}
    >
      <Table 
        columns={columns} 
        dataSource={products} 
        loading={false}
        rowKey="id"
        pagination={{ 
          pageSize: pageSize,
          showSizeChanger: true,
          onShowSizeChange: (current, size) => setPageSize(size),
          className: 'px-6 py-4 border-t border-slate-100 m-0' 
        }}
        className="product-table"
        scroll={{ x: 'max-content' }}
      />
      <style>{`
        .product-table .ant-table-thead > tr > th {
          background-color: #f8fafc !important;
          color: #475569 !important;
          font-weight: 600 !important;
          text-transform: uppercase !important;
          font-size: 12px !important;
          letter-spacing: 0.05em !important;
          padding: 16px !important;
        }
        .product-table .ant-table-tbody > tr > td {
          padding: 12px 16px !important;
          vertical-align: middle;
        }
        .product-table .ant-table-tbody > tr:hover > td {
          background-color: #f1f5f9 !important;
        }
      `}</style>
    </Card>
  );
};

export default ProductTable;

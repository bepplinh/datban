import { Button, Input, Card, Typography } from 'antd';
import { Plus, Search, Filter } from 'lucide-react';
import useCategory from '../../hooks/Category/useCategory';

const { Title, Text } = Typography;

const CategoryToolbar = () => {
  const { searchText, setSearchText, showModal } = useCategory();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Title level={2} style={{ margin: 0, fontWeight: 800, letterSpacing: '-0.025em' }}>
            Quản lý Danh mục
          </Title>
          <Text type="secondary" className="text-slate-500">
            Quản lý các loại món ăn và đồ uống trong thực đơn của bạn
          </Text>
        </div>
        <Button 
          type="primary" 
          size="large"
          icon={<Plus size={18} />}
          onClick={() => showModal()}
          className="bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2 rounded-xl h-11 px-6 shadow-indigo-200 shadow-lg border-none"
        >
          Thêm danh mục
        </Button>
      </div>

      {/* Toolbar */}
      <Card className="rounded-2xl border-slate-100 shadow-sm overflow-hidden" bodyStyle={{ padding: '16px' }}>
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            placeholder="Tìm kiếm danh mục..."
            prefix={<Search size={18} className="text-slate-400 mr-2" />}
            className="rounded-xl h-11 md:max-w-md border-slate-200"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            allowClear
          />
          <Button 
            icon={<Filter size={18} />} 
            className="h-11 rounded-xl flex items-center gap-2 border-slate-200 text-slate-600"
          >
            Lọc nâng cao
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CategoryToolbar;

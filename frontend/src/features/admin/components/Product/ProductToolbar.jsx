import { Input, Button, Card, Select } from 'antd';
import { Search, Plus } from 'lucide-react';
import useCategory from '../../hooks/Category/useCategory';
import useProductStore from '../../stores/useProductStore';

const { Option } = Select;

const ProductToolbar = () => {
  const { categories } = useCategory();
  const { showModal, setSelectedCategory, setSearch, setPriceRange } = useProductStore();

  return (
    <Card 
      className="rounded-2xl border-slate-200 shadow-sm mb-6" 
      styles={{ body: { padding: '20px' } }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Input
            placeholder="Tìm kiếm món ăn..."
            prefix={<Search size={18} className="text-slate-400 mr-2" />}
            className="rounded-xl px-4 py-2 hover:border-indigo-400 focus:border-indigo-500 w-full sm:w-72 shadow-sm"
            allowClear
            onChange={(e) => setSearch(e.target.value)}
          />
          <Select
            defaultValue="all"
            className="w-full sm:w-48 [&>div]:rounded-xl [&>div]:py-1 shadow-sm h-[42px]"
            placeholder="Lọc theo danh mục"
            onChange={(value) => setSelectedCategory(value)}
          >
            <Option value="all">Tất cả danh mục</Option>
            {categories?.map((cat) => (
              <Option key={cat.id} value={cat.id}>{cat.name}</Option>
            ))}
          </Select>
          <Select
            defaultValue="all"
            className="w-full sm:w-44 [&>div]:rounded-xl [&>div]:py-1 shadow-sm h-[42px]"
            placeholder="Mức giá"
            onChange={(value) => setPriceRange(value)}
          >
            <Option value="all">Tất cả mức giá</Option>
            <Option value="under100">Dưới 100,000đ</Option>
            <Option value="100-200">100,000đ - 200,000đ</Option>
            <Option value="over200">Trên 200,000đ</Option>
          </Select>
        </div>
        
        <Button
          type="primary"
          icon={<Plus size={18} className="mr-1" />}
          onClick={() => showModal(null)}
          className="bg-indigo-600 hover:bg-indigo-700 border-none rounded-xl h-[42px] px-6 shadow-md shadow-indigo-200 w-full sm:w-auto font-medium flex-row-reverse"
        >
          Thêm Món Ăn
        </Button>
      </div>

      <style>{`
        .ant-select-selector {
          border-radius: 12px !important;
          height: 42px !important;
          display: flex !important;
          align-items: center !important;
        }
        .ant-select-selection-search-input {
          height: 100% !important;
        }
        .ant-input-affix-wrapper {
          border-radius: 12px !important;
        }
      `}</style>
    </Card>
  );
};

export default ProductToolbar;

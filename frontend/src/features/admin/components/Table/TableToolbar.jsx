import { Button, Input, Select } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";

const { Option } = Select;

const TableToolbar = ({ onAdd, onSearch, onFilterStatus }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
      <div className="flex flex-1 w-full gap-4">
        <Input
          placeholder="Tìm kiếm bàn..."
          prefix={<SearchOutlined className="text-slate-400" />}
          onChange={(e) => onSearch(e.target.value)}
          className="max-w-xs hover:border-indigo-400 focus:border-indigo-500 rounded-lg"
          size="large"
        />
        <Select
          placeholder="Lọc trạng thái"
          onChange={onFilterStatus}
          allowClear
          size="large"
          className="w-40"
        >
           <Option value="EMPTY">Trống</Option>
           <Option value="OCCUPIED">Đang dùng</Option>
        </Select>
      </div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={onAdd}
        size="large"
        className="bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm w-full sm:w-auto"
      >
        Thêm Bàn
      </Button>
    </div>
  );
};

export default TableToolbar;

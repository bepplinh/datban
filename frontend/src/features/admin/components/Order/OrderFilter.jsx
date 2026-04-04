import { Select, Space, Input, DatePicker, Button } from "antd";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";
import useAdminOrderStore from "../../stores/useAdminOrderStore";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

function OrderFilter() {
  const { filters, setFilters, resetFilters } = useAdminOrderStore();

  const handleStatusChange = (value) => {
    setFilters({ status: value });
  };

  const handleSearch = (value) => {
    setFilters({ search: value });
  };

  const handleDateChange = (dates) => {
    if (!dates) {
      setFilters({ from: "", to: "" });
      return;
    }
    setFilters({
      from: dates[0].startOf("day").toISOString(),
      to: dates[1].endOf("day").toISOString(),
    });
  };

  const options = [
    { value: "", label: "Tất cả trạng thái" },
    { value: "PENDING", label: "Chờ xử lý" },
    { value: "SERVED", label: "Đã phục vụ" },
    { value: "PAID", label: "Đã thanh toán" },
    { value: "CANCELLED", label: "Đã hủy" },
  ];

  return (
    <Space wrap size="middle" className="bg-slate-50/50 p-4 rounded-xl border border-slate-100">
      <Input
        placeholder="Tìm mã đơn, số bàn..."
        prefix={<SearchOutlined className="text-slate-400" />}
        defaultValue={filters.search}
        onPressEnter={(e) => handleSearch(e.target.value)}
        onBlur={(e) => handleSearch(e.target.value)}
        style={{ width: 220 }}
        allowClear
      />

      <Select
        placeholder="Trạng thái"
        value={filters.status}
        onChange={handleStatusChange}
        style={{ width: 160 }}
        options={options}
      />

      <RangePicker
        placeholder={["Từ ngày", "Đến ngày"]}
        onChange={handleDateChange}
        value={filters.from && filters.to ? [dayjs(filters.from), dayjs(filters.to)] : null}
        style={{ width: 280 }}
      />

      <Button 
        icon={<ReloadOutlined />} 
        onClick={resetFilters}
        className="flex items-center"
      >
        Làm mới
      </Button>
    </Space>
  );
}

export default OrderFilter;

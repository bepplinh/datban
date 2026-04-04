import { useState, useMemo } from "react";
import { useAdminTables, useCreateTable, useUpdateTable, useDeleteTable } from "../hooks/Table/useTable";
import TableList from "../components/Table/TableList";
import TableToolbar from "../components/Table/TableToolbar";
import TableModal from "../components/Table/TableModal";

const TableManagement = () => {
  const { data: tablesResponse, isLoading } = useAdminTables();
  const { mutate: createTable, isPending: isCreating } = useCreateTable();
  const { mutate: updateTable, isPending: isUpdating } = useUpdateTable();
  const { mutate: deleteTable } = useDeleteTable();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTable, setEditingTable] = useState(null);
  
  // Filtering local state
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState(null);

  const tables = tablesResponse?.data || [];

  const filteredTables = useMemo(() => {
    let result = tables;
    if (searchText) {
      result = result.filter((t) =>
        t.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    if (filterStatus) {
      result = result.filter((t) => t.status === filterStatus);
    }
    return result;
  }, [tables, searchText, filterStatus]);

  const handleAdd = () => {
    setEditingTable(null);
    setIsModalVisible(true);
  };

  const handleEdit = (table) => {
    setEditingTable(table);
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    deleteTable(id);
  };

  const handleSave = (values) => {
    if (editingTable) {
      updateTable(
        { id: editingTable.id, data: values },
        {
          onSuccess: () => setIsModalVisible(false),
        }
      );
    } else {
      createTable(values, {
        onSuccess: () => setIsModalVisible(false),
      });
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
          Quản lý Bàn
        </h1>
        <p className="text-slate-500 mt-1">
          Quản lý danh sách bàn và trạng thái phục vụ trong nhà hàng
        </p>
      </div>

      <TableToolbar
        onAdd={handleAdd}
        onSearch={setSearchText}
        onFilterStatus={setFilterStatus}
      />

      <TableList
        data={filteredTables}
        loading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <TableModal
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onSave={handleSave}
        editingTable={editingTable}
        loading={isCreating || isUpdating}
      />
    </div>
  );
};

export default TableManagement;

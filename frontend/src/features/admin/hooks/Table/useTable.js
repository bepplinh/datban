import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminTableService } from "../../services/adminTable.service";
import { toast } from "sonner";

export const useAdminTables = () => {
  return useQuery({
    queryKey: ["admin-tables"],
    queryFn: adminTableService.getAllTables,
  });
};

export const useCreateTable = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminTableService.createTable,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-tables"] });
      toast.success("Thêm bàn mới thành công!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Lỗi khi thêm bàn mới");
    },
  });
};

export const useUpdateTable = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => adminTableService.updateTable(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-tables"] });
      toast.success("Cập nhật thông tin bàn thành công!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Lỗi khi cập nhật bàn");
    },
  });
};

export const useDeleteTable = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminTableService.deleteTable,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-tables"] });
      toast.success("Xóa bàn thành công!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Lỗi khi xóa bàn");
    },
  });
};

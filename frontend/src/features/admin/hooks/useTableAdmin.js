import { useQuery } from "@tanstack/react-query";
import { adminTableService } from "../services/adminTable.service";

const useTableAdmin = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin", "tables"],
    queryFn: () => adminTableService.getAllTables(),
    staleTime: 30_000,
  });
  return { data, isLoading, error };
};

export { useTableAdmin };

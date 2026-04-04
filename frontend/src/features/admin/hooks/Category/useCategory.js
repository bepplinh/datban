import { useMemo } from "react";
import useCategoryStore from "../../stores/useCategoryStore";
import {
  useGetCategories,
  useAddCategory,
  useUpdateCategory,
  useDeleteCategory,
} from "./useCategoryQueries";

export const useCategory = () => {
  const store = useCategoryStore();
  const { data: response, isLoading, error } = useGetCategories();
  const addMutation = useAddCategory();
  const updateMutation = useUpdateCategory();
  const deleteMutation = useDeleteCategory();

  // Đảm bảo lấy đúng mảng dữ liệu từ response của Axios (tùy thuộc vào backend format)
  const fetchedCategories = Array.isArray(response)
    ? response
    : Array.isArray(response?.data)
      ? response.data
      : Array.isArray(response?.data?.data)
        ? response.data.data
        : [];

  const filteredCategories = useMemo(() => {
    return fetchedCategories.filter(
      (cat) =>
        cat.name?.toLowerCase().includes(store.searchText?.toLowerCase()) ||
        cat.description
          ?.toLowerCase()
          .includes(store.searchText?.toLowerCase()),
    );
  }, [fetchedCategories, store.searchText]);

  return {
    ...store,
    addCategory: addMutation.mutateAsync,
    updateCategory: (id, category) =>
      updateMutation.mutateAsync({ id, category }),
    deleteCategory: deleteMutation.mutateAsync,
    isAdding: addMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    categories: fetchedCategories,
    filteredCategories,
    isLoading,
    error,
  };
};

export default useCategory;

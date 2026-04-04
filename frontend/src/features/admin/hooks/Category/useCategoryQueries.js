import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import categoryService from "../../services/category.service";

export const categoryKeys = {
  all: ["categories"],
};

export const useGetCategories = () => {
  return useQuery({
    queryKey: categoryKeys.all,
    queryFn: () => categoryService.getAllCategories(),
  });
};

export const useAddCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (category) => categoryService.addCategory(category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, category }) =>
      categoryService.updateCategory(id, category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => categoryService.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
    },
  });
};

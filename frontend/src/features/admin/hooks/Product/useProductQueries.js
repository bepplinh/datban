import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import productService from "../../services/product.service";

const useProductQueries = {
  useFetchProducts: () => {
    return useQuery({
      queryKey: ["products"],
      queryFn: () => productService.getAllProducts(),
    });
  },

  useFetchProductById: (id) => {
    return useQuery({
      queryKey: ["products", id],
      queryFn: () => productService.getProductById(id),
      enabled: !!id,
    });
  },

  useAddProduct: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (product) => productService.addProduct(product),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["products"] });
      },
    });
  },

  useUpdateProduct: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (product) => productService.updateProduct(product),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["products"] });
      },
    });
  },

  useDeleteProduct: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (id) => productService.deleteProduct(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["products"] });
      },
    });
  },
};

export default useProductQueries;

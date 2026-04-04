import { useQuery } from "@tanstack/react-query";
import { menuService } from "@/features/menu/services/menu.service";

export const useMenuData = () => {
  return useQuery({
    queryKey: ["menu"],
    queryFn: async () => {
      const result = await menuService.getMenu();
      const categories = result.data || [];

      const allProducts = categories.flatMap((cat) =>
        (cat.products || []).map((p) => ({ ...p, categoryId: cat.id })),
      );

      const maxPossiblePrice =
        allProducts.length > 0
          ? Math.max(...allProducts.map((p) => p.price)) || 100
          : 100;

      return {
        categories,
        allProducts,
        maxPossiblePrice,
      };
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

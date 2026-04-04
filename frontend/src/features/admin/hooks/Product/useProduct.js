import { useMemo } from "react";
import useProductQueries from "./useProductQueries";
import useProductStore from "../../stores/useProductStore";
import useCategory from "../Category/useCategory";

const useProduct = () => {
  const fetchProducts = useProductQueries.useFetchProducts();
  const { categories } = useCategory();

  // Consume store state reactively
  const { search, selectedCategory, priceRange } = useProductStore();

  const filteredProducts = useMemo(() => {
    let rawData = fetchProducts.data;
    if (rawData && !Array.isArray(rawData) && Array.isArray(rawData.data)) {
      rawData = rawData.data;
    }

    if (!Array.isArray(rawData)) return [];

    return rawData.filter((product) => {
      const isMatchSearch = (product.name || "")
        .toLowerCase()
        .includes((search || "").toLowerCase());

      const productCategoryId = categories?.find(
        (c) => c.id === product.categoryId,
      )?.id;

      const isMatchCategory =
        selectedCategory === "all" || productCategoryId === selectedCategory;

      const price = product.price || 0;
      let isMatchPrice = true;
      if (priceRange === "under100") isMatchPrice = price < 100000;
      else if (priceRange === "100-200")
        isMatchPrice = price >= 100000 && price <= 200000;
      else if (priceRange === "over200") isMatchPrice = price > 200000;

      return isMatchCategory && isMatchSearch && isMatchPrice;
    });
  }, [fetchProducts.data, search, selectedCategory, priceRange, categories]);

  return {
    products: filteredProducts,
    isLoading: fetchProducts.isLoading,
    isError: fetchProducts.isError,
  };
};

export default useProduct;

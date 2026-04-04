import { useEffect, useMemo } from "react";
import { useMenuStore } from "@/features/menu/store/useMenuStore";
import { useMenuData } from "./useMenuData";

export const useMenu = () => {
  const {
    data,
    isLoading: loading,
    isError,
    error: fetchError,
  } = useMenuData();

  const {
    searchTerm,
    selectedCategoryId,
    sortOrder,
    priceLimit,
    setSearchTerm,
    setSelectedCategoryId,
    setSortOrder,
    setPriceLimit,
    reset,
  } = useMenuStore();

  const categories = data?.categories || [];
  const allProducts = data?.allProducts || [];
  const maxPossiblePrice = data?.maxPossiblePrice || 100;

  // Initialize price limit when data is loaded
  useEffect(() => {
    if (data?.maxPossiblePrice && priceLimit === 0) {
      setPriceLimit(data.maxPossiblePrice);
    }
  }, [data?.maxPossiblePrice, priceLimit, setPriceLimit]);

  const error = isError
    ? fetchError?.message || "Không thể tải thực đơn"
    : null;

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // 1. Search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          (p.description && p.description.toLowerCase().includes(term)),
      );
    }

    // 2. Category filter
    if (selectedCategoryId !== "all") {
      result = result.filter((p) => p.categoryId === selectedCategoryId);
    }

    // 3. Price filter (If priceLimit is 0 it means it hasn't initialized from data yet, ignore filtering)
    if (priceLimit > 0) {
      result = result.filter((p) => p.price <= priceLimit);
    }

    // 4. Sort
    if (sortOrder === "price_asc") result.sort((a, b) => a.price - b.price);
    else if (sortOrder === "price_desc")
      result.sort((a, b) => b.price - a.price);
    else if (sortOrder === "name_asc")
      result.sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }, [allProducts, searchTerm, selectedCategoryId, priceLimit, sortOrder]);

  // Category options for dropdowns
  const categoryOptions = useMemo(
    () =>
      categories.map((cat) => ({
        id: cat.id,
        name: cat.name,
        depth: 0,
        productCount: cat.products?.length || 0,
      })),
    [categories],
  );

  return {
    loading,
    error,
    searchTerm,
    selectedCategoryId,
    sortOrder,
    priceLimit,
    maxPossiblePrice,
    categories,
    filteredProducts,
    allProducts,
    categoryOptions,
    setSearchTerm,
    setSelectedCategoryId,
    setSortOrder,
    setPriceLimit,
    reset,
  };
};

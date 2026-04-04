import React from "react";
import { useMenu } from "@/shared/hooks/useMenu";
import MenuHeader from "@/features/menu/components/MenuHeader";
import MenuFilters from "@/features/menu/components/MenuFilters";
import ProductGrid from "@/features/menu/components/ProductGrid";
import { SlidersHorizontal } from "lucide-react";

export default function Menu() {
  const {
    loading,
    error,
    searchTerm, setSearchTerm,
    selectedCategoryId, setSelectedCategoryId,
    priceLimit, setPriceLimit,
    sortOrder, setSortOrder,
    filteredProducts,
    categoryOptions,
    maxPossiblePrice,
    API_BASE_URL
  } = useMenu();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-text/60">Đang tải ...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background px-4">
        <div className="text-center card max-w-md">
          <h2 className="text-2xl mb-4">Có lỗi xảy ra...</h2>
          <p className="text-text/70 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="btn-primary w-full"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  const handleReset = () => {
    setSearchTerm("");
    setSelectedCategoryId("all");
    setPriceLimit(maxPossiblePrice);
  };

  return (
    <div className="bg-background min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-8 max-w-[1240px]">
        
        <MenuHeader />

        <MenuFilters 
          searchTerm={searchTerm} setSearchTerm={setSearchTerm}
          selectedCategoryId={selectedCategoryId} setSelectedCategoryId={setSelectedCategoryId}
          priceLimit={priceLimit} setPriceLimit={setPriceLimit}
          sortOrder={sortOrder} setSortOrder={setSortOrder}
          categoryOptions={categoryOptions}
          maxPossiblePrice={maxPossiblePrice}
        />

        {/* Results Info Bar */}
        <div className="flex items-center justify-between mb-8 px-2">
          <p className="text-text/60 font-medium">
            Đang hiển thị <span className="text-text font-bold">{filteredProducts.length}</span> món
          </p>
          <div className="h-[1px] flex-grow bg-gray-100 mx-6 hidden md:block"></div>
          <div className="flex items-center gap-4">
             <SlidersHorizontal className="w-4 h-4 text-text/40" />
          </div>
        </div>

        <ProductGrid 
          products={filteredProducts} 
          API_BASE_URL={API_BASE_URL} 
          onReset={handleReset}
        />

      </div>
    </div>
  );
}
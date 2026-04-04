import SearchBar from "@/features/menu/components/SearchBar";
import CategoryBar from "@/features/menu/components/CategoryBar";
import FoodCard from "@/features/menu/components/FoodCard";

import MenuSection from "@/features/menu/components/MenuSection";
import { useMenu } from "@/shared/hooks/useMenu";
import CartBar from "@/features/orders/components/CartBar/CartBar";
import { useCartStore } from "@/features/orders/store/useCartStore";
import { useOrderStore } from "@/features/orders/store/useOrderStore";
import FloatingOrderButton from "@/features/orders/components/OrderBar/FloatingOrderButton";
import OrderStatusBar from "@/features/orders/components/OrderBar/OrderStatusBar";
import OrderDetailsModal from "@/features/orders/components/OrderBar/OrderDetailsModal";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useOrderSocket } from "../hooks/useOrderSocket";

const MenuPage = () => {
  const { tableId: urlTableId } = useParams();
  const {
    loading: loading,
    error,
    searchTerm,
    setSearchTerm,
    selectedCategoryId,
    setSelectedCategoryId,
    categories,
    filteredProducts,
  } = useMenu();

  const { tableId } = useParams();
  useOrderSocket(tableId);

  const totalCount = useCartStore((state) => state.totalCount);
  const activeOrder = useOrderStore((state) => state.activeOrder);
  const showCartModal = useCartStore((state) => state.showModal);
  
  const [showOrderModal, setShowOrderModal] = useState(false);

  // Prepare categories for CategoryBar (Main Categories)
  const mainCategories = [
    { id: "all", name: "Tất cả" },
    ...categories.map((cat) => ({ id: cat.id, name: cat.name })),
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-primary text-white px-6 py-2 rounded-full font-bold"
        >
          Thử lại
        </button>
      </div>
    );
  }

  const renderMenuSections = () => {
    if (searchTerm) {
      if (filteredProducts.length === 0) {
        return (
          <div className="p-8 text-center text-gray-500 italic">
            Không tìm thấy sản phẩm nào khớp với "{searchTerm}"
          </div>
        );
      }
      return (
        <MenuSection title="Kết quả tìm kiếm" bgColor="bg-gray-50/30">
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map((product) => (
              <FoodCard key={product.id} dish={product} />
            ))}
          </div>
        </MenuSection>
      );
    }

    // Normal view: Grouped by Category
    const activeCategories =
      selectedCategoryId === "all"
        ? categories
        : categories.filter((c) => c.id === selectedCategoryId);

    return activeCategories.map((cat) => {
      // Only show category if it has products (or if its products are in filteredProducts)
      const catProducts = filteredProducts.filter(
        (p) => p.categoryId === cat.id,
      );

      if (catProducts.length === 0) return null;

      return (
        <MenuSection key={cat.id} title={cat.name} bgColor="bg-white">
          <div className="grid grid-cols-2 gap-3">
            {catProducts.map((product) => (
              <FoodCard key={product.id} dish={product} />
            ))}
          </div>
        </MenuSection>
      );
    });
  };

  return (
    <div className="min-h-screen bg-background text-text pb-24 max-w-md mx-auto shadow-xl relative">
      <div 
        className="sticky top-0 z-30 bg-white shadow-sm border-b border-gray-100"
        style={{ transform: 'translateZ(0)', willChange: 'transform', backfaceVisibility: 'hidden' }}
      >
        <SearchBar onSearch={setSearchTerm} defaultValue={searchTerm} />

        <CategoryBar
          categories={mainCategories}
          selectedCategory={selectedCategoryId}
          onSelect={setSelectedCategoryId}
        />
      </div>

      <main className="mt-2 space-y-4">{renderMenuSections()}</main>

      {/* Action Bar Container (Fixed at bottom) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none max-w-md mx-auto flex flex-col justify-end">
        {/* Vùng cho các Nút Nổi, có pointer-events-auto */}
        <div className="pointer-events-auto w-full relative">
          {!showCartModal && activeOrder && totalCount > 0 && (
            <FloatingOrderButton onClick={() => setShowOrderModal(true)} />
          )}
        </div>
        
        {/* Vùng Bottom Bar tĩnh */}
        <div className="pointer-events-auto w-full">
          {totalCount > 0 ? (
            <CartBar />
          ) : !showCartModal && activeOrder ? (
            <OrderStatusBar 
              totalAmount={activeOrder.total} 
              onClick={() => setShowOrderModal(true)} 
            />
          ) : null}
        </div>
      </div>

      {/* Cart Modal is handled inside CartBar component itself when totalCount > 0 */}
      {/* But if totalCount === 0 and user opens cart, wait, user can only open cart if totalCount > 0! */}

      {/* Order Details Modal Overlay */}
      {showOrderModal && (
        <div className="fixed inset-0 z-10000 bg-white max-w-md mx-auto h-screen flex flex-col">
          <OrderDetailsModal 
            order={activeOrder} 
            onClose={() => setShowOrderModal(false)} 
          />
        </div>
      )}

    </div>
  );
};

export default MenuPage;

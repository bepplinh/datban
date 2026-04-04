import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, RefreshCw, Search as SearchIcon } from "lucide-react";
import CategoryBar from "@/features/menu/components/CategoryBar";
import StaffFoodCard from "@/features/staff/components/StaffFoodCard";
import MenuSection from "@/features/menu/components/MenuSection";
import { useMenu } from "@/shared/hooks/useMenu";
import { useStaffCartStore, useStaffDraft } from "@/features/staff/store/useStaffCartStore";
import { useTableOrders } from "../hooks/useTableOrders";
import ActiveOrdersSummary from "../components/ActiveOrdersSummary";
import CartSummaryBar from "../components/CartSummaryBar";
import DraftReviewModal from "../components/DraftReviewModal";

export default function StaffOrderMenu() {
  const { tableId } = useParams();
  const navigate = useNavigate();
  const updateQuantity = useStaffCartStore(state => state.updateQuantity);
  const removeFromCart = useStaffCartStore(state => state.removeFromCart);
  const [showReview, setShowReview] = useState(false);

  const { items, totalCount, totalAmount } = useStaffDraft(tableId);
  const { orders: activeOrders, isRefreshing, refetch } = useTableOrders(tableId);

  const {
    loading,
    error,
    searchTerm,
    setSearchTerm,
    selectedCategoryId,
    setSelectedCategoryId,
    categories,
    filteredProducts,
  } = useMenu();

  const mainCategories = [
    { id: "all", name: "Tất cả" },
    ...categories.map((cat) => ({ id: cat.id, name: cat.name })),
  ];

  const handleSubmitOrder = () => {
    navigate(`/staff/tables/${tableId}`);
  };

  const getActiveQuantity = (productId) => {
    const item = activeOrders.find(o => o.productId === productId || o.product?.id === productId);
    return item ? item.quantity : 0;
  };

  const renderMenuSections = () => {
    if (searchTerm) {
      if (filteredProducts.length === 0) {
        return <div className="p-8 text-center text-gray-500 italic">Không tìm thấy sản phẩm "{searchTerm}"</div>;
      }
      return (
        <MenuSection title="Kết quả tìm kiếm" bgColor="bg-gray-50/30">
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map((product) => (
              <StaffFoodCard 
                key={product.id} 
                dish={product} 
                tableId={tableId} 
                activeQuantity={getActiveQuantity(product.id)}
              />
            ))}
          </div>
        </MenuSection>
      );
    }
    const activeCategories = selectedCategoryId === "all" ? categories : categories.filter((c) => c.id === selectedCategoryId);
    return activeCategories.map((cat) => {
      const catProducts = filteredProducts.filter((p) => p.categoryId === cat.id);
      if (catProducts.length === 0) return null;
      return (
        <MenuSection key={cat.id} title={cat.name} bgColor="bg-white">
          <div className="grid grid-cols-2 gap-3">
            {catProducts.map((product) => (
              <StaffFoodCard 
                key={product.id} 
                dish={product} 
                tableId={tableId} 
                activeQuantity={getActiveQuantity(product.id)}
              />
            ))}
          </div>
        </MenuSection>
      );
    });
  };

  if (loading) return <div className="p-6 text-center text-gray-500">Đang tải Menu...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-background text-text pb-10 md:max-w-md md:mx-auto relative">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white shadow-sm border-b border-gray-100 flex flex-col">
        <div className="px-4 h-14 flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors shrink-0">
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <SearchIcon size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all font-medium placeholder:text-gray-400 placeholder:font-normal"
              placeholder="Bạn muốn tìm món gì ?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button
            onClick={() => refetch()}
            disabled={isRefreshing}
            className="p-2 -mr-2 rounded-full hover:bg-gray-100 transition-colors text-primary disabled:opacity-50 shrink-0 flex items-center justify-center"
          >
            <RefreshCw className={`w-6 h-6 ${isRefreshing ? "animate-spin" : ""}`} />
          </button>
        </div>
        <CategoryBar categories={mainCategories} selectedCategory={selectedCategoryId} onSelect={setSelectedCategoryId} />
      </header>

      <main className="mt-2 space-y-4 px-2">
        <ActiveOrdersSummary orders={activeOrders} />
        {renderMenuSections()}
      </main>

      {/* Cart Summary Bar */}
      {totalCount > 0 && !showReview && (
        <CartSummaryBar
          totalCount={totalCount}
          totalAmount={totalAmount}
          onReview={() => setShowReview(true)}
        />
      )}

      {/* Review Modal */}
      {showReview && (
        <DraftReviewModal
          items={items}
          totalAmount={totalAmount}
          onClose={() => setShowReview(false)}
          onSubmit={handleSubmitOrder}
          onUpdateQuantity={(id, delta) => updateQuantity(tableId, id, delta)}
          onRemoveItem={(id) => removeFromCart(tableId, id)}
        />
      )}
    </div>
  );
}

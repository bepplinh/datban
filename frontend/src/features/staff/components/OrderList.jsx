import OrderItemCard from "./OrderItemCard";

const OrderList = ({ draftItems, orders }) => {
  const isEmpty = draftItems.length === 0 && orders.length === 0;
  const getVariant = (status) => {
    switch (status) {
      case "READY": return "ready";
      case "PREPARING": return "preparing";
      default: return "confirmed";
    }
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">

      {draftItems.map((item) => (
        <OrderItemCard
          key={`draft-${item.id}`}
          name={item.name}
          price={item.price}
          quantity={item.quantity}
          variant="draft"
        />
      ))}

      {orders.map((item) => (
        <OrderItemCard
          key={`order-${item.id}`}
          name={item.product?.name || "Sản phẩm"}
          price={item.unitPrice}
          quantity={item.quantity}
          variant={getVariant(item.status)}
        />
      ))}

      {isEmpty && (
        <div className="text-center text-gray-500 mt-10">
          Chưa có món nào được gọi
        </div>
      )}
    </div>
  );
};

export default OrderList;

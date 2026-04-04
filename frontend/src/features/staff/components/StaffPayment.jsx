import CardProductPayment from "./StaffPayment/CardProductPayment";
import DetailInfo from "./StaffPayment/DetailInfo";
import Header from "./StaffPayment/Header";
import InputPhone from "./StaffPayment/InputPhone";
import PaymentMethod from "./StaffPayment/PaymentMethod";
import OrderSummary from "./StaffPayment/OrderSummary";
import Footer from "./StaffPayment/Footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTableOrders } from "../hooks/useTableOrders";
import { useTableStore } from "../../table-session/store/useTableStore";

function StaffPayment() {
  const tableId = useTableStore(state => state.tableId);
  const { orders, isLoading } = useTableOrders(tableId);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !tableId) {
      navigate("/staff/tables");
    }
  }, [tableId, isLoading, navigate]);

  const onSubmit = () => {
    console.log("Submit clicked");
  };

  if (isLoading) {
    return <div className="p-6 text-center">Đang tải thông tin đơn hàng...</div>;
  }

  if (!tableId) return null;

  const orderItems = orders;
  const total = orders.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen bg-[#fbf8ff] pb-24 relative">
      <Header />
      <main className="flex-1 px-6">
        <DetailInfo totalItems={orderItems.length} />

        <div className="space-y-1">
          {orderItems.map((item) => (
            <CardProductPayment
              key={item.id}
              name={item.product.name}
              quantity={item.quantity}
              price={item.unitPrice}
              note={item.note}
            />
          ))}
        </div>

        <OrderSummary subtotal={total} tax={0} total={total} />
        <InputPhone />
        <PaymentMethod />
      </main>

      <Footer total={total} />

      <div id="payos-checkout"></div>
    </div>
  );
}

export default StaffPayment;

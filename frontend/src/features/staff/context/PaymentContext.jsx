import { createContext, useContext, useState } from "react";

const PaymentContext = createContext();

const PaymentProvider = ({ children }) => {
  const [paymentMethod, setPaymentMethod] = useState("cash");
  return (
    <PaymentContext.Provider value={{}}>{children}</PaymentContext.Provider>
  );
};

const usePaymentContext = () => {
  return useContext(PaymentContext);
};

export { PaymentProvider, usePaymentContext };

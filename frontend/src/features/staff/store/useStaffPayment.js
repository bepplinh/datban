import { create } from "zustand";

const useStaffPayment = create((set, get) => ({
  paymentMethod: "cash",
  paymentData: null,

  setPaymentData: (paymentData) => set({ paymentData }),
  setPaymentMethod: (method) => set({ paymentMethod: method }),
}));

export default useStaffPayment;

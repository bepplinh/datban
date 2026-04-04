import { create } from "zustand";

const useStaffPaymentStore = create((set, get) => ({
  isShowPaymentModal: false,
  paymentData: null,

  openPaymentModal: (data) =>
    set({ isShowPaymentModal: true, paymentData: data }),
  closePaymentModal: () =>
    set({ isShowPaymentModal: false, paymentData: null }),
}));

export default useStaffPaymentStore;

import api from "../../../shared/services/api.js";
const payosService = {
  createPaymentLink: async (orderId) => {
    const res = await api.post("/payos/create-payment-link", { orderId });
    return res;
  },
};

export default payosService;

import payosService from "../../services/payos.service.js";

const payosController = {
  createPaymentLink: async (req, res) => {
    try {
      const { orderId } = req.body;
      if (!orderId) {
        return res.status(400).json({ message: "Order ID is required" });
      }

      const paymentData = await payosService.createPaymentLink(orderId);
      return res.status(200).json(paymentData);
    } catch (error) {
      console.error("PayOS Error:", error);
      return res.status(500).json({
        message: error.message || "Internal server error",
        error: error.response?.data || error.data || error,
      });
    }
  },

  webhookVerify: async (req, res) => {
    try {
      console.log("Webhook received:", req.body);
      const webhookData = req.body;

      // Verify signature
      const verifiedData = payosService.verifyWebhook(webhookData);

      // Handle success
      if (verifiedData.code === "00") {
        await payosService.handlePaymentSuccess(verifiedData.data.orderCode);
        console.log(
          `Payment success for orderCode: ${verifiedData.data.orderCode}`,
        );
      }

      return res.status(200).json({ message: "success" });
    } catch (error) {
      console.error("Webhook Error:", error);
      return res.status(200).json({ message: "error", error: error.message }); // PayOS expects 200 even if error usually, but better to check
    }
  },
};

export default payosController;

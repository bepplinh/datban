import dotenv from "dotenv";

dotenv.config();

const API_URL = "http://localhost:3000/api/payos/webhook-verify";

const simulateWebhook = async (orderCode) => {
  const payload = {
    isTest: true, // Special flag to bypass signature verification in our code
    code: "00",
    desc: "success",
    data: {
      orderCode: orderCode,
      amount: 1000,
      description: "Thanh toán đơn hàng #" + orderCode,
      status: "PAID",
    },
  };

  console.log(
    "Sending Test Webhook Payload:",
    JSON.stringify(payload, null, 2),
  );

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    console.log("Response from Server:", result);
  } catch (error) {
    console.error("Error sending webhook:", error.message);
  }
};

const orderCode = process.argv[2] ? parseInt(process.argv[2]) : 1;
simulateWebhook(orderCode);

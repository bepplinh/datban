import dotenv from "dotenv";

dotenv.config();

const BASE_URL = "http://localhost:3000/api/payos";

const simulateWebhook = async (orderCode, code = "00") => {
  const payload = {
    isTest: true,
    code: code,
    desc: code === "00" ? "success" : "cancelled",
    data: {
      orderCode: orderCode,
      amount: 1000,
      description: "Thanh toán đơn hàng #" + orderCode,
      status: code === "00" ? "PAID" : "CANCELLED",
    },
  };

  console.log(`\n--- Sending Webhook (Code: ${code}) for #${orderCode} ---`);
  try {
    const response = await fetch(`${BASE_URL}/webhook-verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    console.log("Server Response:", result);
  } catch (err) {
    console.error("Webhook Request Failed:", err.message);
  }
};

const syncStatus = async (orderCode) => {
  console.log(`\n--- Triggering Manual Sync for #${orderCode} ---`);
  try {
    const response = await fetch(`${BASE_URL}/sync-status/${orderCode}`);
    const result = await response.json();
    console.log("Sync Response:", result);
  } catch (err) {
    console.error("Sync Request Failed:", err.message);
  }
};

// Usage: node verify_payment.js <orderCode>
const orderCode = process.argv[2] ? parseInt(process.argv[2]) : 1;

(async () => {
  console.log("Starting Verification Tests...");

  // Test 1: Idempotency (Send success twice)
  await simulateWebhook(orderCode, "00");
  await simulateWebhook(orderCode, "00");

  // Test 2: Cancellation
  const cancelOrderCode = orderCode + 1000; // Assuming this order exists or we just want to see logs
  await simulateWebhook(cancelOrderCode, "99"); // Mock fail code

  // Test 3: Manual Sync (Requires valid PayOS link or it will throw 404/Error from PayOS API)
  // await syncStatus(orderCode);
})();

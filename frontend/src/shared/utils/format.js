/**
 * Formats a number as currency in Vietnamese Dong (VND)
 * @param {number} amount - The amount to format
 * @returns {string} - Formatted currency string (e.g., 100.000 ₫)
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount || 0);
};

/**
 * Formats a number with Vietnamese locale (no currency symbol)
 * @param {number} value - The value to format
 * @returns {string} - Formatted string (e.g., 100.000)
 */
export const formatNumber = (value) => {
  return (value || 0).toLocaleString("vi-VN");
};

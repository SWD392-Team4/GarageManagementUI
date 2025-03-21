export const formatVietnameseCurrency = (amount) => {
  try {
    return amount.toLocaleString("vi-VN") + " VND";
  } catch (error) {
    return "N/A";
  }
};

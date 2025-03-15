export const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);

  // Lấy phần ngày/tháng/năm
  const datePart = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  // Lấy phần giờ/phút (24h)
  const timePart = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return `${datePart} ${timePart}`;
};

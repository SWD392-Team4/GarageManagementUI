export function formatDateForFeedBack(dateString) {
    if (!dateString) return "";

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export const formatVietnameseCurrency = (amount) => {
    return amount.toLocaleString("vi-VN") + " VND";
};

export const parseVietnameseCurrency = (formattedAmount) => {
    return Number(formattedAmount.replace(/\./g, "").replace(" VND", ""));
};
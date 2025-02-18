export const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    // Chuyển đổi từ ISO 8601 (có timezone) sang Date object
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        console.warn("Invalid Date detected:", dateString);
        return "N/A";
    }

    // Hiển thị theo định dạng dd/mm/yyyy
    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
};

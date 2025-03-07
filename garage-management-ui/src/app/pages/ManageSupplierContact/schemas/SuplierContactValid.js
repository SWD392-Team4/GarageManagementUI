export const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
};

export const formatYearMonthDay = (date) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
};

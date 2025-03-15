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


export const formatVietnameseCurrency = (amount) => {
    return amount.toLocaleString("vi-VN") + " VND";
};

export const parseVietnameseCurrency = (formattedAmount) => {
    return Number(formattedAmount.replace(/\./g, "").replace(" VND", ""));
};



// Hàm kiểm tra trạng thái của sản phẩm (Active/Inactive)
export const getStatusLabel = (status) => {
    return status === "Active" ? "Hoạt động" : "Không hoạt động";
};

// Hàm xác định màu sắc trạng thái Active/Inactive
export const getStatusColor = (status) => {
    return status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700";
};

// Hàm kiểm tra tồn kho (Dựa vào quantity)
export const getStockLabel = (quantity) => {
    return quantity > 0 ? "Còn hàng" : "Hết hàng";
};

// Hàm xác định màu sắc của số lượng tồn kho
export const getStockColor = (quantity) => {
    return quantity > 0 ? "text-green-700" : "text-red-700";
};
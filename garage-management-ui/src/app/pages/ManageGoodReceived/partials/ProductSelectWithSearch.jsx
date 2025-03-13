import React from "react";
import Select from "react-select";

/**
 * @param {Array} products - Danh sách sản phẩm lấy từ API (mỗi item có: id, productName, productBarcode, brandName, ...)
 * @param {string|null} selectedProductId - ID của sản phẩm đang được chọn
 * @param {function} setSelectedProductId - Hàm để cập nhật ID sản phẩm khi người dùng chọn
 */
export default function ProductSelectWithSearch({
  products,
  selectedProductId,
  setSelectedProductId,
}) {
  const productOptions = products.map((p) => ({
    value: p.id,
    label: `${p.productName}`,
  }));

  const selectedOption =
    productOptions.find((option) => option.value === selectedProductId) || null;

  const handleChange = (option) => {
    setSelectedProductId(option ? option.value : null);
  };

  return (
    <div className="min-w-60">
      <Select
        options={productOptions}
        value={selectedOption}
        onChange={handleChange}
        placeholder="Search product by name, ID..."
        // Đảm bảo dropdown hiển thị trên cùng
        menuPortalTarget={document.body}
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        }}
        filterOption={(option, inputValue) => {
          const label = option.label.toLowerCase();
          const val = option.value.toLowerCase();
          const search = inputValue.toLowerCase();

          // Tìm trong label hoặc trong value (id)
          return label.includes(search) || val.includes(search);
        }}
      />
    </div>
  );
}

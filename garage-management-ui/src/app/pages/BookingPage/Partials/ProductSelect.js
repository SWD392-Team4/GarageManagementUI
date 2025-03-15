import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getAllProductSuitable } from "../Services/BookingPageService";
import { BookingSignify } from "../Services/BookingSignify";
import { formatVietnameseCurrency } from "../../ManageProduct/schemas/ProductValid";

const ProductSelect = ({ idServices, carPartId }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProductSuitable(carPartId);
        setProducts(response.data.value);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [carPartId]);

  const options = products.map((product) => ({
    value: product.id,
    label: product.productName,
    Price: formatVietnameseCurrency(product.productPrice),
    image:
      product.imageLink && product.imageLink.length > 0
        ? product.imageLink[0]
        : "",
  }));

  // Hàm cập nhật số lượng cho một product
  const handleQuantityChange = (productId, newQuantity) => {
    const updatedSelected = selectedProducts.map((option) => {
      if (option.value === productId) {
        return { ...option, quantity: newQuantity };
      }
      return option;
    });
    setSelectedProducts(updatedSelected);

    BookingSignify.set((prev) => {
      const serviceIndex = prev.value.services.findIndex(
        (service) => service.serviceId === idServices
      );
      if (serviceIndex !== -1) {
        prev.value.services[serviceIndex].replacementParts =
          updatedSelected.map((option) => ({
            productId: option.value,
            quantity: option.quantity,
          }));
      }
      return prev;
    });
  };

  // Tùy chỉnh hiển thị của option, tích hợp input số lượng khi option được chọn
  const formatOptionLabel = (option, { context }) => {
    return (
      <div className="grid grid-cols-6 items-center min-w-40">
        <div className="col-span-2">
          {option.image && (
            <img
              src={option.image}
              alt={option.label}
              className="w-10 h-10 object-cover rounded"
            />
          )}
        </div>
        <div className="col-span-4">
          <div className="font-semibold">{option.label}</div>
          <div className="text-gray-700 text-sm">{option.Price}</div>
          {context === "value" && (
            <input
              type="number"
              min="0"
              value={option.quantity || 0}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => {
                const newQuantity = parseInt(e.target.value, 10) || 0;
                handleQuantityChange(option.value, newQuantity);
              }}
              className="border p-1 w-20 mt-1"
            />
          )}
        </div>
      </div>
    );
  };

  // Kiểm tra service đã được chọn chưa dựa vào BookingSignify
  const isServiceSelected = BookingSignify.value.services.some(
    (service) => service.serviceId === idServices
  );

  const handleChange = (selectedOptions) => {
    const updatedSelected = selectedOptions
      ? selectedOptions.map((option) => ({
          ...option,
          quantity: option.quantity !== undefined ? option.quantity : 1,
        }))
      : [];
    setSelectedProducts(updatedSelected);

    BookingSignify.set((prev) => {
      const newReplacementParts = updatedSelected.map((option) => ({
        productId: option.value,
        quantity: option.quantity,
      }));
      const serviceIndex = prev.value.services.findIndex(
        (service) => service.serviceId === idServices
      );
      if (serviceIndex !== -1) {
        prev.value.services[serviceIndex].replacementParts =
          newReplacementParts;
      } else {
        prev.value.services.push({
          serviceId: idServices,
          replacementParts: newReplacementParts,
        });
      }
      return prev;
    });
  };

  return (
    <div className="my-4">
      <Select
        isMulti
        options={options}
        value={selectedProducts}
        onChange={handleChange}
        formatOptionLabel={formatOptionLabel}
        placeholder={
          isServiceSelected ? "Add product" : "Please select a service first"
        }
      />
    </div>
  );
};

export default ProductSelect;

import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import InvoiceModal from "./partials/InvoiceModal";
import { getProductAtStore, createInvoiceSale } from "./services/InvoiceSaleService";

export default function CreateInvoiceSale() {
  const { register, control, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      customer: { name: "", phone: "", email: "" },
      products: [],
    },
  });

  const { fields, append, remove, update } = useFieldArray({ control, name: "products" });
  const [invoice, setInvoice] = useState(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [availableProducts, setAvailableProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await getProductAtStore();
        if (response) {
          setAvailableProducts(response.data.value);
        }
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
      }
    }
    fetchProducts();
  }, []);

  // 🛠 Kiểm soát số lượng khi chọn sản phẩm
  const handleProductSelect = (product) => {
    console.log("🔹 Chọn sản phẩm:", product);

    // 🔍 Kiểm tra xem sản phẩm đã có trong danh sách chưa
    const existingIndex = fields.findIndex((item) => item.productId === product.productId);

    if (existingIndex !== -1) {
      // Nếu sản phẩm đã có, chỉ tăng số lượng nếu chưa đạt mức tồn kho
      const currentQuantity = fields[existingIndex].quantity;
      const maxQuantity = product.quantity;

      if (currentQuantity < maxQuantity) {
        update(existingIndex, {
          ...fields[existingIndex],
          quantity: currentQuantity + 1,
        });
      } else {
        console.warn(`🚫 Đã đạt giới hạn số lượng (${maxQuantity})`);
      }
    } else {
      // Nếu chưa có, thêm mới với quantity = 1 và lưu maxQuantity (tồn kho)
      append({
        productId: product.productId, // Giữ nguyên ID từ API
        name: product.productName,
        quantity: 1,
        maxQuantity: product.quantity, // Lưu số lượng tồn kho
        price: product.price || 0,
      });
    }
  };

  // 🛠 Kiểm soát số lượng khi thay đổi
  const handleQuantityChange = (index, quantity) => {
    const maxQuantity = fields[index].maxQuantity;
    
    if (quantity < 1) return; // Không cho phép số lượng < 1
    if (quantity > maxQuantity) {
      console.warn(`🚫 Không thể đặt số lượng lớn hơn ${maxQuantity}`);
      quantity = maxQuantity; // Giới hạn tối đa
    }

    update(index, { ...fields[index], quantity });
  };

  // 🛠 Tính tổng tiền hóa đơn
  const calculateTotal = () => {
    return fields.reduce((sum, item) => sum + item.quantity * item.price, 0);
  };

  // 🛠 Gửi dữ liệu hóa đơn
  const onSubmit = async (data) => {
    console.log("📤 Dữ liệu gửi đi:", data);

    const invoiceData = {
      customerName: data.customer.name,
      customerPhoneNumber: data.customer.phone,
      customerEmail: data.customer.email || "",
      invoiceSellProducts: data.products.map((product) => ({
        productId: product.productId,
        quantity: product.quantity,
      })),
    };

    try {
      const response = await createInvoiceSale(invoiceData);
      if (response) {
        setInvoice(response);
        setShowInvoiceModal(true);
        reset();
      }
    } catch (error) {
      console.error("❌ Lỗi khi tạo hóa đơn:", error);
    }
  };

  return (
    <div className="bg-white shadow-lg p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Tạo hóa đơn</h1>

      {/* Layout hai cột */}
      <div className="grid grid-cols-3 gap-6">
        {/* Cột trái: Danh sách sản phẩm */}
        <div className="col-span-2">
          <h2 className="text-lg font-semibold mb-2">Danh sách sản phẩm</h2>
          <div className="grid grid-cols-3 gap-4 max-h-[500px] overflow-y-auto border p-2 rounded-lg">
            {availableProducts.map((product) => (
              <div
                key={product.productId}
                className="p-4 border rounded-lg cursor-pointer shadow-sm hover:shadow-md transition bg-white flex flex-col justify-between"
                onClick={() => handleProductSelect(product)}
                style={{ height: "120px" }}
              >
                <h3 className="font-semibold">{product.productName}</h3>
                <p className="text-sm text-gray-600">Giá: {product.price ? product.price.toLocaleString() : "N/A"} VND</p>
                <p className="text-sm text-gray-500">Tồn kho: {product.quantity}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Cột phải: Thông tin khách hàng + Hóa đơn */}
        <div className="col-span-1 bg-gray-50 p-4 rounded-lg shadow-md flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-3">Thông tin khách hàng</h3>
            <input className="border rounded w-full p-2 mb-2" {...register("customer.name")} placeholder="Tên khách hàng" />
            <input className="border rounded w-full p-2 mb-2" {...register("customer.phone")} placeholder="Số điện thoại" />
            <input className="border rounded w-full p-2 mb-4" {...register("customer.email")} placeholder="Email khách hàng" />

            {/* Danh sách sản phẩm đã chọn */}
            <h3 className="text-lg font-semibold mb-3">Sản phẩm đã chọn</h3>
            <div className="max-h-[250px] overflow-y-auto border rounded p-2 bg-white">
              {fields.length > 0 ? (
                fields.map((item, index) => (
                  <div key={item.productId} className="flex justify-between items-center p-2 border-b">
                    <span className="text-sm">{item.name}</span>
                    <div className="flex items-center">
                      <button
                        className="bg-gray-200 px-2 rounded-l text-lg"
                        onClick={() => handleQuantityChange(index, item.quantity - 1)}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className="w-12 border text-center"
                        value={item.quantity}
                        min="1"
                        max={item.maxQuantity}
                        onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 1)}
                      />
                      <button
                        className="bg-gray-200 px-2 rounded-r text-lg"
                        onClick={() => handleQuantityChange(index, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button className="text-red-500 text-sm" onClick={() => remove(index)}>
                      Xóa
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm text-center">Chưa có sản phẩm nào</p>
              )}
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold">Tổng tiền:</h3>
            <p className="text-xl font-bold text-green-600">{calculateTotal().toLocaleString()} VND</p>
          </div>

          <button className="bg-green-500 text-white px-4 py-2 rounded w-full font-semibold mt-4" onClick={handleSubmit(onSubmit)}>
            Tạo hóa đơn
          </button>
        </div>
      </div>

      {showInvoiceModal && <InvoiceModal invoice={invoice} onClose={() => setShowInvoiceModal(false)} />}
    </div>
  );
}

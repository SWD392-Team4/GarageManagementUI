import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import InvoiceModal from "./partials/InvoiceModal";
import {
  getProductAtStore,
  createInvoiceSale,
} from "./services/InvoiceSaleService";
import ProductCard from "./partials/ProductCard";
import SidebarCheckout from "./partials/SidebarCheckout";
import { FaReceipt, FaTimes } from "react-icons/fa";

export default function CreateInvoiceSale() {
  const { register, control, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      customer: { name: "", phone: "", email: "" },
      products: [],
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "products",
  });
  const [invoice, setInvoice] = useState(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [availableProducts, setAvailableProducts] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  //xu ly moblie
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
    const existingIndex = fields.findIndex(
      (item) => item.productId === product.productId
    );

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
        price: product.productPrice || 0,
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
    const total = fields.reduce(
      (sum, item) => sum + item.quantity * item.productPrice,
      0
    );
    console.log("🔹 Tổng tiền: ", total);
    return total;
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

  useEffect(() => {
    setIsFormValid(
      !!watch("customer.name") && !!watch("customer.phone") && fields.length > 0
    );
  }, [watch("customer.name"), watch("customer.phone"), fields.length]);

  return (
    <div className="bg-white shadow-lg p-6 h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">Tạo hóa đơn</h1>
      {/* ✅ Nút mở sidebar (nằm bên phải, có icon hóa đơn) */}
      <button
        onClick={toggleSidebar}
        className="fixed top-13 right-4 z-[999] flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md shadow-lg md:hidden"
      >
        <FaReceipt size={20} />
        <span>Mở hóa đơn</span>
      </button>

      {/* Layout responsive */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cột trái: Danh sách sản phẩm */}
        <div className="md:col-span-2">
          <h2 className="text-lg font-semibold mb-2">Danh sách sản phẩm</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[800px] overflow-y-auto border p-2 rounded-lg">
            {availableProducts.map((product) => (
              <ProductCard
                key={product.productId}
                product={product}
                onSelect={handleProductSelect}
              />
            ))}
          </div>
        </div>

        {/* Cột phải: Thông tin khách hàng + Hóa đơn */}
        {/* Sidebar */}
        <div
          className={`fixed top-0 right-0 h-full bg-white shadow-lg p-6 rounded-xl transition-transform z-50 md:relative md:col-span-1 ${
            isSidebarOpen ? "translate-x-0" : "translate-x-full"
          } md:translate-x-0`}
        >
          <SidebarCheckout
            register={register}
            fields={fields}
            handleQuantityChange={handleQuantityChange}
            remove={remove}
            calculateTotal={calculateTotal}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            isFormValid={isFormValid}
          />
        </div>
      </div>

      {showInvoiceModal && (
        <InvoiceModal
          invoice={invoice}
          onClose={() => setShowInvoiceModal(false)}
        />
      )}
    </div>
  );
}

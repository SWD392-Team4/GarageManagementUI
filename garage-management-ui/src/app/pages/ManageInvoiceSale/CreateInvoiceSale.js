import React, { useState, useEffect, useRef, useMemo } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import InvoiceModal from "./partials/InvoiceModal";
import {
  getProductAtStore,
  createInvoiceSale,
  getProductAtGarageByBarCode,
} from "./services/InvoiceSaleService";
import ProductCard from "./partials/ProductCard";
import SidebarCheckout from "./partials/SidebarCheckout";
import { FaReceipt, FaTimes } from "react-icons/fa";
import { formatVietnameseCurrency } from "../ManageService/schemas/ServiceSchemas";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { useMediaQuery } from "react-responsive";

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

  //xu ly scan
  const [isScanning, setIsScanning] = useState(false);
  const barcodeBufferRef = useRef("");
  const lastKeyPressTimeRef = useRef(0);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const fieldsRef = useRef(fields);
  useEffect(() => {
    fieldsRef.current = fields;
  }, [fields]);

  //xu ly moblie
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const fetchProducts = async () => {
    try {
      const response = await getProductAtStore();
      if (response) {
        setAvailableProducts(response.data.value);
      }
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🛠 Kiểm soát số lượng khi chọn sản phẩm
  const handleProductSelect = (product) => {
    // 🔍 Không cho chọn nếu số lượng sản phẩm bằng 0
    if (product.quantity === 0) {
      console.warn(`🚫 Sản phẩm "${product.productName}" đã hết hàng.`);
      return;
    }

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
        productId: product.productId,
        name: product.productName,
        quantity: 1,
        maxQuantity: product.quantity,
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
    const total = fields.reduce((sum, item, index) => {
      // console.log(`📝 Mục ${index + 1}:`, item);

      return sum + item.quantity * item.price;
    }, 0);

    return formatVietnameseCurrency(total);
  };

  // 🛠 Gửi dữ liệu hóa đơn
  const onSubmit = async (data) => {
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
        fetchProducts();
        setInvoice(response.data);
        setShowInvoiceModal(true);
        reset();
      }
    } catch (error) {
      console.error("❌ Lỗi khi tạo hóa đơn:", error);
    }
  };

  ///////////////////////////////////////////////////SCAN--BARCODE////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (!isMobile) {
      let timeoutRef;

      const handleBarcodeScan = async (event) => {
        const currentTime = new Date().getTime();

        // ✅ Nếu khoảng cách giữa hai lần nhập > 100ms, reset buffer
        if (currentTime - lastKeyPressTimeRef.current > 100) {
          barcodeBufferRef.current = event.key;
        } else {
          barcodeBufferRef.current += event.key;
        }

        lastKeyPressTimeRef.current = currentTime;

        // ✅ Khi nhấn Enter, xử lý barcode
        if (event.key === "Enter") {
          const barcode = barcodeBufferRef.current
            .trim()
            .replace(/[\r\n]+|Enter/g, "");
          if (barcode !== "") {
            console.log("📌 Barcode scanned:", barcode);
            handleProductByBarcode(barcode);
          }
          barcodeBufferRef.current = ""; // ✅ Reset bộ đệm sau khi xử lý
        }

        // ✅ Xóa bộ đệm nếu không có ký tự mới trong 500ms
        clearTimeout(timeoutRef);
        timeoutRef = setTimeout(() => {
          barcodeBufferRef.current = "";
        }, 500);
      };

      window.addEventListener("keydown", handleBarcodeScan);

      return () => {
        window.removeEventListener("keydown", handleBarcodeScan);
        clearTimeout(timeoutRef);
      };
    }
  }, [isMobile]);

  const handleProductByBarcode = async (barcode) => {
    try {
      const response = await getProductAtGarageByBarCode(barcode);
      if (!response || !response.data.value) {
        console.warn(`🚫 Không tìm thấy sản phẩm với barcode: ${barcode}`);
        return;
      }

      const product = response.data.value;

      console.log("Check product scan barcode: ", product);
      if (product.quantity === 0) {
        // ✅ Kiểm tra tồn kho
        console.warn(`🚫 Sản phẩm "${product.productName}" đã hết hàng.`);
        return;
      }
      console.log("📌 Fields trước khi tìm sản phẩm:", fieldsRef);
      const existingIndex = fieldsRef.current.findIndex(
        (item) => item.productId === product.productId
      );

      if (existingIndex !== -1) {
        const currentQuantity = fieldsRef.current[existingIndex].quantity;
        console.log("dong nay loi");
        const maxQuantity = product.quantity;

        if (currentQuantity < maxQuantity) {
          update(existingIndex, {
            ...fieldsRef.current[existingIndex],
            quantity: currentQuantity + 1,
          });
        } else {
          console.warn(`🚫 Đã đạt giới hạn số lượng (${maxQuantity})`);
        }
      } else {
        append({
          productId: product.productId,
          name: product.productName,
          quantity: 1,
          maxQuantity: product.quantity,
          price: product.productPrice || 0,
        });
      }
    } catch (error) {
      console.error("❌ Lỗi khi tìm sản phẩm theo barcode:", error);
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
        className="fixed right-4 z-[999] flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md shadow-lg md:hidden"
      >
        <FaReceipt size={20} />
        <span>Mở hóa đơn</span>
      </button>
      {/* ✅ Nút bật/tắt scanner trên mobile */}
      {isMobile && (
        <div className="flex justify-center mt-4">
          <button
            className={`px-4 py-2 rounded-lg text-white ${
              isScanning ? "bg-red-500" : "bg-blue-500"
            }`}
            onClick={() => setIsScanning(!isScanning)}
          >
            {isScanning ? "Tắt Quét Barcode" : "Bật Quét Barcode"}
          </button>
        </div>
      )}

      {/* ✅ Scanner xuất hiện khi bật */}
      {isScanning && isMobile && (
        <div className="flex justify-center mt-4">
          <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 aspect-[4/3] border rounded-lg shadow-lg flex items-center justify-center bg-gray-100">
            <BarcodeScannerComponent
              width="100%"
              height="100%"
              onUpdate={(err, result) => {
                if (result) {
                  handleProductByBarcode(result.text); // ✅ Xử lý sản phẩm quét được
                  setIsScanning(false); // ✅ Tắt scanner sau khi quét xong
                }
              }}
            />
          </div>
        </div>
      )}

      {/* Layout responsive */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cột trái: Danh sách sản phẩm */}
        <div className="md:col-span-2">
          <h2 className="text-lg font-semibold mb-2">Danh sách sản phẩm</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[700px] overflow-y-auto border p-2 rounded-lg">
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

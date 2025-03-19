import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  getAllProductAtGarage,
  getProductAtGarageByBarCode,
  getProductDetails,
} from "../../services/ProductAtStoreAPI";
import SearchProduct from "../../partials/component/SearchProduct";
import ProductCard from "../../partials/component/ProductCard";
import ProductSidebar from "../../partials/component/ProductSidebar";
import { useMediaQuery } from "react-responsive";

export default function ListProductAtGarage({ garageId }) {
  const { t } = useTranslation("product_at_store");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchParams, setSearchParams] = useState(null);
  const [barcodeInput, setBarcodeInput] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  // Check moblie
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const fetchListProduct = async () => {
    if (!garageId) return;
    const response = await getAllProductAtGarage(garageId, searchParams || {});
    setProducts(response.data.value || []);
  };

  useEffect(() => {
    fetchListProduct();

    //chuyen gara thi tat
    setIsSidebarOpen(false);
    setSelectedProduct(null);
  }, [garageId, searchParams]);

  // Khi click vào sản phẩm -> Fetch chi tiết sản phẩm và mở sidebar
  const handleSelectProduct = async (productId) => {
    const details = await getProductDetails(productId);
    setSelectedProduct(details.data.value);
    setIsSidebarOpen(true);
  };

  // Khi đóng sidebar -> Reset sản phẩm đang chọn
  const handleCloseSidebar = () => {
    setSelectedProduct(null);
    setIsSidebarOpen(false);
  };

  // Xử lý tìm kiếm sản phẩm từ `SearchProduct.js`
  const handleSearch = (filters) => {
    setSearchParams(filters); // Cập nhật bộ lọc và gọi API lại
    setIsSidebarOpen(false);
    setSelectedProduct(null);
  };

  ///CHUC NANG SCANING BAR CODE ===========================================================

  // ✅ Lắng nghe sự kiện quét barcode
  useEffect(() => {
    if (!isMobile) {
      const handleBarcodeScan = async (event) => {
        if (event.key === "Enter" && barcodeInput.trim() !== "") {
          console.log("Barcode scanned:", barcodeInput);
          await getProductAtGarageByBarCode(barcodeInput);
          setBarcodeInput("");
        } else {
          setBarcodeInput((prev) => prev + event.key);
        }
      };

      window.addEventListener("keydown", handleBarcodeScan);

      return () => {
        window.removeEventListener("keydown", handleBarcodeScan);
      };
    }
  }, [barcodeInput]);

  // ✅ API lấy sản phẩm theo Barcode
  const fetchProductByBarcode = async (barcode) => {
    try {
      const response = await getProductAtGarageByBarCode({
        ProductBarcode: barcode,
      });
      setSelectedProduct(response.data.value);
      setIsSidebarOpen(true);
    } catch (error) {
      console.error("Lỗi khi tìm kiếm sản phẩm:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Thanh tìm kiếm */}
      <div className="w-full flex justify-center">
        <SearchProduct onSearch={handleSearch} />
      </div>

      {/* Nút bật/tắt quét barcode (chỉ hiển thị trên mobile) */}
      {isMobile && (
        <div className="flex justify-center mt-2">
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

      {/* Quét barcode bằng camera trên mobile */}
      {isScanning && isMobile && (
        <div className="flex justify-center mt-4">
          <BarcodeScannerComponent
            width={300}
            height={200}
            onUpdate={(err, result) => {
              if (result) {
                console.log("Barcode scanned:", result.text);
                fetchProductByBarcode(result.text);
                setIsScanning(false);
              }
            }}
          />
        </div>
      )}

      {/* Container chia sidebar & danh sách sản phẩm */}
      <div className="relative flex gap-4">
        {/* Danh sách sản phẩm - Ẩn trên mobile khi sidebar mở */}
        {!isMobile || !isSidebarOpen ? (
          <div
            className={`flex-grow transition-all ${
              isSidebarOpen && !isMobile ? "w-3/4" : "w-full"
            } min-h-[250px] max-h-[calc(100vh-100px)] overflow-y-auto`}
          >
            <div
              className={`grid gap-4 ${
                isMobile ? "grid-cols-1" : "grid-cols-3"
              } grid-auto-rows`}
            >
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductCard
                    key={product.productId}
                    product={product}
                    handleSelectProduct={handleSelectProduct}
                  />
                ))
              ) : (
                <p className="text-gray-500 text-center col-span-full">
                  Không có sản phẩm nào.
                </p>
              )}
            </div>
          </div>
        ) : null}

        {/* Sidebar - Chiếm toàn bộ khi mở trên mobile, bên phải trên desktop */}
        {isSidebarOpen && (
          <div
            className={`${
              isMobile
                ? "w-full h-full fixed top-0 left-0 bg-white z-50"
                : "w-1/3 max-w-[600px] bg-white shadow-lg rounded-lg"
            } flex flex-col p-6 relative`}
          >
            <ProductSidebar
              selectedProduct={selectedProduct}
              isSidebarOpen={isSidebarOpen}
              handleCloseSidebar={handleCloseSidebar}
              isMobile={isMobile}
            />
          </div>
        )}
      </div>
    </div>
  );
}

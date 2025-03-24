import React from "react";
import MDEditor from "@uiw/react-md-editor";
import { FaTimes, FaBox } from "react-icons/fa";
import {
  getStatusLabel,
  getStatusColor,
  getStockLabel,
  getStockColor,
} from "../../schemas/ProductAtStoreSchemas";
import Barcode from "react-barcode";
import { useTranslation } from "react-i18next";

export default function ProductSidebar({
  selectedProduct,
  handleCloseSidebar,
  isMobile,
}) {
  const { t } = useTranslation("product_at_store");
  console.log("Check product tai side bar:  ", selectedProduct);

  return (
    selectedProduct && (
      <>
        {/* Nút đóng sidebar */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
          onClick={handleCloseSidebar}
        >
          <FaTimes size={18} />
        </button>

        {selectedProduct ? (
          <>
            {/* Ảnh sản phẩm */}
            <div className="w-full flex justify-center">
              <img
                src={
                  selectedProduct.productImage?.[0] ||
                  "https://via.placeholder.com/300"
                }
                alt={selectedProduct.productName}
                className="w-auto max-h-[250px] object-contain rounded-lg"
              />
            </div>

            {/* Thông tin sản phẩm */}
            <div className="mt-4 flex flex-col gap-4">
              {/* Tên sản phẩm */}
              <div>
                <label className="text-gray-500 text-sm">
                  {t("product_at_store.sidebar_product.product_name")}:
                </label>

                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedProduct.productName}
                </h2>
              </div>

              <hr className="border-gray-200" />

              {/* Giá tiền */}
              <div>
                <label className="text-gray-500 text-sm">
                  {t("product_at_store.sidebar_product.price")}:
                </label>
                <p className="text-lg font-semibold text-blue-600">
                  {selectedProduct.productPrice} VND
                </p>
              </div>

              <hr className="border-gray-200" />

              {/* Trạng thái Hoạt động/Không hoạt động */}
              <div>
                <label className="text-gray-500 text-sm">
                  {t("product_at_store.sidebar_product.status")}:
                </label>
                <span
                  className={`px-3 py-1 text-sm font-semibold rounded-md ${getStatusColor(
                    selectedProduct.productStatus
                  )}`}
                >
                  {getStatusLabel(selectedProduct.productStatus)}
                </span>
              </div>

              <hr className="border-gray-200" />

              {/* Số lượng & Tình trạng tồn kho */}
              <div>
                <label className="text-gray-500 text-sm">
                  {t("product_at_store.sidebar_product.stock_quantity")}:
                </label>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-md font-semibold">
                    <FaBox className="text-gray-600" />
                    <span className={getStockColor(selectedProduct.quantity)}>
                      {selectedProduct.quantity}
                    </span>
                  </span>
                  <span
                    className={`px-3 py-1 text-sm font-semibold rounded-md ${
                      selectedProduct.quantity > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {getStockLabel(selectedProduct.quantity)}
                  </span>
                </div>
              </div>

              <hr className="border-gray-200" />

              {/* Danh mục xe */}
              <div>
                <label className="text-gray-500 text-sm">
                  {t("product_at_store.sidebar_product.category")}:
                </label>
                <p className="text-gray-700 text-md">
                  {selectedProduct.productCategoryName}
                </p>
              </div>

              {/* Thương hiệu */}
              <div>
                <label className="text-gray-500 text-sm">
                  {t("product_at_store.sidebar_product.brand")}:
                </label>
                <p className="text-gray-700 text-md">
                  {selectedProduct.brandName}
                </p>
              </div>

              <hr className="border-gray-200" />

              {/*Barcode*/}
              <div>
                <label className="text-gray-500 text-sm">
                  {t("product_at_store.sidebar_product.barcode")}:
                </label>
                <div className="border rounded-md p-3 bg-gray-50 flex justify-center items-center">
                  <Barcode
                    value={selectedProduct.productBarcodeAtGarage}
                    width={isMobile ? 2 : 2}
                    height={isMobile ? 80 : 60}
                    fontSize={isMobile ? 10 : 15}
                    displayValue={true}
                    lineColor="#333"
                  />
                </div>
              </div>
              {/* Mô tả sản phẩm (Markdown) */}
              <div>
                <label className="text-gray-500 text-sm">
                  {t("product_at_store.sidebar_product.description")}:
                </label>
                <div
                  className="border rounded-md p-3 bg-gray-50"
                  data-color-mode="light"
                >
                  <MDEditor.Markdown
                    source={
                      selectedProduct.productDescription ||
                      t("product_at_store.sidebar_product.no_description")
                    }
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <p className="text-gray-500 text-center">
            {t("product_at_store.sidebar_product.loading")}
          </p>
        )}
      </>
    )
  );
}

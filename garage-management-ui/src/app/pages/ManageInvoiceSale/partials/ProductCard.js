import React from "react";
import Barcode from "react-barcode";
import { useTranslation } from "react-i18next";
import { FaBox, FaCalendarAlt } from "react-icons/fa";

export default function CreateInvoiceSale({ product, onSelect }) {
  const { t } = useTranslation("create_invoice_sale");

  return (
    <div
      className="p-4 border rounded-xl cursor-pointer shadow-md hover:shadow-lg hover:scale-70 transition-all bg-white flex items-center gap-4"
      onClick={() => onSelect(product)}
    >
      {/* Hình ảnh sản phẩm */}
      <div className="w-24 h-24 flex-shrink-0">
        <img
          src={product.productImage?.[0] || "/placeholder.jpg"}
          alt={product.productName}
          className="w-full h-full object-contain rounded-lg bg-gray-100 p-2"
        />
      </div>

      {/* Thông tin sản phẩm */}
      <div className="flex-1">
        {/* Tên sản phẩm */}
        <h3 className="text-md font-semibold text-gray-800">
          {product.productName}
        </h3>

        <p className="text-sm text-gray-600 mt-1">
          <span className="font-medium">
            {t("create_invoice_sale.product_card.price")}:
          </span>{" "}
          {product.productPrice
            ? product.productPrice.toLocaleString()
            : t("create_invoice_sale.product_card.not_available")}{" "}
          VND
        </p>

        {/* Tồn kho */}
        <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
          <FaBox className="text-gray-400" />
          <span className="font-medium">
            {t("create_invoice_sale.product_card.stock")}:
          </span>{" "}
          {product.quantity}
        </p>

        {/* Ngày tạo */}
        <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
          <FaCalendarAlt className="text-gray-400" />
          <span className="font-medium">
            {t("create_invoice_sale.product_card.created_at")}:
          </span>{" "}
          {new Date(product.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

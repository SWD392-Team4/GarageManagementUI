import React from "react";
import { useTranslation } from "react-i18next";

export default function ViewSoldProductsModal({
  open,
  onClose,
  invoiceDetails,
}) {
  const { t } = useTranslation("product_at_store");
  console.log("check details: ", invoiceDetails);

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-2xl">
        <h2 className="text-xl font-bold mb-4">
          {t("product_at_store.invoice.sold_products")}
        </h2>
        <div className="overflow-auto max-h-96">
          <table className="min-w-full border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">
                  {t("invoice.product_name")}
                </th>
                <th className="border px-4 py-2">
                  {t("product_at_store.invoice.quantity")}
                </th>
                <th className="border px-4 py-2">
                  {t("product_at_store.invoice.created_at")}
                </th>
              </tr>
            </thead>
            <tbody>
              {invoiceDetails?.map((product, index) => (
                <tr key={index} className="border-b">
                  <td className="border px-4 py-2">{product.productName}</td>
                  <td className="border px-4 py-2 text-center">
                    {product.quantity}
                  </td>
                  <td className="border px-4 py-2 text-right">
                    {product.createdAt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {t("product_at_store.invoice.close")}
          </button>
        </div>
      </div>
    </div>
  );
}

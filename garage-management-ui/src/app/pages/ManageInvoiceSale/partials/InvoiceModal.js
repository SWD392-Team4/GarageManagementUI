import React from "react";
import { useTranslation } from "react-i18next";
import { sAccount } from "../../AuthCustomer/services/store";

export default function InvoiceModal({ invoice, onClose }) {
  const { t } = useTranslation("manage_invoice_sale");
  console.log("check thong tin cua invoice: ", invoice);
  if (!invoice) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999]">
      <div className="bg-white shadow-2xl rounded-lg px-6 sm:px-10 pt-6 sm:pt-8 pb-6 sm:pb-10 w-full max-w-full sm:max-w-4xl border border-gray-300 relative overflow-auto max-h-[90vh]">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">
          {t("manage_invoice_sale.form_view_modal.invoiceTitle")}
        </h1>
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-b pb-6 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              {t("manage_invoice_sale.form_view_modal.paymentInvoice")}
            </h2>
            <p className="text-gray-500">
              {t("manage_invoice_sale.form_view_modal.invoiceCode")}:{" "}
              <span className="text-gray-800 font-medium">#{invoice.id}</span>
            </p>
          </div>
          <div className="sm:text-right text-gray-600">
            <p>
              <strong>
                {t("manage_invoice_sale.form_view_modal.createdAt")}:
              </strong>{" "}
              {new Date(invoice.createdAt).toLocaleString()}
            </p>
            <p>
              <strong>
                {t("manage_invoice_sale.form_view_modal.updatedAt")}:
              </strong>{" "}
              {new Date(invoice.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-50 p-4 sm:p-6 rounded-lg shadow-inner mb-6">
          <div>
            <p>
              <strong>
                {t("manage_invoice_sale.form_view_modal.customer")}:
              </strong>{" "}
              {invoice.customerName}
            </p>
            <p>
              <strong>{t("manage_invoice_sale.form_view_modal.phone")}:</strong>{" "}
              {invoice.customerPhoneNumber}
            </p>
            <p>
              <strong>{t("manage_invoice_sale.form_view_modal.email")}:</strong>{" "}
              {invoice.customerEmail}
            </p>
          </div>

          <div>
            <p>
              <strong>
                {t("manage_invoice_sale.form_view_modal.seller")}:
              </strong>{" "}
              {sAccount.value.lastName} {sAccount.value.firstName}
            </p>
            <p>
              <strong>
                {t("manage_invoice_sale.form_view_modal.sellerPhone")}:
              </strong>{" "}
              {sAccount.value.phoneNumber}
            </p>
            <p>
              <strong>
                {t("manage_invoice_sale.form_view_modal.sellerEmail")}:
              </strong>{" "}
              {sAccount.value.email}
            </p>
          </div>
        </div>

        <h3 className="text-lg sm:text-xl font-bold mb-4">
          {t("manage_invoice_sale.form_view_modal.productDetails")}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-left">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">
                  {t("manage_invoice_sale.form_view_modal.productName")}
                </th>
                <th className="border border-gray-300 p-2 text-center">
                  {t("manage_invoice_sale.form_view_modal.quantity")}
                </th>
              </tr>
            </thead>
            <tbody>
              {invoice.invoiceSellProducts.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">
                    {item.productName}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg sm:text-xl font-bold">
            {t("manage_invoice_sale.form_view_modal.totalPrice")}:
          </h3>
          <h3 className="text-lg sm:text-xl font-bold text-green-600">
            {invoice.totalPrice.toLocaleString()} VND
          </h3>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            <strong>TurboTrack</strong> - Garage buôn bán phụ tùng và chăm sóc
            xe
          </p>
          <p>
            {t("manage_invoice_sale.form_view_modal.address")}: 123 Đường ABC,
            TP.HCM | Hotline: 0909 123 456
          </p>
          <p>{t("manage_invoice_sale.form_view_modal.thankYou")}</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-end mt-4 space-x-0 sm:space-x-2 border-t pt-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded w-full sm:w-auto"
            onClick={onClose}
          >
            {t("manage_invoice_sale.form_view_modal.close")}
          </button>
        </div>
      </div>
    </div>
  );
}

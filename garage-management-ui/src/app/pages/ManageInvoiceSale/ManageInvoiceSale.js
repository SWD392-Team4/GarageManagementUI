import React from "react";
import ListInvoiceSale from "./partials/ListInvoiceSale";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../AdminManageAppoinment/partials/Breadcrumb";
import { sAccount } from "../AuthCustomer/services/store";

export default function ManageInvoiceSale() {
  const { t } = useTranslation("manage_invoice_sale");
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-lg p-6">
      <Breadcrumb />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">
          {t("manage_invoice_sale.title")}
        </h1>
        <button
          className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-900"
          onClick={() =>
            navigate(`/${sAccount.value.role}/invoice-sale/create`)
          }
        >
          {t("manage_invoice_sale.create")}
        </button>
      </div>
      <ListInvoiceSale />
    </div>
  );
}

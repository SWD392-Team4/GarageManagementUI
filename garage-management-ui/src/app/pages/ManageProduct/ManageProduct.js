import React from "react";
import { useNavigate } from "react-router-dom";
import ListProduct from "./partials/ListProduct";
import { useTranslation } from "react-i18next";
import Breadcrumb from "../AdminManageAppoinment/partials/Breadcrumb";
import { sAccount } from "../AuthCustomer/services/store";

export default function ManageProduct() {
  const { t } = useTranslation("manage_product");
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-lg p-6">
      <Breadcrumb />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">{t("manage_product.title")}</h1>

        {sAccount.value.role === "Administrator" && (
          <button
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-900"
            onClick={() => navigate(`/${sAccount.value.role}/product/create`)}
          >
            {t("manage_product.create")}
          </button>
        )}
      </div>
      <ListProduct />
    </div>
  );
}

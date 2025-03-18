import React, { useState } from "react";
import ListGoodsIssued from "./partials/ListGoodsIssued";
import Breadcrumb from "../AdminManageAppoinment/partials/Breadcrumb";
import { useTranslation } from "react-i18next";
import { Navigate, useNavigate } from "react-router-dom";
import { sAccount } from "../AuthCustomer/services/store";

export default function ManageGoodsIssued() {
  const { t } = useTranslation("manage_goods_issued");
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-lg p-6">
      <Breadcrumb />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">
          {t("manage_goods_issued.title")}
        </h1>
        {(sAccount.value.role === "Administrator" ||
          sAccount.value.role === "WarehouseManager") && (
          <button
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-900"
            onClick={() =>
              navigate(
                `/${sAccount.value.role}/invoice-goodsIssued/create-goodsIssued`
              )
            }
          >
            {t("manage_goods_issued.create")}
          </button>
        )}
      </div>
      <ListGoodsIssued />
    </div>
  );
}

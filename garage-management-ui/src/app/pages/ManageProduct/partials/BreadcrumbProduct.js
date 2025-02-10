import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";

export default function BreadcrumbProduct() {
    const { t, i18n } = useTranslation("breadcrumb_product");
    const navigate = useNavigate();
    const location = useLocation();

    const isCreatePage = location.pathname.includes("create");
    const currentPage = isCreatePage ? t("breadcrumb_product.create") : t("breadcrumb_product.details");

    return (
        <nav key={i18n.language} className="text-gray-600 text-sm mb-4">
            <ol className="list-reset flex">
                <li>
                    <button className="text-blue-500 hover:underline" onClick={() => navigate("/admin/product")}>
                        {t("breadcrumb_product.products")}
                    </button>
                </li>
                <li><span className="mx-2">/</span></li>
                <li className="text-gray-900">{currentPage}</li>
            </ol>
        </nav>
    );
}

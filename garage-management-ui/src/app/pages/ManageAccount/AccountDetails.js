import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaArrowLeft } from "react-icons/fa";

export default function AccountDetails() {
    const { id } = useParams(); // Lấy ID từ URL
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [account, setAccount] = useState(null);

    // Giả lập gọi API để lấy thông tin tài khoản
    useEffect(() => {
        const fetchAccount = async () => {
            // Dữ liệu giả lập, sau này thay bằng API
            const fakeData = [
                { id: 1, name: "Nguyễn Văn A", email: "a@gmail.com", status: "Active" },
            ];
            const foundAccount = fakeData.find(acc => acc.id === parseInt(id));
            setAccount(foundAccount || null);
        };

        fetchAccount();
    }, [id]);

    if (!account) {
        return <p>{t("manage_account.not_found")}</p>;
    }

    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
            {/* Breadcrumb */}
            <nav className="text-gray-600 text-sm mb-4">
                <ol className="list-reset flex">
                    <li>
                        <button className="text-blue-500 hover:underline" onClick={() => navigate("/admin/account")}> {t("manage_account.list")} </button>
                    </li>
                    <li>
                        <span className="mx-2">/</span>
                    </li>
                    <li className="text-gray-900">{t("manage_account.details")}</li>
                </ol>
            </nav>

            <button
                className="flex items-center gap-2 text-blue-500 hover:underline mb-4"
                onClick={() => navigate("/admin/account")}
            >
                <FaArrowLeft /> {t("manage_account.back")}
            </button>

            <h1 className="text-2xl font-semibold my-4">{t("manage_account.details")}</h1>

            <div className="grid grid-cols-2 gap-4">
                <p><strong>{t("manage_account.id")}:</strong> {account.id}</p>
                <p><strong>{t("manage_account.name")}:</strong> {account.name}</p>
                <p><strong>{t("manage_account.email")}:</strong> {account.email}</p>
                <p><strong>{t("manage_account.status")}:</strong> {account.status}</p>
            </div>
        </div>
    );
}

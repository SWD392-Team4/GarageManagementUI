import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import BaseTable from "../../../components/BaseTable/BaseTable";
import { useTranslation } from "react-i18next";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

export default function ListAccount({ languageKey }) {
    const { t } = useTranslation();
    const navigate = useNavigate();

    // Dữ liệu tài khoản giả lập (Sau này có thể gọi API)
    const data = useMemo(() => [
        { id: 1, name: "Nguyễn Văn A", email: "a@gmail.com", status: "Active" },
        { id: 2, name: "Trần Thị B", email: "b@gmail.com", status: "Inactive" },
    ], []);

    // Cấu hình cột
    const columns = useMemo(() => [
        { header: t("manage_account.id"), accessorKey: "id" },
        { header: t("manage_account.name"), accessorKey: "name" },
        { header: t("manage_account.email"), accessorKey: "email" },
        { header: t("manage_account.status"), accessorKey: "status" },
    ], [t, languageKey]);

    // Hành động cho tài khoản
    const actions = [
        {
            label: t("manage_account.view"),
            icon: <FaEye />,
            color: "bg-gray-500",
            onClick: (row) => navigate(`/admin/account/${row.id}`) // Chuyển hướng sang trang chi tiết
        },
        // {
        //     label: t("manage_account.edit"),
        //     icon: <FaEdit />,
        //     color: "bg-blue-500",
        //     onClick: (row) => alert(`${t("manage_account.editing")}: ${row.name}`)
        // },
        // {
        //     label: t("manage_account.delete"),
        //     icon: <FaTrash />,
        //     color: "bg-red-500",
        //     onClick: (row) => alert(`${t("manage_account.deleting")}: ${row.name}`)
        // }
    ];

    return <BaseTable title={t("manage_account.title")} columns={columns} data={data} actions={actions} />;
}

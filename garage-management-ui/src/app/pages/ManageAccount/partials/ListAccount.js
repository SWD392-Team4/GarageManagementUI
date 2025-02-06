import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BaseTable from "../../../components/BaseTable/BaseTable";
import { useTranslation } from "react-i18next";
import { FaEye } from "react-icons/fa";

export default function ListAccount({ languageKey }) {
    const { t } = useTranslation("manage_account");
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({ total: 12, page: 1, pageSize: 4 });

    // Giả lập API fetch dữ liệu
    const fetchData = async (page) => {
        const fakeData = {
            1: [
                { id: 1, name: "Nguyễn Văn A", email: "a@gmail.com", status: "Active" },
                { id: 2, name: "Trần Thị B", email: "b@gmail.com", status: "Inactive" },
                { id: 3, name: "Lê Văn C", email: "c@gmail.com", status: "Active" },
                { id: 4, name: "Phạm Thị D", email: "d@gmail.com", status: "Inactive" }
            ],
            2: [
                { id: 5, name: "Hoàng Văn E", email: "e@gmail.com", status: "Active" },
                { id: 6, name: "Trần Văn F", email: "f@gmail.com", status: "Inactive" },
                { id: 7, name: "Lê Thị G", email: "g@gmail.com", status: "Active" },
                { id: 8, name: "Đặng Văn H", email: "h@gmail.com", status: "Inactive" }
            ],
            3: [
                { id: 9, name: "Nguyễn Văn I", email: "i@gmail.com", status: "Active" },
                { id: 10, name: "Trần Thị J", email: "j@gmail.com", status: "Inactive" },
                { id: 11, name: "Lê Văn K", email: "k@gmail.com", status: "Active" },
                { id: 12, name: "Phạm Văn L", email: "l@gmail.com", status: "Inactive" }
            ]
        };
        return { data: fakeData[page] || [], total: 12 };
    };

    useEffect(() => {
        fetchData(pagination.page).then(response => {
            setData(response.data);
            setPagination(prev => ({ ...prev, total: response.total }));
        });
    }, [pagination.page]);

    const columns = useMemo(() => [
        { header: t("manage_account.id"), accessorKey: "id" },
        { header: t("manage_account.name"), accessorKey: "name" },
        { header: t("manage_account.email"), accessorKey: "email" },
        { header: t("manage_account.status"), accessorKey: "status" },
    ], [t, languageKey]);

    const actions = [
        {
            label: t("manage_account.view"),
            icon: <FaEye />,
            color: "bg-gray-500",
            onClick: (row) => navigate(`/admin/account/${row.id}`)
        }
    ];

    return <BaseTable columns={columns} data={data} actions={actions} pagination={pagination} fetchData={fetchData} />;
}
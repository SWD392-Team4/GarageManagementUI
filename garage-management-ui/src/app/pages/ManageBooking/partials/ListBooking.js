import React, { useMemo, useState, useEffect } from "react";
import BaseTable from "../../../components/BaseTable/BaseTable";
import { useTranslation } from "react-i18next";
import { FaCheck, FaEye } from "react-icons/fa";

export default function ListBooking({ languageKey }) {
    const { t } = useTranslation("manage_booking");
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({ total: 6, page: 1, pageSize: 2 });

    // Giả lập API fetch dữ liệu
    const fetchData = async (page) => {
        const fakeData = {
            1: [
                { id: 101, customer: "Trần Văn A", room: "101", status: "Confirmed" },
                { id: 102, customer: "Nguyễn Thị B", room: "202", status: "Pending" }
            ],
            2: [
                { id: 103, customer: "Lê Văn C", room: "303", status: "Confirmed" },
                { id: 104, customer: "Phạm Thị D", room: "404", status: "Pending" }
            ],
            3: [
                { id: 105, customer: "Hoàng Văn E", room: "505", status: "Confirmed" },
                { id: 106, customer: "Đặng Thị F", room: "606", status: "Pending" }
            ]
        };
        return { data: fakeData[page] || [], total: 6 };
    };

    useEffect(() => {
        fetchData(pagination.page).then(response => {
            setData(response.data);
            setPagination(prev => ({ ...prev, total: response.total }));
        });
    }, [pagination.page]);

    const columns = useMemo(() => [
        { header: t("manage_booking.id"), accessorKey: "id" },
        { header: t("manage_booking.customer"), accessorKey: "customer" },
        { header: t("manage_booking.room"), accessorKey: "room" },
        { header: t("manage_booking.status"), accessorKey: "status" },
    ], [t, languageKey]);

    const actions = [
        {
            label: t("manage_booking.confirm"),
            icon: <FaEye />,
            color: "bg-gray-500",
            onClick: (row) => alert(`${t("manage_booking.confirming")}: ${row.customer}`)
        }
    ];

    return <BaseTable columns={columns} data={data} actions={actions} pagination={pagination} fetchData={fetchData} />;
}
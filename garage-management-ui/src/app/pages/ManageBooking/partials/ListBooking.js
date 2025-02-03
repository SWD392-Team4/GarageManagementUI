import React, { useMemo } from "react";
import BaseTable from "../../../components/BaseTable/BaseTable";
import { useTranslation } from "react-i18next";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function ListBooking({ languageKey }) {
    const { t } = useTranslation();

    // Dữ liệu đặt phòng (sau này có thể gọi API)
    const data = useMemo(() => [
        { id: 101, customer: "Trần Văn A", room: "101", status: "Confirmed" },
        { id: 102, customer: "Nguyễn Thị B", room: "202", status: "Pending" },
    ], []);

    // Cấu hình cột
    const columns = useMemo(() => [
        { header: t("manage_booking.id"), accessorKey: "id" },
        { header: t("manage_booking.customer"), accessorKey: "customer" },
        { header: t("manage_booking.room"), accessorKey: "room" },
        { header: t("manage_booking.status"), accessorKey: "status" },
    ], [t, languageKey]);

    // Hành động cho đặt phòng
    const actions = [
        {
            label: t("manage_booking.confirm"),
            icon: <FaCheck />,
            color: "bg-green-500",
            onClick: (row) => alert(`${t("manage_booking.confirming")}: ${row.customer}`)
        },
        // {
        //     label: t("manage_booking.cancel"),
        //     icon: <FaTimes />,
        //     color: "bg-red-500",
        //     onClick: (row) => alert(`${t("manage_booking.cancelling")}: ${row.customer}`)
        // }
    ];

    return <BaseTable title={t("manage_booking.title")} columns={columns} data={data} actions={actions} />;
}

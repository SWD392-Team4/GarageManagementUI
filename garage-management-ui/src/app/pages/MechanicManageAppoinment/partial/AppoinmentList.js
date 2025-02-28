import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import BaseTable from "../../../components/BaseTable/BaseTable";
import { FilterAppointment } from "../../AdminManageAppoinment/services/store/FilterStore";
import FilterTablePost from "./FilterTablePosts";

export default function ListAppoinment({ type }) {
  const { t, i18n } = useTranslation("appoinment-admin");
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    total: 12,
    page: 1,
    pageSize: 4,
  });

  // Hàm fetch data giả lập dựa trên số trang
  const fetchData = async (page) => {
    const fakeData = {
      1: [
        {
          id: 1,
          customerName: "Nguyễn Văn A",
          customerPhone: "0901234567",
          actualAppointmentTime: "2024-02-20 10:00",
          estimatedEndTime: "2024-02-20 12:00",
          actualEndTime: "2024-02-20 11:45",
          status: "Đang xử lý",
        },
        {
          id: 2,
          customerName: "Lê Thị B",
          customerPhone: "0907654321",
          actualAppointmentTime: "2024-02-20 11:00",
          estimatedEndTime: "2024-02-20 13:00",
          actualEndTime: "2024-02-20 13:00",
          status: "Hoàn thành",
        },
        {
          id: 3,
          customerName: "Phạm Văn C",
          customerPhone: "0912345678",
          actualAppointmentTime: "2024-02-21 09:30",
          estimatedEndTime: "2024-02-21 11:30",
          actualEndTime: "Chưa có",
          status: "Chờ xử lý",
        },
        {
          id: 4,
          customerName: "Trần Thị D",
          customerPhone: "0911122233",
          actualAppointmentTime: "2024-02-21 14:00",
          estimatedEndTime: "2024-02-21 16:00",
          actualEndTime: "Chưa có",
          status: "Đang xử lý",
        },
      ],
      2: [
        {
          id: 5,
          customerName: "Lê Minh E",
          customerPhone: "0987654321",
          actualAppointmentTime: "2024-02-22 10:00",
          estimatedEndTime: "2024-02-22 12:00",
          actualEndTime: "2024-02-22 11:50",
          status: "Hoàn thành",
        },
        {
          id: 6,
          customerName: "Đỗ Thị F",
          customerPhone: "0976543210",
          actualAppointmentTime: "2024-02-22 11:30",
          estimatedEndTime: "2024-02-22 13:30",
          actualEndTime: "Chưa có",
          status: "Chờ xử lý",
        },
        {
          id: 7,
          customerName: "Phan Văn G",
          customerPhone: "0965432109",
          actualAppointmentTime: "2024-02-23 09:00",
          estimatedEndTime: "2024-02-23 11:00",
          actualEndTime: "2024-02-23 10:45",
          status: "Đang xử lý",
        },
        {
          id: 8,
          customerName: "Ngô Thị H",
          customerPhone: "0954321098",
          actualAppointmentTime: "2024-02-23 14:30",
          estimatedEndTime: "2024-02-23 16:30",
          actualEndTime: "Chưa có",
          status: "Hoàn thành",
        },
      ],
      3: [
        {
          id: 9,
          customerName: "Đặng Thị I",
          customerPhone: "0943210987",
          actualAppointmentTime: "2024-02-24 08:30",
          estimatedEndTime: "2024-02-24 10:30",
          actualEndTime: "Chưa có",
          status: "Đang xử lý",
        },
        {
          id: 10,
          customerName: "Vũ Văn J",
          customerPhone: "0932109876",
          actualAppointmentTime: "2024-02-24 11:00",
          estimatedEndTime: "2024-02-24 13:00",
          actualEndTime: "Chưa có",
          status: "Chờ xử lý",
        },
        {
          id: 11,
          customerName: "Bùi Minh K",
          customerPhone: "0921098765",
          actualAppointmentTime: "2024-02-25 09:30",
          estimatedEndTime: "2024-02-25 11:30",
          actualEndTime: "2024-02-25 11:20",
          status: "Hoàn thành",
        },
        {
          id: 12,
          customerName: "Tô Thị L",
          customerPhone: "0910987654",
          actualAppointmentTime: "2024-02-25 14:00",
          estimatedEndTime: "2024-02-25 16:00",
          actualEndTime: "Chưa có",
          status: "Đang xử lý",
        },
      ],
    };
    return { data: fakeData[page] || [], total: 12 };
  };

  // Load data khi thay đổi trang
  useEffect(() => {
    fetchData(pagination.page).then((response) => {
      setData(response.data);
      setPagination((prev) => ({ ...prev, total: response.total }));
    });
  }, [pagination.page]);

  // Định nghĩa các cột dựa trên các trường mới
  const columns = useMemo(
    () => [
      { header: t("ID"), accessorKey: "id" },
      { header: t("Customer Name"), accessorKey: "customerName" },
      { header: t("Customer Phone"), accessorKey: "customerPhone" },
      {
        header: t("Actual Appointment Time"),
        accessorKey: "actualAppointmentTime",
      },
      { header: t("Estimated End Time"), accessorKey: "estimatedEndTime" },
      { header: t("Actual End Time"), accessorKey: "actualEndTime" },
      { header: t("Status"), accessorKey: "status" },
    ],
    [t, i18n.language]
  );

  // Các action (ví dụ: chuyển hướng đến trang chi tiết)
  const actions = [
    {
      type: "link",
      label: t("manage_product.view"),
      icon: <FaEye />,
      color: "bg-gray-500",
      link: (id) => `detail/${id}`,
    },
  ];

  return (
    <div>
      <FilterTablePost />
      <div className="my-5">
        <BaseTable
          columns={columns}
          data={data}
          actions={actions}
          pagination={pagination}
          fetchData={fetchData}
        />
      </div>
    </div>
  );
}

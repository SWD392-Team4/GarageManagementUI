import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import BaseTable from "../../../components/BaseTable/BaseTable";
import { FaEye } from "react-icons/fa";
import { TbAugmentedReality } from "react-icons/tb";
import { sServicesInAppointment } from "../services/store/FilterStore"

export default function ServicesInAppointment() {
  const { t, i18n } = useTranslation("appoinment-admin");
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    total: 3,
    page: 1,
    pageSize: 4,
  });
  useEffect(() => {
    fetchData(pagination.page).then((response) => {
      setData(response.data);
      setPagination((prev) => ({ ...prev, total: response.total }));
    });
  }, [pagination.page]);
  const fetchData = async (page) => {
    const fakeData = {
      1: [
        {
          id: 1,
          service: "Bảo dưỡng định kỳ",
          employee: "Nguyễn Văn A",
          "estimated-end-time": "2024-02-20 14:00",
          "actual-end-time": "2024-02-20 13:30",
          price: "5,000,000 VND",
          "created-time": "2024-02-18 10:00",
          "update-time": "2024-02-19 15:45",
          status: "Hoàn thành",
          "service-note": "Thay dầu nhớt, kiểm tra phanh",
        },
        {
          id: 2,
          service: "Sửa chữa động cơ",
          employee: "Trần Huy B",
          "estimated-end-time": "2024-02-21 10:00",
          "actual-end-time": "2024-02-21 09:45",
          price: "2,500,000 VND",
          "created-time": "2024-02-19 09:30",
          "update-time": "2024-02-20 14:20",
          status: "Hoàn thành",
          "service-note": "Sửa chữa bugi, thay lọc gió",
        },
        {
          id: 3,
          service: "Thay thế phụ tùng",
          employee: "Lê Thị C",
          "estimated-end-time": "2024-02-22 16:00",
          "actual-end-time": "Chưa có",
          price: "1,200,000 VND",
          "created-time": "2024-02-20 08:00",
          "update-time": "2024-02-21 13:00",
          status: "Đang xử lý",
          "service-note": "Thay má phanh, kiểm tra hệ thống lái",
        },
        {
          id: 4,
          service: "Kiểm tra tổng thể",
          employee: "Hoàng Văn D",
          "estimated-end-time": "2024-02-23 11:00",
          "actual-end-time": "Chưa có",
          price: "800,000 VND",
          "created-time": "2024-02-21 12:00",
          "update-time": "2024-02-22 15:30",
          status: "Đang xử lý",
          "service-note": "Kiểm tra hệ thống điện, lốp xe",
        },
        {
          id: 5,
          service: "Bảo dưỡng nhanh",
          employee: "Phạm Minh E",
          "estimated-end-time": "2024-02-24 15:00",
          "actual-end-time": "2024-02-24 14:50",
          price: "3,500,000 VND",
          "created-time": "2024-02-22 11:00",
          "update-time": "2024-02-23 16:45",
          status: "Hoàn thành",
          "service-note": "Kiểm tra dầu máy, làm sạch kim phun",
        },
      ],
    };

    return { data: fakeData[page] || [], total: 4 };
  };

  const columns = useMemo(
    () => [
      { header: t("list-services.title1"), accessorKey: "id", accessorFn: (_row, index) => index + 1 },
      { header: t("list-services.title2"), accessorKey: "service" },
      { header: t("list-services.title3"), accessorKey: "employee" },
      { header: t("list-services.title4"), accessorKey: "estimated-end-time" },
      { header: t("list-services.title5"), accessorKey: "actual-end-time" },
      { header: t("list-services.title6"), accessorKey: "price" },
      { header: t("list-services.title7"), accessorKey: "created-time" },
      { header: t("list-services.title8"), accessorKey: "update-time" },
      { header: t("list-services.title9"), accessorKey: "status" },
      { header: t("list-services.title10"), accessorKey: "service-note" },
    ],
    [t, i18n.language]
  );
  const actions = [
    {
      label: t("manage_product.view"),
      icon: <TbAugmentedReality />,
      color: "bg-gray-500",
      link: (id) => `${id}`,
    },
  ];

  return (
    <>
      <div className="bg-gray-300 text-sm uppercase mt-5 p-2 font-title font-bold">
        {" "}
        Services in appointment{" "}
      </div>
      <div className="">
        <BaseTable
          columns={columns}
          data={data}
          actions={actions}
          pagination={pagination}
          fetchData={fetchData}
          signifyInformation={sServicesInAppointment.value}
        />
      </div>
    </>
  );
}

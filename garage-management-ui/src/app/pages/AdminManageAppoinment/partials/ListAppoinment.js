import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import BaseTable from "../../../components/BaseTable/BaseTable";

export default function ListAppoinment({ type }) {
  const { t, i18n } = useTranslation("appoinment-admin");
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    total: 12,
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
          customer: "Nguyễn Văn A",
          employee: "Trần B",
          type: "Bảo dưỡng",
          status: "Đang xử lý",
          "expected-price": "5,000,000 VND",
          "estimated-time": "2 giờ",
          "actual-time": "1.5 giờ",
          "estimated-end": "2024-02-20 14:00",
          "actual-end-time": "2024-02-20 13:30",
        },
        {
          id: 2,
          customer: "Lê Thị C",
          employee: "Nguyễn D",
          type: "Sửa chữa",
          status: "Hoàn thành",
          "expected-price": "2,500,000 VND",
          "estimated-time": "3 giờ",
          "actual-time": "2.5 giờ",
          "estimated-end": "2024-02-21 10:00",
          "actual-end-time": "2024-02-21 09:45",
        },
        {
          id: 3,
          customer: "Phạm Văn E",
          employee: "Hoàng F",
          type: "Thay thế linh kiện",
          status: "Chờ xử lý",
          "expected-price": "1,200,000 VND",
          "estimated-time": "1 giờ",
          "actual-time": "Chưa có",
          "estimated-end": "2024-02-22 16:00",
          "actual-end-time": "Chưa có",
        },
        {
          id: 4,
          customer: "Trần Văn G",
          employee: "Lý H",
          type: "Kiểm tra định kỳ",
          status: "Đang xử lý",
          "expected-price": "800,000 VND",
          "estimated-time": "2 giờ",
          "actual-time": "1 giờ",
          "estimated-end": "2024-02-23 11:00",
          "actual-end-time": "Chưa có",
        },
        {
          id: 5,
          customer: "Nguyễn Văn A",
          employee: "Trần B",
          type: "Bảo dưỡng",
          status: "Đang xử lý",
          "expected-price": "5,000,000 VND",
          "estimated-time": "2 giờ",
          "actual-time": "1.5 giờ",
          "estimated-end": "2024-02-20 14:00",
          "actual-end-time": "2024-02-20 13:30",
        },
        {
          id: 6,
          customer: "Lê Thị C",
          employee: "Nguyễn D",
          type: "Sửa chữa",
          status: "Hoàn thành",
          "expected-price": "2,500,000 VND",
          "estimated-time": "3 giờ",
          "actual-time": "2.5 giờ",
          "estimated-end": "2024-02-21 10:00",
          "actual-end-time": "2024-02-21 09:45",
        },
        {
          id: 7,
          customer: "Phạm Văn E",
          employee: "Hoàng F",
          type: "Thay thế linh kiện",
          status: "Chờ xử lý",
          "expected-price": "1,200,000 VND",
          "estimated-time": "1 giờ",
          "actual-time": "Chưa có",
          "estimated-end": "2024-02-22 16:00",
          "actual-end-time": "Chưa có",
        },
        {
          id: 8,
          customer: "Trần Văn G",
          employee: "Lý H",
          type: "Kiểm tra định kỳ",
          status: "Đang xử lý",
          "expected-price": "800,000 VND",
          "estimated-time": "2 giờ",
          "actual-time": "1 giờ",
          "estimated-end": "2024-02-23 11:00",
          "actual-end-time": "Chưa có",
        },
      ],
      2: [
        {
          id: 5,
          customer: "Lê Minh I",
          employee: "Nguyễn K",
          type: "Bảo dưỡng",
          status: "Hoàn thành",
          "expected-price": "3,500,000 VND",
          "estimated-time": "2.5 giờ",
          "actual-time": "2 giờ",
          "estimated-end": "2024-02-24 15:00",
          "actual-end-time": "2024-02-24 14:50",
        },
        {
          id: 6,
          customer: "Đỗ Thị M",
          employee: "Trịnh N",
          type: "Sửa chữa",
          status: "Chờ xử lý",
          "expected-price": "6,000,000 VND",
          "estimated-time": "3.5 giờ",
          "actual-time": "Chưa có",
          "estimated-end": "2024-02-25 09:00",
          "actual-end-time": "Chưa có",
        },
        {
          id: 7,
          customer: "Phan Văn O",
          employee: "Hoàng P",
          type: "Thay thế linh kiện",
          status: "Đang xử lý",
          "expected-price": "900,000 VND",
          "estimated-time": "1.5 giờ",
          "actual-time": "1 giờ",
          "estimated-end": "2024-02-26 13:00",
          "actual-end-time": "Chưa có",
        },
        {
          id: 8,
          customer: "Ngô Văn Q",
          employee: "Trần R",
          type: "Kiểm tra định kỳ",
          status: "Hoàn thành",
          "expected-price": "700,000 VND",
          "estimated-time": "1 giờ",
          "actual-time": "1 giờ",
          "estimated-end": "2024-02-27 17:00",
          "actual-end-time": "2024-02-27 16:55",
        },
      ],
      3: [
        {
          id: 9,
          customer: "Đặng Thị S",
          employee: "Lê T",
          type: "Bảo dưỡng",
          status: "Đang xử lý",
          "expected-price": "4,200,000 VND",
          "estimated-time": "3 giờ",
          "actual-time": "2.5 giờ",
          "estimated-end": "2024-02-28 10:30",
          "actual-end-time": "Chưa có",
        },
        {
          id: 10,
          customer: "Vũ Văn U",
          employee: "Phạm V",
          type: "Sửa chữa",
          status: "Chờ xử lý",
          "expected-price": "5,500,000 VND",
          "estimated-time": "4 giờ",
          "actual-time": "Chưa có",
          "estimated-end": "2024-03-01 12:00",
          "actual-end-time": "Chưa có",
        },
        {
          id: 11,
          customer: "Bùi Minh W",
          employee: "Nguyễn X",
          type: "Thay thế linh kiện",
          status: "Hoàn thành",
          "expected-price": "1,000,000 VND",
          "estimated-time": "1.2 giờ",
          "actual-time": "1.2 giờ",
          "estimated-end": "2024-03-02 14:30",
          "actual-end-time": "2024-03-02 14:25",
        },
        {
          id: 12,
          customer: "Tô Thị Y",
          employee: "Hoàng Z",
          type: "Kiểm tra định kỳ",
          status: "Đang xử lý",
          "expected-price": "600,000 VND",
          "estimated-time": "1 giờ",
          "actual-time": "0.5 giờ",
          "estimated-end": "2024-03-03 16:45",
          "actual-end-time": "Chưa có",
        },
      ],
    };
    return { data: fakeData[page] || [], total: 12 };
  };

  const columns = useMemo(
    () => [
      { header: t("title1"), accessorKey: "id" },
      { header: t("title2"), accessorKey: "customer" },
      { header: t("title3"), accessorKey: "employee" },
      { header: t("title4"), accessorKey: "type" },
      { header: t("title5"), accessorKey: "status" },
      { header: t("title6"), accessorKey: "expected-price" },
      { header: t("title7"), accessorKey: "estimated-time" },
      { header: t("title8"), accessorKey: "actual-time" },
      { header: t("title9"), accessorKey: "estimated-end" },
      { header: t("title10"), accessorKey: "actual-end-time" },
    ],
    [t, i18n.language]
  );
  const actions = [
    {
      type: "link",
      label: t("manage_product.view"),
      icon: <FaEye />,
      color: "bg-gray-500",
      link: (id) => `${id}`,
    },
    {
      type: "link",
      label: t("manage_product.view"),
      icon: <FaEye />,
      color: "bg-gray-500",
      link: (id) => `${id}`,
    },
    {
      type: "link",
      label: t("manage_product.view"),
      icon: <FaEye />,
      color: "bg-gray-500",
      link: (id) => `${id}`,
    },
    {
      type: "link",
      label: t("manage_product.view"),
      icon: <FaEye />,
      color: "bg-gray-500",
      link: (id) => `${id}`,
    },
    {
      type: "link",
      label: t("manage_product.view"),
      icon: <FaEye />,
      color: "bg-gray-500",
      link: (id) => `${id}`,
    },
  ];
  return (
    <div className="my-5">
      <BaseTable
        columns={columns}
        data={data}
        actions={actions}
        pagination={pagination}
        fetchData={fetchData}
      />
    </div>
  );
}

import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import BaseTable from "../../../components/BaseTable/BaseTable";
import { FaEye } from "react-icons/fa";
import { TbAugmentedReality } from "react-icons/tb";
import { sPackeagesInAppointment } from "../services/store/FilterStore"

export default function PackeagesINAppointment() {
  const { t, i18n } = useTranslation("appoinment-admin");
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    total: 3,
    page: 1,
    pageSize: 10,
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
          "name-package": "Gói Bảo Dưỡng Định Kỳ",
          "validity-period": "12",
          "time-unit": "Tháng",
          "usage-limit": "4",
          "usage-count": "2",
          "start-date": "2024-01-15",
          "end-time": "2025-01-15",
          price: "5,000,000 VND",
          status: "Hoạt động",
          // "service-note": "Thay dầu nhớt, kiểm tra phanh",
        },
      ],
    };

    return { data: fakeData[page] || [], total: 1 };
  };

  const columns = useMemo(
    () => [
      { header: t("list-packages.title1"), accessorKey: "id", accessorFn: (_row, index) => index + 1 },
      { header: t("list-packages.title2"), accessorKey: "name-package" },
      { header: t("list-packages.title3"), accessorKey: "validity-period" },
      { header: t("list-packages.title4"), accessorKey: "time-unit" },
      { header: t("list-packages.title5"), accessorKey: "usage-limit" },
      { header: t("list-packages.title6"), accessorKey: "usage-count" },
      { header: t("list-packages.title7"), accessorKey: "start-date" },
      { header: t("list-packages.title8"), accessorKey: "end-time" },
      { header: t("list-packages.title9"), accessorKey: "status" },
      { header: t("list-packages.title10"), accessorKey: "price" },
      // { header: t("list-packages.title11"), accessorKey: "service-note" },
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
        Packages in appointment{" "}
      </div>
      <div className="">
        <BaseTable
          columns={columns}
          data={data}
          actions={actions}
          pagination={pagination}
          fetchData={fetchData}
          signifyInformation={sPackeagesInAppointment.value}
        />
      </div>
    </>
  );
}

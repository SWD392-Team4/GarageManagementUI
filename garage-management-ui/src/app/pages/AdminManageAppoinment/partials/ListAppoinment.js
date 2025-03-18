import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaEye } from "react-icons/fa";
import BaseTable from "../../../components/BaseTable/BaseTable";
import { getAllAppointment } from "../services/AppointmentService";
import { AppointmentSignify } from "../services/store/AppointmentSignify";
import {
  FilterAppointment,
  sListApointment,
} from "../services/store/FilterStore";
import { sAccount } from "../../AuthCustomer/services/store";

export default function ListAppoinment({ status }) {
  const { t, i18n } = useTranslation("appoinment-admin");
  const [appointments, SetAppointment] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    hasPrevious: false,
    hasNext: false,
  });
  const filter = FilterAppointment.use();
  const appointmentSignify = AppointmentSignify.use();
  const fetchData = async () => {
    try {
      let response = await getAllAppointment(status);
      if (response?.data?.value) {
        SetAppointment(response.data.value);
        setPagination({
          currentPage: response.data.paging.currentPage,
          totalPages: response.data.paging.totalPages,
          totalCount: response.data.paging.totalCount,
          hasPrevious: response.data.paging.hasPrevious,
          hasNext: response.data.paging.hasNext,
        });
      } else {
        console.error("Loading appointments failed");
      }
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [
    filter.search,
    filter.type,
    filter.pageCurrent,
    appointmentSignify.garaCurrent,
  ]);

  const handlePageChange = (newPage) => {
    FilterAppointment.set((v) => {
      v.value.pageCurrent = newPage;
    });
  };
  const columns = useMemo(
    () => [
      {
        header: t("title1"),
        accessorKey: "id",
        accessorFn: (_row, index) => index + 1,
      },
      { header: t("title2"), accessorKey: "customerName" },
      { header: t("title13"), accessorKey: "customerEmail" },
      { header: t("title12"), accessorKey: "customerPhoneNumber" },
      { header: t("title4"), accessorKey: "appointmentType" },
      { header: t("title5"), accessorKey: "status" },
      { header: t("title6"), accessorKey: "price" },
      { header: t("title7"), accessorKey: "estimatedAppointmentTime" },
      { header: t("title8"), accessorKey: "actualAppointmentTime" },
      { header: t("title9"), accessorKey: "estimatedEndTime" },
      { header: t("title10"), accessorKey: "actualEndTime" },
    ],
    [t, i18n.language]
  );
  const actions = [
    {
      type: "link",
      label: t("manage_product.view"),
      icon: <FaEye />,
      color: "bg-gray-500",
      link: (row) => `/${sAccount.value.role}/appointment/${row.original.id}`,
    },
  ];
  return (
    <div>
      <BaseTable
        columns={columns}
        data={appointments}
        actions={actions}
        pagination={pagination}
        onPageChange={handlePageChange}
        signifyInformation={sListApointment.value}
      />
    </div>
  );
}

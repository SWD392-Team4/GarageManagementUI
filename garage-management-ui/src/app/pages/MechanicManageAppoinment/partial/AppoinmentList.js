import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaEye } from "react-icons/fa";
import BaseTable from "../../../components/BaseTable/BaseTable";
import {
  FilterAppointment,
  sListApointment,
} from "../services/store/FilterStore";
import { getAllAppointment } from "../services/AppointmentService";
import FilterTablePost from "./FilterTablePosts";
import { currentAppointment } from "../services/store/mechanic";

export default function AppointmentList() {
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
  const sCurrentAppointment = currentAppointment.use();
  const fetchData = useCallback(async () => {
    try {
      let response = await getAllAppointment();
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
  }, []);

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    fetchData();
  }, [filter.search, filter.pageCurrent]);

  useEffect(() => {
    FilterAppointment.set((v) => {
      v.value.searchNamecus = "";
      v.value.startDate = "";
      v.value.endDate = "";
      v.value.type = "";
      v.value.searchEmailCus = "";
    });
  }, []);

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
      { header: t("title10"), accessorKey: "actualAppointmentTime" },
      { header: t("title9"), accessorKey: "estimatedEndTime" },
      { header: t("title10"), accessorKey: "actualEndTime" },
      { header: t("title5"), accessorKey: "appointmentType" },
      { header: t("title4"), accessorKey: "status" },
    ],
    [t, i18n.language]
  );
  const actions = [
    {
      type: "link-set",
      label: t("manage_product.view"),
      icon: <FaEye />,
      color: "bg-gray-500",
      link: (row) => `detail/${row.original.id}`,
      onClick: async (row) => {
        try {
          currentAppointment.set((v) => {
            v.value.appointmentDetail = row;
          });
        } catch (error) {
          console.error("Error reject details: ", error);
        }
      },
    },
  ];

  return (
    <div>
      <div className="mb-2">
        <FilterTablePost />
      </div>
      <BaseTable
        columns={columns}
        data={appointments}
        actions={actions}
        pagination={pagination}
        onPageChange={handlePageChange}
        // signifyInformation={sListApointment.value}
      />
    </div>
  );
}

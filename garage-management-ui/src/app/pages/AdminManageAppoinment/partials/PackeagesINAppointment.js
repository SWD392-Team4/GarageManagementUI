import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { MdListAlt } from "react-icons/md";
import BaseTable from "../../../components/BaseTable/BaseTable";
import { currentAppointment } from "../services/store/AppointmentSignify";
import { sPackeagesInAppointment } from "../services/store/FilterStore";
import { formatVietnameseCurrency } from "../../ManageGoodsIssued/schemas/GoodsIssuedSchemas";
import { formatDate } from "../schemas/appointmentSchema";
import UpdateServiceModal from "../models/UpdateServiceModal";
import { getAllServicesOnPackages } from "../services/AppointmentService";

export default function PackeagesINAppointment() {
  const { t, i18n } = useTranslation("appoinment-admin");
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pageSize: 10,
  });
  const sAppointment = currentAppointment.use();
  const [services, setServices] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  useEffect(() => {
    // Lấy dữ liệu thực từ store thay vì fake data
    const packages = currentAppointment.value.appointmentDetailPackages || [];
    setData(packages);
    setPagination((prev) => ({ ...prev, total: packages.length }));
  }, [
    sAppointment.appointmentDetailPackages,
    sAppointment.appointmentDetailPackages,
  ]);

  // Cấu hình các cột hiển thị theo dữ liệu thực
  const columns = useMemo(
    () => [
      {
        header: t("list-packages.title1"),
        accessorKey: "id",
        accessorFn: (_row, index) => index + 1,
      },
      { header: t("list-packages.title2"), accessorKey: "packageName" },
      {
        header: t("list-packages.title3"),
        accessorKey: "packagePrice",
        accessorFn: (row) => formatVietnameseCurrency(row.packagePrice),
      },
      { header: t("list-packages.title4"), accessorKey: "status" },
      {
        header: t("list-packages.title5"),
        accessorKey: "createdAt",
        accessorFn: (row) => formatDate(row.createdAt),
      },
      {
        header: t("list-packages.title6"),
        accessorKey: "updatedAt",
        accessorFn: (row) => formatDate(row.updatedAt),
      },
    ],
    [t, i18n.language]
  );

  const actions = [
    {
      type: "modal",
      label: t("list-packages.view"),
      icon: <MdListAlt />,
      color: "bg-gray-500",
      onClick: async (row) => {
        try {
          const serviceListOnPackage = await getAllServicesOnPackages(row.id);
          setSelectedBrand(serviceListOnPackage.data.value);
          setIsUpdateModalOpen(true);
        } catch (error) {
          console.error("Error fetching serviceListOnPackage details: ", error);
        }
      },
    },
  ];
  if (data.length === 0) {
    return;
  }
  return (
    <>
      <div className="bg-gray-300 text-sm uppercase mt-5 p-2 font-title font-bold">
        {t("bookingInfo.packagesInAppointment")}
      </div>
      <div className="">
        <BaseTable
          columns={columns}
          data={data}
          actions={actions}
          pagination={pagination}
          signifyInformation={sPackeagesInAppointment.value}
        />
      </div>
      <UpdateServiceModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        services={services}
      />
    </>
  );
}

import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { GiCancel } from "react-icons/gi";
import { LuView } from "react-icons/lu";
import { MdListAlt, MdOutlineAssignmentInd } from "react-icons/md";
import { useParams } from "react-router-dom";
import BaseTable from "../../../components/BaseTable/BaseTable";
import { formatVietnameseCurrency } from "../../ManageGoodsIssued/schemas/GoodsIssuedSchemas";
import AddAppointmentDetail from "../models/AddAppointmentDetail";
import CancelDetailAppointment from "../models/CancelDetailAppointment";
import ReplacementPartsModal from "../models/ReplacementPartsModal";
import { formatDate } from "../schemas/appointmentSchema";
import { currentAppointment } from "../services/store/AppointmentSignify";
import { sServicesInAppointment } from "../services/store/FilterStore";

import AssginEmployee from "../models/AssginEmployee";
import ServiceDetailModal from "../models/ServiceDetailModal";
import { sAccount } from "../../AuthCustomer/services/store";

export default function ServicesInAppointment() {
  const { t, i18n } = useTranslation("appoinment-admin");
  const [data, setData] = useState([]);
  const { id } = useParams();

  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pageSize: 10,
  });

  const sAppointment = currentAppointment.use();
  const [products, setProducts] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isUpdateModalOpen1, setIsUpdateModalOpen1] = useState(false);
  const [isUpdateModalOpen3, setIsUpdateModalOpen3] = useState(false);
  const [serviceDetailId, setServiceDetailId] = useState(null);
  const [isServiceDetailModalOpen, setIsServiceDetailModalOpen] =
    useState(false);

  const [serviceDetail, setServiceDetail] = useState(null);
  useEffect(() => {
    fetchData(pagination.page).then((response) => {
      setData(response.data);
      setPagination((prev) => ({ ...prev, total: response.total }));
    });
  }, [
    pagination.page,
    sAppointment.appointmentDetailPackages,
    sAppointment.appointmentDetails,
    sAppointment.load,
  ]);

  const fetchData = async (page) => {
    // Lấy dữ liệu từ currentAppointment.value.appointmentDetails
    const appointmentDetails =
      currentAppointment.value.appointmentDetails || [];

    // Format dữ liệu: format createAt, updatedAt và price
    const formattedData = appointmentDetails.map((item) => ({
      ...item,
      createAt: formatDate(item.createAt),
      updatedAt: formatDate(item.updatedAt),
      price: item.isFromPackage
        ? "0 VNĐ"
        : formatVietnameseCurrency(item.price),
    }));

    // Nếu cần, có thể triển khai phân trang ở đây (ví dụ: cắt mảng theo page, pageSize)
    return { data: formattedData, total: formattedData.length };
  };

  const columns = useMemo(
    () => [
      {
        header: t("list-services.title1"),
        accessorKey: "id",
        accessorFn: (_row, index) => index + 1,
      },
      { header: t("list-services.title2"), accessorKey: "serviceName" },
      // { header: t("list-services.title3"), accessorKey: "appointmentId" },
      { header: t("list-services.title11"), accessorKey: "estimatedHours" },
      { header: t("list-services.title6"), accessorKey: "price" },
      { header: t("list-services.title7"), accessorKey: "createAt" },
      { header: t("list-services.title8"), accessorKey: "updatedAt" },
      { header: t("list-services.title9"), accessorKey: "status" },
      // { header: t("list-services.title9"), accessorKey: "serviceNote" },
    ],
    [t, i18n.language]
  );

  const actions = [
    {
      type: "modal",
      label: "view",
      icon: <MdListAlt />,
      color: "bg-gray-500",
      onClick: async (row) => {
        try {
          setProducts(row.appointmentReplacementParts);

          setIsUpdateModalOpen(true);
          setServiceDetailId(row.id);
        } catch (error) {
          console.error("Error setProducts details: ", error);
        }
      },
      // luôn hiển thị, không cần điều kiện
      shouldDisplay: (row) =>
        row.status !== "Declined" &&
        row.status !== "Cancelled" &&
        row.status !== "Completed",
    },
    {
      type: "modal",
      label: "view",
      icon: <LuView />,
      color: "bg-gray-500",
      onClick: async (row) => {
        setServiceDetail(row);
        setIsServiceDetailModalOpen(true);
      },
      shouldDisplay: (row) => true,
    },
    {
      type: "modal",
      label: "cancel",
      icon: <GiCancel />,
      color: "bg-gray-500",
      onClick: async (row) => {
        try {
          setIsUpdateModalOpen1(true);
          setServiceDetailId(row.id);
        } catch (error) {
          console.error("Error cancel details: ", error);
        }
      },
      // chỉ hiển thị nếu row.status không bằng "Declined"
      shouldDisplay: (row) =>
        row.status !== "Declined" &&
        row.status !== "Cancelled" &&
        row.status !== "Completed",
    },
    {
      type: "modal",
      label: "Assign",
      icon: <MdOutlineAssignmentInd />,
      color: "bg-gray-500",
      onClick: async (row) => {
        try {
          setIsUpdateModalOpen3(true);
          setServiceDetail(row);
        } catch (error) {
          console.error("Error reject details: ", error);
        }
      },
      // chỉ hiển thị nếu row.status không bằng "Declined"
      shouldDisplay: (row) =>
        row.status !== "Declined" &&
        row.status !== "Cancelled" &&
        (row.status === "Assigned" || row.status === "Unsigned"),
    },
  ];

  return (
    <>
      <div className="bg-gray-300 text-xs md:text-sm uppercase mt-3 md:mt-5 p-2 font-title font-bold flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>Services in appointment</div>
        {currentAppointment.value.status !== "Rejected" &&
          currentAppointment.value.status !== "Cancelled" &&
          currentAppointment.value.status !== "Completed" &&
          sAccount.value.role === "Cashier" && <AddAppointmentDetail id={id} />}
      </div>

      <div className="">
        <BaseTable
          columns={columns}
          data={data}
          actions={sAccount.value.role === "Cashier" ? actions : ""}
          pagination={pagination}
          fetchData={fetchData}
          signifyInformation={sServicesInAppointment.value}
        />
      </div>
      <ReplacementPartsModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        replacementParts={products}
        appointmentId={id}
        serviceDetailId={serviceDetailId}
        onConfirm={(response) => {
          console.log("replacementParts: ", response);
        }}
      />

      <CancelDetailAppointment
        isOpen={isUpdateModalOpen1}
        onCancel={() => setIsUpdateModalOpen1(false)}
        appointmentId={id}
        serviceDetailId={serviceDetailId}
      />

      <AssginEmployee
        isOpen={isUpdateModalOpen3}
        onCancel={() => setIsUpdateModalOpen3(false)}
        appointmentId={id}
        serviceDetail={serviceDetail}
      />
      <ServiceDetailModal
        isOpen={isServiceDetailModalOpen}
        onClose={() => setIsServiceDetailModalOpen(false)}
        serviceDetail={serviceDetail}
      />
    </>
  );
}

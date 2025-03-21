import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  getAllInvoiceSale,
  getDetailProductSell,
  searchInvoice,
} from "../../services/ProductAtStoreAPI";
import { FaPencilAlt } from "react-icons/fa";
import BaseTable from "../../../../components/BaseTable/BaseTable";
import SearchInvoicePage from "./SearchInvoicePage";
import { useTranslation } from "react-i18next";
import ViewSoldProductsModal from "./ViewSoldProductsModal";
import { AppointmentSignify } from "../../../AdminManageAppoinment/services/store/AppointmentSignify";

export default function ManageInvoiceSale() {
  const signifyInformation = AppointmentSignify.use();

  const { t, i18n } = useTranslation("product_at_store");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    hasPrevious: false,
    hasNext: false,
  });
  const [listInvoice, setListInvoice] = useState(null);
  const [searchParams, setSearchParams] = useState(null);
  const [invoiceDetails, setIvoiceDetails] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // useCallback để tránh re-create
  const fetchData = useCallback(async (page = 1, params = null) => {
    try {
      let response;

      if (params) {
        response = await searchInvoice({ ...params, PageNumber: page });
      } else {
        response = await getAllInvoiceSale(page);
      }

      if (response?.data?.value) {
        setListInvoice(response.data.value);
        setPagination({
          currentPage: response.data.paging.currentPage,
          totalPages: response.data.paging.totalPages,
          totalCount: response.data.paging.totalCount,
          hasPrevious: response.data.paging.hasPrevious,
          hasNext: response.data.paging.hasNext,
        });
      } else {
        console.error("Loading invocie failed");
      }
    } catch (error) {
      console.error("Error fetching invocie: ", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData, AppointmentSignify.value.garaCurrent]);

  // Xử lý tìm kiếm thương hiệu
  const handleSearch = (params) => {
    setSearchParams(params); // Lưu tham số tìm kiếm để dùng khi chuyển trang
    fetchData(1, params); // Luôn bắt đầu từ trang 1 khi tìm kiếm
  };

  // Xử lý khi chuyển trang
  const handlePageChange = (newPage) => {
    fetchData(newPage, searchParams); // Nếu có tìm kiếm, giữ nguyên searchParams
  };

  const columns = useMemo(
    () => [
      {
        header: t("product_at_store.invoice.id"),
        accessorKey: "id",
        accessorFn: (_row, index) => index + 1,
      },
      {
        header: t("product_at_store.invoice.invoiceType"),
        accessorKey: "invoiceType",
      },
      {
        header: t("product_at_store.invoice.customerName"),
        accessorKey: "customerName",
      },
      {
        header: t("product_at_store.invoice.customerPhoneNumber"),
        accessorKey: "customerPhoneNumber",
      },
      {
        header: t("product_at_store.invoice.customerEmail"),
        accessorKey: "customerEmail",
      },
      {
        header: t("product_at_store.invoice.totalPrice"),
        accessorKey: "totalPrice",
      },
      { header: t("product_at_store.invoice.status"), accessorKey: "status" },
      {
        header: t("product_at_store.invoice.createdAt"),
        accessorKey: "createdAt",
      },
    ],
    [t, i18n.language]
  );

  const actions = [
    {
      type: "modal",
      label: t("product_at_store.invoice.edit"),
      color: "bg-yellow-500",
      icon: <FaPencilAlt />,
      onClick: async (row) => {
        try {
          const InvoiceDetails = await getDetailProductSell(row.id);
          setIvoiceDetails(InvoiceDetails.data.value);
          console.log("Mange InvoiceSale: ", invoiceDetails);
          setIsViewModalOpen(true);
        } catch (error) {
          console.error("Error fetching brand details: ", error);
        }
      },
    },
  ];

  return (
    <>
      <SearchInvoicePage onSearch={handleSearch} />
      <BaseTable
        columns={columns}
        data={listInvoice}
        actions={actions}
        pagination={pagination}
        onPageChange={handlePageChange}
        // signifyInformation={sSupplier.value}
      />
      <ViewSoldProductsModal
        open={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        invoiceDetails={invoiceDetails}
      />
    </>
  );
}

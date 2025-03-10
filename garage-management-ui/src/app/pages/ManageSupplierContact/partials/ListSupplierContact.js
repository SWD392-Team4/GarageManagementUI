import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { getAllSupplierContact, getSupplierContactDetail, SearchSupplier } from '../services/SupliersContactService';
import SearchSupplierPartial from './SearchSupplierPartial';
import { sSuplierContact } from "../services/SupliersContactSignify"
import UpdateSupplierContactModal from "../models/UpdateSupplierContactModal"
import { FaPencilAlt } from 'react-icons/fa';
import BaseTable from '../../../components/BaseTable/BaseTable';

export default function ListSupplierContact({ refresh }) {
  const { t, i18n } = useTranslation("manage_supplier_contact");
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    hasPrevious: false,
    hasNext: false,
  });
  const [searchParams, setSearchParams] = useState(null);
  const [selectedSupplierContact, setSelectedSupplierContact] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  // useCallback để tránh re-create
  const fetchData = useCallback(async (page = 1, params = null) => {
    try {
      let response;

      if (params) {
        response = await SearchSupplier({ ...params, PageNumber: page });
      } else {
        response = await getAllSupplierContact(page);
      }

      if (response?.data?.value) {
        setData(response.data.value);
        setPagination({
          currentPage: response.data.paging.currentPage,
          totalPages: response.data.paging.totalPages,
          totalCount: response.data.paging.totalCount,
          hasPrevious: response.data.paging.hasPrevious,
          hasNext: response.data.paging.hasNext,
        });
      } else {
        console.error("Loading Supplier Contact failed");
      }
    } catch (error) {
      console.error("Error fetching Supplier Contact: ", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [refresh, fetchData]);

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
      { header: t("manage_supplier_contact.id"), accessorKey: "id", accessorFn: (_row, index) => index + 1 },
      { header: t("manage_supplier_contact.contactPersonName"), accessorKey: "contactPersonName" },
      { header: t("manage_supplier_contact.contactPosition"), accessorKey: "contactPosition" },
      { header: t("manage_supplier_contact.contactPhoneNumber"), accessorKey: "contactPhoneNumber" },
      { header: t("manage_supplier_contact.contactEmail"), accessorKey: "contactEmail" },
      { header: t("manage_supplier_contact.status"), accessorKey: "status" },
      { header: t("manage_supplier_contact.createdAt"), accessorKey: "createdAt" },
      { header: t("manage_supplier_contact.updatedAt"), accessorKey: "updatedAt" },
    ],
    [t, i18n.language]
  );

  const actions = [
    {
      type: "modal",
      label: t("manage_supplier_contact.edit"),
      color: "bg-yellow-500",
      icon: <FaPencilAlt />,
      onClick: async (row) => {
        try {
          const supplierContactDetails = await getSupplierContactDetail(row.id);
          setSelectedSupplierContact(supplierContactDetails.data.value);
          setIsUpdateModalOpen(true);
        } catch (error) {
          console.error("Error fetching brand details: ", error);
        }
      },
    },
  ];

  return (
    <>
      <SearchSupplierPartial onSearch={handleSearch} />
      <BaseTable
        columns={columns}
        data={data}
        actions={actions}
        pagination={pagination}
        onPageChange={handlePageChange}
        signifyInformation={sSuplierContact.value}
      />
      <UpdateSupplierContactModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        supplierContact={selectedSupplierContact}
        onSupplierUpdated={() => {
          setIsUpdateModalOpen(false);
          fetchData(pagination.currentPage, searchParams);
        }}
      />
    </>
  )
}

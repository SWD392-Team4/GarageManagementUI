import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { getAllSupplier, getSupplierDetails, SearchSupplier } from '../services/SupplierService';
import { sSupplier } from '../services/SupplierSignify';
import { FaPencilAlt } from 'react-icons/fa';
import BaseTable from '../../../components/BaseTable/BaseTable';
import SearchSupplierPage from './SearchSupplierPage';
import UpdateSupplierModal from '../models/UpdateSupplierModal';

export default function ListSupplier({ refresh }) {
  const { t, i18n } = useTranslation("manage_supplier");
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    hasPrevious: false,
    hasNext: false,
  });
  const [searchParams, setSearchParams] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  // useCallback để tránh re-create
  const fetchData = useCallback(async (page = 1, params = null) => {
    try {
      let response;

      if (params) {
        response = await SearchSupplier({ ...params, PageNumber: page });
      } else {
        response = await getAllSupplier(page);
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
        console.error("Loading brands failed");
      }
    } catch (error) {
      console.error("Error fetching brands: ", error);
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
      { header: t("manage_supplier.id"), accessorKey: "id", accessorFn: (_row, index) => index + 1 },
      { header: t("manage_supplier.name"), accessorKey: "name" },
      { header: t("manage_supplier.taxCode"), accessorKey: "taxCode" },
      { header: t("manage_supplier.address"), accessorKey: "address" },
      { header: t("manage_supplier.province"), accessorKey: "province" },
      { header: t("manage_supplier.district"), accessorKey: "district" },
      { header: t("manage_supplier.wards"), accessorKey: "wards" },
      { header: t("manage_supplier.status"), accessorKey: "status" },
      { header: t("manage_supplier.createdAt"), accessorKey: "createdAt" },
      { header: t("manage_supplier.updatedAt"), accessorKey: "updatedAt" },
      { header: t("manage_supplier.supplierCategory"), accessorKey: "supplierCategory" },
    ],
    [t, i18n.language]
  );

  const actions = [
    {
      type: "modal",
      label: t("manage_supplier.edit"),
      color: "bg-yellow-500",
      icon: <FaPencilAlt />,
      onClick: async (row) => {
        try {
          const supplierDetail = await getSupplierDetails(row.id);
          setSelectedSupplier(supplierDetail.data.value);
          setIsUpdateModalOpen(true);
        } catch (error) {
          console.error("Error fetching brand details: ", error);
        }
      },
    },
  ];

  return (
    <>
      <SearchSupplierPage onSearch={handleSearch} />
      <BaseTable
        columns={columns}
        data={data}
        actions={actions}
        pagination={pagination}
        onPageChange={handlePageChange}
        signifyInformation={sSupplier.value}
      />
      <UpdateSupplierModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        supplier={selectedSupplier}
        onSupplierUpdated={() => {
          setIsUpdateModalOpen(false);
          fetchData(pagination.currentPage, searchParams);
        }}
      />
    </>
  )
}

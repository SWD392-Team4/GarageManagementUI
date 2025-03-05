import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import BaseTable from "../../../components/BaseTable/BaseTable";
import { getAllProducts, searchProduct } from "../services/ProductService";
import SearchProduct from "./SearchProduct";

export default function ListCustomer() {
  const { t, i18n } = useTranslation("manage_product");
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    hasPrevious: false,
    hasNext: false,
  });
  const [searchParams, setSearchParams] = useState(null);

  // useCallback tránh re-create hàm
  const fetchData = useCallback(async (page = 1, params = null) => {
    try {
      let response;

      if (params) {
        // response = await searchProduct({ ...params, PageNumber: page });
      } else {
        response = await getAllProducts(page);
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
        console.error("Loading products failed");
      }
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = (params) => {
    setSearchParams(params);
    fetchData(1, params);
  };

  const handlePageChange = (newPage) => {
    fetchData(newPage, searchParams);
  };

  const columns = useMemo(
    () => [
      { header: t("manage_product.id"), accessorKey: "Id" },
      { header: t("manage_product.name"), accessorKey: "ProductName" },
      { header: t("manage_product.barcode"), accessorKey: "ProductBarcode" },
      { header: t("manage_product.status"), accessorKey: "Status" },
      { header: t("manage_product.createdAt"), accessorKey: "CreatedAt" },
      { header: t("manage_product.updatedAt"), accessorKey: "UpdatedAt" },
      { header: t("manage_product.price"), accessorKey: "ProductPrice" },
    ],
    [t, i18n.language]
  );

  const actions = [
    {
      type: "link",
      label: t("manage_product.view"),
      icon: <FaEye />,
      color: "bg-gray-500",
      link: (row) => `${row.original.Id}`,
    },
  ];

  return (
    <>
      <SearchProduct onSearch={handleSearch} />
      <BaseTable
        columns={columns}
        data={data}
        actions={actions}
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </>
  );
}

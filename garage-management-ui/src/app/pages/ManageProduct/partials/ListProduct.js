import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import BaseTable from "../../../components/BaseTable/BaseTable";
import { getAllProducts, searchProduct } from "../services/ProductService";
import SearchProduct from "./SearchProduct";

export default function ListProduct() {
  const { t, i18n } = useTranslation("manage_product");
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pageSize: 10,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllProducts();
        if (response?.data?.value) {
          setData(response.data.value);
          setPagination({
            total: response.data.paging.totalCount,
            page: response.data.paging.currentPage,
            pageSize: response.data.paging.pageSize,
          });
        } else {
          console.error("Loading products failed");
        }
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };
    fetchData();
  }, []);

  // Xử lý tìm kiếm thương hiệu
  const handleSearch = async (searchParams) => {
    try {
      const response = await searchProduct(searchParams);
      if (response?.data?.value) {
        setSearchResults(response.data.value);
      } else {
        setSearchResults([]);
        console.error("No search results found");
      }
    } catch (error) {
      console.error("Error searching brands: ", error);
    }
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
      link: (row) => `/admin/product/${row.original.Id}`,
    },
  ];

  return (
    <>
      <SearchProduct onSearch={handleSearch} />
      <BaseTable
        columns={columns}
        data={searchResults !== null ? searchResults : data}
        actions={actions}
        pagination={pagination}
      />
    </>
  );
}

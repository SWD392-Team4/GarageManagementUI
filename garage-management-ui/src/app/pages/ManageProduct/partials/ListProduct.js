import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BaseTable from "../../../components/BaseTable/BaseTable";
import { useTranslation } from "react-i18next";
import { FaEye } from "react-icons/fa";
import { getAllProducts } from "../services/ProductService";

export default function ListProduct() {
  const { t, i18n } = useTranslation("manage_product");
  const navigate = useNavigate();
  const [data, setData] = useState([]);
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
    <BaseTable
      columns={columns}
      data={data}
      actions={actions}
      pagination={pagination}
    />
  );
}

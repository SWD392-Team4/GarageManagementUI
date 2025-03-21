import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  getAllGoodsReceived,
  getAllProductAtWarehouse,
  searchProductAtWarehouse,
} from "../../services/ProductAtWarehouseService";
import { useTranslation } from "react-i18next";
import SearchInventory from "./SearchInventory";
import BaseTable from "../../../../components/BaseTable/BaseTable";
import { sProductAtWarehouse } from "../../services/ProductAtWarehouseSignify";
import { AppointmentSignify } from "../../../AdminManageAppoinment/services/store/AppointmentSignify";

export default function ManageGoodReceived() {
  const sAppointmentSignify = AppointmentSignify.use();
  const { t } = useTranslation("product_at_warehouse");
  const [data, setData] = useState();
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    hasPrevious: false,
    hasNext: false,
  });
  const [searchParams, setSearchParams] = useState(null);

  // useCallback để tránh re-create
  const fetchData = useCallback(async (params = null) => {
    try {
      const response = await getAllGoodsReceived(params);

      if (response?.data?.value) {
        setData(response?.data?.value);
        setPagination({
          currentPage: response.data.paging.currentPage,
          totalPages: response.data.paging.totalPages,
          totalCount: response.data.paging.totalCount,
          hasPrevious: response.data.paging.hasPrevious,
          hasNext: response.data.paging.hasNext,
        });
      } else {
        console.error("Loading inventory failed");
      }
    } catch (error) {
      console.error("Error fetching inventory: ", error);
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
        header: t("product_at_warehouse.table.id"),
        accessorKey: "id",
        accessorFn: (_row, index) => index + 1,
      },
      {
        header: t("product_at_warehouse.table.invoiceCode"),
        accessorKey: "invoiceCode",
      },
      {
        header: t("product_at_warehouse.table.userName"),
        accessorKey: "userName",
      },
      {
        header: t("product_at_warehouse.table.contactPersonName"),
        accessorKey: "contactPersonName",
      },
      {
        header: t("product_at_warehouse.table.totalPrice"),
        accessorKey: "totalPrice",
      },
      { header: t("product_at_warehouse.table.status"), accessorKey: "status" },
      {
        header: t("product_at_warehouse.table.createdAt"),
        accessorKey: "createdAt",
      },
    ],
    [t, AppointmentSignify.value.garaCurrent]
  );
  return (
    <>
      <SearchInventory onSearch={handleSearch} />
      <BaseTable
        columns={columns}
        data={data}
        // actions={actions}
        pagination={pagination}
        onPageChange={handlePageChange}
        signifyInformation={sProductAtWarehouse.value}
      />
    </>
  );
}

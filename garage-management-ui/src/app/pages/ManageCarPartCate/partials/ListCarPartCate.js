import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaPencilAlt } from "react-icons/fa";
import BaseTable from "../../../components/BaseTable/BaseTable";
import {
  getAllCarPartCate,
  getCarPartCateDetails,
  searchCarPartCate,
} from "../services/CategoryCarPart";
import SearchCarPartCate from "./SeachCarPartCate";
import UpdateCarPartCateModal from "../models/UpdateCarPartCateModal";
import { sCategoryCarPart } from "../services/CategoryCarPartSinginify";
import { sAccount } from "../../AuthCustomer/services/store";

export default function ListCarPartCate({ refresh }) {
  const { t } = useTranslation("manage_carpartcate");
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    hasPrevious: false,
    hasNext: false,
  });
  const [searchParams, setSearchParams] = useState(null);
  const [selectedCarPartCate, setSelectedCarPartCate] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  // Lấy danh sách danh mục phụ tùng
  const fetchData = useCallback(async (page = 1, params = null) => {
    try {
      let response;

      if (params) {
        response = await searchCarPartCate({ ...params, PageNumber: page });
      } else {
        response = await getAllCarPartCate(page);
      }

      if (response?.data?.value) {
        setData(response.data.value);
        setPagination(response.data.paging);
      }
    } catch (error) {
      console.error("Error fetching car part categories:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [refresh, fetchData]);

  // Xử lý tìm kiếm danh mục
  const handleSearch = (params) => {
    setSearchParams(params);
    fetchData(1, params);
  };

  // Xử lý chuyển trang
  const handlePageChange = (newPage) => {
    fetchData(newPage, searchParams);
  };

  // Cấu trúc cột bảng
  const columns = useMemo(
    () => [
      {
        header: t("manage_carpartcate.id"),
        accessorKey: "id",
        accessorFn: (_row, index) => index + 1,
      },
      { header: t("manage_carpartcate.name"), accessorKey: "partCategory" },
      { header: t("manage_carpartcate.status"), accessorKey: "status" },
      { header: t("manage_carpartcate.createdAt"), accessorKey: "createdAt" },
      { header: t("manage_carpartcate.updatedAt"), accessorKey: "updatedAt" },
    ],
    [t]
  );

  // Hành động chỉnh sửa danh mục
  const actions = [
    {
      type: "modal",
      label: t("manage_carpartcate.edit"),
      color: "bg-yellow-500",
      icon: <FaPencilAlt />,
      onClick: async (row) => {
        try {
          const carPartCateDetails = await getCarPartCateDetails(row.id);
          setSelectedCarPartCate(carPartCateDetails.data.value);
          setIsUpdateModalOpen(true);
        } catch (error) {
          console.error("Error fetching car part category details: ", error);
        }
      },
    },
  ];

  return (
    <>
      <SearchCarPartCate onSearch={handleSearch} />
      <BaseTable
        columns={columns}
        data={data}
        actions={sAccount.value.role === "Administrator" ? actions : ""}
        pagination={pagination}
        onPageChange={handlePageChange}
        signifyInformation={sCategoryCarPart.value}
      />
      <UpdateCarPartCateModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        carPartCate={selectedCarPartCate}
        onCarPartCateUpdated={() => {
          setIsUpdateModalOpen(false);
          fetchData(pagination.currentPage, searchParams);
        }}
      />
    </>
  );
}

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaPencilAlt } from "react-icons/fa";
import BaseTable from "../../../components/BaseTable/BaseTable";
import UpdateCarPartModal from "../models/UpdateCarPartModal";
import { getAllCarPart, getCarPartDetails, searchCarPart } from "../services/CarPartService";
import SearchCarPart from "./SearchCarPart";
import { sCarPart } from "../services/SignifyCarPart";

export default function ListCarPart({ refresh }) {
    const { t, i18n } = useTranslation("manage_carpart");
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalCount: 0,
        hasPrevious: false,
        hasNext: false,
    });
    const [searchParams, setSearchParams] = useState(null);
    const [selectedCarPart, setSelectedCarPart] = useState(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    // Fetch danh sách phụ tùng xe
    const fetchData = useCallback(async (page = 1, params = null) => {
        try {
            let response;

            if (params) {
                response = await searchCarPart({ ...params, PageNumber: page });
            } else {
                response = await getAllCarPart(page);
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
                console.error("Loading car parts failed");
            }
        } catch (error) {
            console.error("Error fetching car parts: ", error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [refresh, fetchData]);

    // Xử lý tìm kiếm phụ tùng
    const handleSearch = (params) => {
        setSearchParams(params);
        fetchData(1, params);
    };

    // Xử lý chuyển trang
    const handlePageChange = (newPage) => {
        fetchData(newPage, searchParams);
    };

    // Cấu trúc cột bảng phụ tùng xe
    const columns = useMemo(
        () => [
            { header: t("manage_carpart.id"), accessorKey: "id", accessorFn: (_row, index) => index + 1 },
            { header: t("manage_carpart.name"), accessorKey: "partName" },
            { header: t("manage_carpart.category"), accessorKey: "partCategory" },
            { header: t("manage_carpart.status"), accessorKey: "status" },
            { header: t("manage_carpart.createdAt"), accessorKey: "createdAt" },
            { header: t("manage_carpart.updatedAt"), accessorKey: "updatedAt" },
        ],
        [t, i18n.language]
    );

    // Hành động chỉnh sửa phụ tùng xe
    const actions = [
        {
            type: "modal",
            label: t("manage_carpart.edit"),
            color: "bg-yellow-500",
            icon: <FaPencilAlt />,
            onClick: async (row) => {
                try {
                    const carPartDetails = await getCarPartDetails(row.id);
                    setSelectedCarPart(carPartDetails.data.value);
                    setIsUpdateModalOpen(true);
                } catch (error) {
                    console.error("Error fetching car part details: ", error);
                }
            },
        },
    ];

    return (
        <>
            <SearchCarPart onSearch={handleSearch} />
            <BaseTable
                columns={columns}
                data={data}
                actions={actions}
                pagination={pagination}
                onPageChange={handlePageChange}
                signifyInformation={sCarPart.value}
            />
            <UpdateCarPartModal
                isOpen={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                carPart={selectedCarPart}
                onCarPartUpdated={() => {
                    setIsUpdateModalOpen(false);
                    fetchData(pagination.currentPage, searchParams);
                }}
            />
        </>
    );
}

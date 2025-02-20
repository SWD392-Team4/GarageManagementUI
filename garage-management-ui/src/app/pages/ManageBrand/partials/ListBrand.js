import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaPencilAlt } from "react-icons/fa";
import BaseTable from "../../../components/BaseTable/BaseTable";
import UpdateBrandModal from "../models/UpdateBrandModal";
import { getAllBrand, getBrandDetails, searchBrand } from "../services/BrandService";
import SearchBrand from "./SearchBrand";

export default function ListBrand({ refresh }) {
    const { t, i18n } = useTranslation("manage_brand");
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalCount: 0,
        hasPrevious: false,
        hasNext: false,
    });
    const [searchParams, setSearchParams] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    // useCallback để tránh re-create
    const fetchData = useCallback(async (page = 1, params = null) => {
        try {
            let response;

            if (params) {
                response = await searchBrand({ ...params, PageNumber: page });
            } else {
                response = await getAllBrand(page);
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
            { header: t("manage_brand.id"), accessorKey: "Id" },
            { header: t("manage_brand.name"), accessorKey: "BrandName" },
            { header: t("manage_brand.status"), accessorKey: "Status" },
            { header: t("manage_brand.createdAt"), accessorKey: "CreatedAt" },
            { header: t("manage_brand.updatedAt"), accessorKey: "UpdatedAt" },
        ],
        [t, i18n.language]
    );

    const actions = [
        {
            type: "modal",
            label: t("manage_brand.edit"),
            color: "bg-yellow-500",
            icon: <FaPencilAlt />,
            onClick: async (row) => {
                try {
                    const brandDetails = await getBrandDetails(row.Id);
                    setSelectedBrand(brandDetails.data.value);
                    setIsUpdateModalOpen(true);
                } catch (error) {
                    console.error("Error fetching brand details: ", error);
                }
            },
        },
    ];

    return (
        <>
            <SearchBrand onSearch={handleSearch} />
            <BaseTable
                columns={columns}
                data={data}
                actions={actions}
                pagination={pagination}
                onPageChange={handlePageChange}
            />
            <UpdateBrandModal
                isOpen={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                brand={selectedBrand}
                onBrandUpdated={() => {
                    setIsUpdateModalOpen(false);
                    fetchData(pagination.currentPage, searchParams);
                }}
            />
        </>
    );
}

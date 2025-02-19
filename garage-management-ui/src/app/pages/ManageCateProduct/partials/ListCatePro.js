import React, { useEffect, useState, useMemo, useCallback } from "react";
import BaseTable from "../../../components/BaseTable/BaseTable";
import { useTranslation } from "react-i18next";
import { FaPencilAlt } from "react-icons/fa";
import UpdateCateModal from "../models/UpdateCateModal";
import { CategoryDetails, getAllCategory, searchCategory } from "../services/CatePService";
import SearchCategory from "./SearchCategory";

export default function ListCatePro({ refresh }) {
    const { t, i18n } = useTranslation("manage_product_category");
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalCount: 0,
        hasPrevious: false,
        hasNext: false,
    });
    const [searchParams, setSearchParams] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    // useCallback tránh re-create hàm
    const fetchData = useCallback(async (page = 1, params = null) => {
        try {
            let response;

            if (params) {
                response = await searchCategory({ ...params, PageNumber: page });
            } else {
                response = await getAllCategory(page);
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
                console.error("Loading categories failed");
            }
        } catch (error) {
            console.error("Error fetching categories: ", error);
        }
    }, []);

    useEffect(() => {
        fetchData(); // Khi mở trang, gọi API lấy dữ liệu mặc định (page 1)
    }, [refresh, fetchData]);

    const handleSearch = (params) => {
        setSearchParams(params); // Lưu tham số tìm kiếm để dùng khi chuyển trang
        fetchData(1, params); // Luôn bắt đầu từ trang 1 khi tìm kiếm
    };

    const handlePageChange = (newPage) => {
        fetchData(newPage, searchParams); // Nếu có tìm kiếm, giữ nguyên searchParams
    };

    const columns = useMemo(
        () => [
            { header: t("manage_product_category.id"), accessorKey: "Id" },
            { header: t("manage_product_category.name"), accessorKey: "Category" },
            { header: t("manage_product_category.status"), accessorKey: "Status" },
            { header: t("manage_product_category.createdAt"), accessorKey: "CreatedAt", },
            { header: t("manage_product_category.updatedAt"), accessorKey: "UpdatedAt", }
        ],
        [t, i18n.language]
    );

    const actions = [
        {
            type: "modal",
            label: t("manage_product_category.edit"),
            color: "bg-yellow-500",
            icon: <FaPencilAlt />,
            onClick: async (row) => {
                try {
                    const response = await CategoryDetails(row.Id);
                    setSelectedCategory(response.data.value);
                    setIsUpdateModalOpen(true);
                } catch (error) {
                    console.error("Error fetching category details:", error);
                }
            },
        },
    ];

    return (
        <>
            <SearchCategory onSearch={handleSearch} />
            <BaseTable
                columns={columns}
                data={data}
                actions={actions}
                pagination={pagination}
                onPageChange={handlePageChange}
            />
            <UpdateCateModal
                isOpen={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                category={selectedCategory}
                onCategoryUpdated={() => {
                    setIsUpdateModalOpen(false);
                    fetchData(pagination.currentPage, searchParams);
                }}
            />
        </>
    );
}

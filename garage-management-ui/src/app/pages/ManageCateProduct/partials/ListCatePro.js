import React, { useEffect, useState, useMemo } from "react";
import BaseTable from "../../../components/BaseTable/BaseTable";
import { useTranslation } from "react-i18next";
import { FaPencilAlt } from "react-icons/fa";
import UpdateCateModal from "../models/UpdateCateModal";
import { CategoryDetails, getAllCategory } from "../services/CatePService";

export default function ListCatePro({ refresh }) {
    const { t, i18n } = useTranslation("manage_product_category");
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({
        total: 0,
        page: 1,
        pageSize: 10,
    });
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllCategory();
                if (response?.data?.value) {
                    setData(response.data.value);
                    setPagination({
                        total: response.data.paging.totalCount,
                        page: response.data.paging.currentPage,
                        pageSize: response.data.paging.pageSize,
                    });
                } else {
                    console.error("Loading categories failed");
                }
            } catch (error) {
                console.error("Error fetching categories: ", error);
            }
        };
        fetchData();
    }, [refresh]);

    const columns = useMemo(
        () => [
            { header: t("manage_product_category.id"), accessorKey: "Id" },
            { header: t("manage_product_category.name"), accessorKey: "Category" },
            { header: t("manage_product_category.status"), accessorKey: "Status" },
            { header: t("manage_product_category.createdAt"), accessorKey: "CreatedAt" },
            { header: t("manage_product_category.updatedAt"), accessorKey: "UpdatedAt" },
        ],
        [t, i18n.language]
    );

    const actions = [
        {
            type: "modal",
            label: t("manage_category.edit"),
            color: "bg-yellow-500",
            icon: <FaPencilAlt />,
            onClick: async (row) => {
                try {
                    const response = await CategoryDetails(row.Id);
                    setSelectedCategory(response.data.value);
                    setIsUpdateModalOpen(true);
                } catch (error) {
                    console.error("Lỗi khi lấy chi tiết danh mục:", error);
                }
            },
        },
    ];

    return (
        <>
            <BaseTable columns={columns} data={data} actions={actions} pagination={pagination} />
            <UpdateCateModal
                isOpen={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                category={selectedCategory}
                onCategoryUpdated={(updatedCategory) =>
                    setData((prev) =>
                        prev.map((c) => (c.Id === updatedCategory.Id ? { ...c, ...updatedCategory } : c))
                    )
                }
            />
        </>
    );
}

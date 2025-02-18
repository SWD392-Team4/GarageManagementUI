import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import BaseTable from "../../../components/BaseTable/BaseTable";
import { useTranslation } from "react-i18next";
import { FaPencilAlt } from "react-icons/fa";
import { getAllBrand, getBrandDetails, searchBrand } from "../services/BrandService";
import UpdateBrandModal from "../models/UpdateBrandModal";
import SearchBrand from "./SearchBrand";

export default function ListBrand({ refresh }) {
    const { t, i18n } = useTranslation("manage_brand");
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [searchResults, setSearchResults] = useState(null);
    const [pagination, setPagination] = useState({
        total: 0,
        page: 1,
        pageSize: 10,
    });
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    // useCallback để tránh re-create
    const fetchData = useCallback(async () => {
        try {
            const response = await getAllBrand();
            if (response?.data?.value) {
                setData(response.data.value);
                setPagination({
                    total: response.data.paging.totalCount,
                    page: response.data.paging.currentPage,
                    pageSize: response.data.paging.pageSize,
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
    const handleSearch = async (searchParams) => {
        try {
            const response = await searchBrand(searchParams);
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
                data={searchResults !== null ? searchResults : data}
                actions={actions}
                pagination={pagination}
            />
            <UpdateBrandModal
                isOpen={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                brand={selectedBrand}
                onBrandUpdated={() => {
                    setIsUpdateModalOpen(false);
                    fetchData(); //gọi lại hàm để render lại dữ liệu 
                }}
            />
        </>
    );
}

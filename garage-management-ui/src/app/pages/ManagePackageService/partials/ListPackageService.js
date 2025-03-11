import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useTranslation } from 'react-i18next';
import { FaEye } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import BaseTable from "../../../components/BaseTable/BaseTable";
import { getAllPackageService, searchPackageService } from "../services/PackageServiceAPI";
import { sPackageService } from "../services/PackageServiceSignify";
import SearchPackageServicePage from "./SearchPackageServicePage";

export default function ListPackageService() {
    const { t, i18n } = useTranslation("manage_package");
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
                response = await searchPackageService({ ...params, PageNumber: page });
            } else {
                response = await getAllPackageService(page);
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
                console.error("Loading Package failed");
            }
        } catch (error) {
            console.error("Error fetching Package: ", error);
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
            { header: t("manage_package.id"), accessorKey: "id", accessorFn: (_row, index) => index + 1 },
            { header: t("manage_package.packageName"), accessorKey: "packageName" },
            { header: t("manage_package.category"), accessorKey: "category" },
            { header: t("manage_package.serviceCategory"), accessorKey: "serviceCategory" },
            { header: t("manage_package.type"), accessorKey: "type" },
            { header: t("manage_package.packagePrice"), accessorKey: "packagePrice" },
            { header: t("manage_package.validityPeriod"), accessorKey: "validityPeriod" },
            { header: t("manage_package.timeUnit"), accessorKey: "timeUnit" },
            { header: t("manage_package.usageLimit"), accessorKey: "usageLimit" },
            { header: t("manage_package.status"), accessorKey: "status" },
            { header: t("manage_package.createdAt"), accessorKey: "createdAt" },
            { header: t("manage_package.updatedAt"), accessorKey: "updatedAt" },
        ],
        [t, i18n.language]
    );

    const actions = [
        {
            type: "link",
            label: t("manage_package.view"),
            icon: <FaEye />,
            color: "bg-gray-500",
            link: (row) => `${row.original.id}`,
        },
    ];


    return (
        <>
            <SearchPackageServicePage onSearch={handleSearch} />
            <BaseTable
                columns={columns}
                data={data}
                actions={actions}
                pagination={pagination}
                onPageChange={handlePageChange}
                signifyInformation={sPackageService.value}
            />
        </>
    )
}

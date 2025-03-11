import React, { useCallback, useEffect, useMemo, useState } from 'react'
import BaseTable from '../../../../components/BaseTable/BaseTable';
import { sPackageHistory } from '../../services/PackageServiceSignify';
import { useTranslation } from 'react-i18next';
import { getPackageHistory } from '../../services/PackageServiceAPI';

export default function PackageHistory({ id }) {
    const { t, i18n } = useTranslation("manage_package");
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalCount: 0,
        hasPrevious: false,
        hasNext: false,
    });

    const fetchData = useCallback(async (page = 1) => {
        try {
            const response = await getPackageHistory(id);
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
                console.error("Loading Package History failed");
            }
        } catch (error) {
            console.error("Error fetching Package History: ", error);
        }
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [id, fetchData]);


    // Xử lý chuyển trang
    const handlePageChange = (newPage) => {
        fetchData(newPage, searchParams);
    };

    const columns = useMemo(
        () => [
            { header: t("manage_package.id"), accessorKey: "id", accessorFn: (_row, index) => index + 1 },
            { header: t("manage_package.packageName"), accessorKey: "packageName" },
            { header: t("manage_package.serviceCategory"), accessorKey: "serviceCategory" },
            { header: t("manage_package.category"), accessorKey: "category" },
            { header: t("manage_package.type"), accessorKey: "type" },
            { header: t("manage_package.packagePrice"), accessorKey: "packagePrice" },
            { header: t("manage_package.validityPeriod"), accessorKey: "validityPeriod" },
            { header: t("manage_package.timeUnit"), accessorKey: "timeUnit" },
            { header: t("manage_package.createdAt"), accessorKey: "createdAt" },
        ],
        [t, i18n.language]
    );

    return (
        <div className="mt-6 border p-6 rounded-lg shadow-md bg-white">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
                {t("manage_package.history.price_history")}
            </h2>
            <BaseTable
                columns={columns}
                data={data}
                // actions={actions}
                pagination={pagination}
                onPageChange={handlePageChange}
                signifyInformation={sPackageHistory.value}
            />
        </div>
    )
}

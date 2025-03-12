import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import BaseTable from '../../../components/BaseTable/BaseTable';
import { sGoodsIssued } from "../services/SiginifyGoodsIssued"
import SearchGoodsIssuedPage from './SearchGoodsIssuedPage';
import { FaEye } from "react-icons/fa";
import { getAllGoodsIssued, searchGoodsIssued } from '../services/ServiceGoodsIssued';

export default function ListGoodsIssued() {
    const { t, i18n } = useTranslation("manage_goods_issued");
    const [data, setData] = useState(null);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalCount: 0,
        hasPrevious: false,
        hasNext: false,
    })

    const [searchParams, setSearchParams] = useState(null)


    // useCallback tránh re-create hàm
    const fetchData = useCallback(async (page = 1, params = null) => {
        try {
            let response;

            if (params) {
                response = await searchGoodsIssued({ ...params, PageNumber: page });
            } else {
                response = await getAllGoodsIssued(page);
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
                console.error("Loading goods issued failed");
            }
        } catch (error) {
            console.error("Error fetching goods issued: ", error);
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
            { header: t("manage_goods_issued.table.id"), accessorKey: "id", accessorFn: (_row, index) => index + 1 },
            { header: t("manage_goods_issued.table.total_cost"), accessorKey: "totalCost" },
            { header: t("manage_goods_issued.table.reference_number"), accessorKey: "referenceNumber" },
            { header: t("manage_goods_issued.table.invoice_code"), accessorKey: "invoiceCode" },
            { header: t("manage_goods_issued.table.status"), accessorKey: "status" },
            { header: t("manage_goods_issued.table.created_at"), accessorKey: "createdAt" },
            { header: t("manage_goods_issued.table.updated_at"), accessorKey: "updatedAt" },

        ],
        [t, i18n.language]
    );

    const actions = [
        {
            type: "link",
            label: t("manage_goods_issued.table.view"),
            icon: <FaEye />,
            color: "bg-gray-500",
            link: (row) => `${row.original.id}`,
        },
    ];

    return (
        <>
            <SearchGoodsIssuedPage onSearch={handleSearch} />
            <BaseTable
                columns={columns}
                data={data}
                actions={actions}
                pagination={pagination}
                onPageChange={handlePageChange}
                signifyInformation={sGoodsIssued.value}
            />

        </>
    )
}

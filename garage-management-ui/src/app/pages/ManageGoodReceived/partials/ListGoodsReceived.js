import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getAllGoodReceived, searchGoodsReceived } from '../service/GoodsReceivedService';
import { sGoodsReceived } from '../service/GoodsReceivedSignify';
import SearcbGoodsReceivedPage from './SearcbGoodsReceivedPage';
import { FaEye } from 'react-icons/fa';
import BaseTable from "../../../components/BaseTable/BaseTable";

export default function ListGoodsReceived() {
    const { t, i18n } = useTranslation("manage_goods_received");
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalCount: 0,
        hasPrevious: false,
        hasNext: false,
    });
    const [searchParams, setSearchParams] = useState(null)

    // useCallback tránh re-create hàm
    const fetchData = useCallback(async (page = 1, params = null) => {
        try {
            let response;

            if (params) {
                response = await searchGoodsReceived({ ...params, PageNumber: page });
            } else {
                response = await getAllGoodReceived(page);
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
                console.error("Loading goods receipt failed");
            }
        } catch (error) {
            console.error("Error fetching goods receipt: ", error);
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
            { header: t("manage_goods_received.id"), accessorKey: "id", accessorFn: (_row, index) => index + 1 },
            { header: t("manage_goods_received.referenceNumber"), accessorKey: "refereneceNumber" },
            { header: t("manage_goods_received.invoiceCode"), accessorKey: "invoiceCode" },
            { header: t("manage_goods_received.sourceAddress"), accessorKey: "sourceAddress" },
            { header: t("manage_goods_received.sourceProvince"), accessorKey: "sourceProvince" },
            { header: t("manage_goods_received.sourceDistrict"), accessorKey: "sourceDistrict" },
            { header: t("manage_goods_received.sourceWards"), accessorKey: "sourceWards" },
            { header: t("manage_goods_received.totalPrice"), accessorKey: "totalPrice" },
            { header: t("manage_goods_received.contactPersonName"), accessorKey: "contactPersonName" },
            { header: t("manage_goods_received.workPlaceName"), accessorKey: "workPlaceName" },
            { header: t("manage_goods_received.warehouseManagerName"), accessorKey: "warehouseManagereName" },
            { header: t("manage_goods_received.status"), accessorKey: "status" },
            { header: t("manage_goods_received.createdAt"), accessorKey: "createdAt" },
            { header: t("manage_goods_received.updatedAt"), accessorKey: "updatedAt" },
        ],
        [t, i18n.language]
    );

    const actions = [
        {
            type: "link",
            label: t("manage_manage_goods_received.view"),
            icon: <FaEye />,
            color: "bg-gray-500",
            link: (row) => `${row.original.id}`,
        },
    ];



    return (
        <>
            <SearcbGoodsReceivedPage onSearch={handleSearch} />
            <BaseTable
                columns={columns}
                data={data}
                actions={actions}
                pagination={pagination}
                onPageChange={handlePageChange}
                signifyInformation={sGoodsReceived.value}
            />
        </>
    )
}

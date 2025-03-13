import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { getGoodsIssued, getGoodsIssuedDetails } from './services/ServiceGoodsIssued';

export default function ViewGoodsIssued() {
    const { t, i18n } = useTranslation("manage_goods_issued");
    const { id } = useParams();
    const [goodsIssued, setGoodsIssued] = useState(null);
    const [goodsIssuedDetails, setGoodsIssuedDetails] = useState(null);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalCount: 0,
        hasPrevious: false,
        hasNext: false,
    });


    const fetchData = async (id) => {
        try {
            const goodsIssued = await getGoodsIssued(id);
            if (goodsIssued?.data.value) {
                setGoodsIssued(goodsIssued.data.value);
            }

            const goodsIssueDetails = await getGoodsIssuedDetails(id);
            if (goodsIssueDetails.data.value) {
                setGoodsIssuedDetails(goodsIssueDetails.data.value);
            }

        } catch (error) {
            console.error("Error fetching goods received details:", error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchData(id);
        }
    }, [id]);

    // Xử lý khi chuyển trang
    const handlePageChange = (newPage) => {
        fetchData(newPage, searchParams);
    };

    const columns = useMemo(
        () => [
            { header: t("manage_goods_issued.details_table.id"), accessorKey: "id", accessorFn: (_row, index) => index + 1 },
            { header: t("manage_goods_issued.details_table.product_name"), accessorKey: "productName" },
            { header: t("manage_goods_issued.details_table.quantity"), accessorKey: "quantity" },

        ],
        [t, i18n.language]
    );

    return (
        <div>ViewGoodsIssued</div>
    )
}

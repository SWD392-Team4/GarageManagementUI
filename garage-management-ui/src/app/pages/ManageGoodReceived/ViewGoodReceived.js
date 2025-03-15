import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { getGoodReceived, getGoodsReceivedDetails } from './service/GoodsReceivedService';
import Breadcrumb from "../AdminManageAppoinment/partials/Breadcrumb";
import BaseTable from '../../components/BaseTable/BaseTable';
import { sGoodsReceived } from './service/GoodsReceivedSignify'


export default function ViewGoodReceived() {
    const { t, i18n } = useTranslation("manage_goods_received");
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [goodsDetails, setGoodsDetails] = useState(null);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalCount: 0,
        hasPrevious: false,
        hasNext: false,
    });

    const fetchData = async (id) => {
        try {
            const goodsReceived = await getGoodReceived(id);
            if (goodsReceived?.data.value) {
                setData(goodsReceived.data.value);
            }

            const goodsReceivedDetails = await getGoodsReceivedDetails(id);
            if (goodsReceivedDetails.data.value) {
                setGoodsDetails(goodsReceivedDetails.data.value);
                setPagination({
                    currentPage: response.data.paging.currentPage,
                    totalPages: response.data.paging.totalPages,
                    totalCount: response.data.paging.totalCount,
                    hasPrevious: response.data.paging.hasPrevious,
                    hasNext: response.data.paging.hasNext,
                });
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
            { header: t("manage_goods_received.goods_received_details.id"), accessorKey: "id", accessorFn: (_row, index) => index + 1 },
            { header: t("manage_goods_received.goods_received_details.product_name"), accessorKey: "productName" },
            { header: t("manage_goods_received.goods_received_details.quantity"), accessorKey: "quantity" },
            { header: t("manage_goods_received.goods_received_details.unit_price"), accessorKey: "unitPrice" },
            { header: t("manage_goods_received.goods_received_details.total_price"), accessorKey: "totalPrice" },
            { header: t("manage_goods_received.goods_received_details.reference_number"), accessorKey: "refereneceNumber" },
            { header: t("manage_goods_received.goods_received_details.status"), accessorKey: "status" },
            { header: t("manage_goods_received.goods_received_details.created_at"), accessorKey: "createdAt" },
            { header: t("manage_goods_received.goods_received_details.updated_at"), accessorKey: "updatedAt" },
        ],
        [t, i18n.language]
    );

    return (
        <div className="bg-white shadow-lg p-6 rounded-lg">
            <Breadcrumb />
            <h1 className="text-2xl font-bold text-gray-800 mb-4">{t('manage_goods_received.view_goods_received.title')}</h1>

            {/* Kiểm tra dữ liệu trước khi hiển thị */}
            {data ? (
                <div className="border border-gray-200 p-4 rounded-md bg-gray-50">
                    <h2 className="text-lg font-semibold text-gray-700">ID: {data.id}</h2>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                        {/* Cột 1 */}
                        <div>
                            <p className="text-gray-600"><strong>{t('manage_goods_received.view_goods_received.reference_number')}:</strong> {data.refereneceNumber}</p>
                            <p className="text-gray-600"><strong>{t('manage_goods_received.view_goods_received.invoice_code')}:</strong> {data.invoiceCode}</p>
                            <p className="text-gray-600"><strong>{t('manage_goods_received.view_goods_received.total_price')}:</strong>
                                <span className="text-green-600 font-medium"> {data.totalPrice} VND</span>
                            </p>
                            <p className="text-gray-600"><strong>{t('manage_goods_received.view_goods_received.contact_person')}:</strong> {data.contactPersonName}</p>
                        </div>

                        {/* Cột 2 */}
                        <div>
                            <p className="text-gray-600"><strong>{t('manage_goods_received.view_goods_received.workplace_name')}:</strong> {data.workPlaceName}</p>
                            <p className="text-gray-600"><strong>{t('manage_goods_received.view_goods_received.warehouse_manager')}:</strong> {data.warehouseManagereName}</p>
                            <p className="text-gray-600"><strong>{t('manage_goods_received.view_goods_received.status')}:</strong>
                                <span className={`px-2 py-1 text-sm font-medium rounded-md 
                                    ${data.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {data.status}
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* Địa chỉ nguồn */}
                    <div className="mt-4 p-3 bg-white rounded-md border border-gray-300">
                        <p className="text-gray-700 font-medium">{t('manage_goods_received.view_goods_received.source_address')}</p>
                        <p className="text-gray-600">{data.sourceAddress}, {data.sourceWards}, {data.sourceDistrict}, {data.sourceProvince}</p>
                    </div>

                    {/* Ngày tạo & cập nhật */}
                    <div className="flex justify-between items-center mt-4 text-gray-500 text-sm">
                        <p>{t('manage_goods_received.view_goods_received.created_at')}: <span className="font-medium">{data.createdAt}</span></p>
                        <p>{t('manage_goods_received.view_goods_received.updated_at')}: <span className="font-medium">{data.updatedAt}</span></p>
                    </div>
                </div>


            ) : (
                <p className="text-gray-500">{t('manage_goods_received.loading')}</p>
            )}

            <div className="border border-gray-200 p-4 rounded-md bg-gray-50 mt-5">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">{t('manage_goods_received.goods_received_details.title')}</h1>


                <BaseTable
                    columns={columns}
                    data={goodsDetails}
                    // actions={actions}
                    pagination={pagination}
                    onPageChange={handlePageChange}
                    signifyInformation={sGoodsReceived.value}
                />

            </div>

        </div>
    );
}

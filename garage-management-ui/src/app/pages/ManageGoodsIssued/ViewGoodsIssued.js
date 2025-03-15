import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { getGoodsIssued, getGoodsIssuedDetails, } from "./services/ServiceGoodsIssued";
import BaseTable from "../../components/BaseTable/BaseTable";
import Breadcrumb from "../AdminManageAppoinment/partials/Breadcrumb";
import { sGoodsIssued } from "./services/SiginifyGoodsIssued";

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
      { header: t("manage_goods_issued.goods_issued_details.id"), accessorKey: "id", accessorFn: (_row, index) => index + 1 },
      { header: t("manage_goods_issued.goods_issued_details.id"), accessorKey: "id" },

    ],
    [t, i18n.language]
  );

  return (
    <div className="md:p-6">
      <Breadcrumb />

      <h1 className="text-2xl font-bold text-gray-800 mb-4">{t('manage_goods_issued.view_goods_issued.title')}</h1>

      {/* Kiểm tra dữ liệu trước khi hiển thị */}
      {goodsIssued ? (
        <div className="border border-gray-200 p-4 rounded-md bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-700">
            ID: {goodsIssued.id}
          </h2>

          <div className="grid grid-cols-2 gap-4 mt-4">
            {/* Cột 1 */}
            <div>
              <p className="text-gray-600">
                <strong>{t('manage_goods_issued.view_goods_issued.reference_number')}:</strong> {goodsIssued.referenceNumber}
              </p>
              <p className="text-gray-600">
                <strong>{t('manage_goods_issued.view_goods_issued.invoice_code')}:</strong> {goodsIssued.invoiceCode}
              </p>
              <p className="text-gray-600">
                <strong>{t('manage_goods_issued.view_goods_issued.total_price')}:</strong>
                <span className="text-green-600 font-medium"> {goodsIssued.totalCost} VND</span>
              </p>
            </div>

            {/* Cột 2 */}
            <div>
              <p className="text-gray-600">
                <strong>{t('manage_goods_issued.view_goods_issued.createdWareHouseManager')}:</strong> {goodsIssued.createdWareHouseManager || 'N/A'}
              </p>
              <p className="text-gray-600">
                <strong>{t('manage_goods_issued.view_goods_issued.wareHouse')}:</strong> {goodsIssued.wareHouse || 'N/A'}
              </p>
              <p className="text-gray-600">
                <strong>{t('manage_goods_issued.view_goods_issued.status')}:</strong>
                <span
                  className={`px-2 py-1 text-sm font-medium rounded-md ${goodsIssued.status === 'Active'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                    }`}
                >
                  {goodsIssued.status}
                </span>
              </p>
            </div>
          </div>
          {/* Ngày tạo & cập nhật */}
          <div className="flex justify-between items-center mt-4 text-gray-500 text-sm">
            <p>
              {t('manage_goods_issued.view_goods_issued.created_at')}:{" "}
              <span className="font-medium">{goodsIssued.createdAt}</span>
            </p>
            <p>
              {t('manage_goods_issued.view_goods_issued.updated_at')}:{" "}
              <span className="font-medium">{goodsIssued.updatedAt}</span>
            </p>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">{t('manage_goods_issued.loading')}</p>
      )}

      <div className="border border-gray-200 p-4 rounded-md bg-gray-50 mt-5">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{t('manage_goods_received.goods_received_details.title')}</h1>
        <BaseTable
          columns={columns}
          data={goodsIssuedDetails}
          // actions={actions}
          pagination={pagination}
          onPageChange={handlePageChange}
          signifyInformation={sGoodsIssued.value}
        />
      </div>

    </div>
  );
}

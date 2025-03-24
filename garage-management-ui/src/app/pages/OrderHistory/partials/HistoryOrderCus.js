import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FaClock,
  FaEye,
  FaTools,
  FaBox,
  FaLayerGroup,
  FaTimesCircle,
  FaTag,
  FaList,
  FaDollarSign,
  FaCog,
  FaExchangeAlt,
  FaHourglassHalf,
  FaCheck,
} from "react-icons/fa";
import { getAllInvoice } from "../services/HistoryOrderService";
import { sAccount } from "../../AuthCustomer/services/store";

// Thay thế `orders` bằng dữ liệu thực tế của bạn
// const orders = [
//   {
//     id: "25069ee1-604e-409f-97c7-0c66e3b868f3",
//     invoiceType: "InvoiceService",
//     customerId: "773d6761-8990-4408-be8f-321a7659825a",
//     customerName: "Tan Nguyen",
//     customerPhoneNumber: "0902596109",
//     customerEmail: "customer1@gmail.com",
//     totalPrice: 26000000,
//     status: "Inactive",
//     createdAt: "2025-03-25T05:08:44.9312951+00:00",
//     invoiceSellProducts: [],
//     invoicePackageDetails: [],
//     invoiceServiceDetails: [
//       {
//         serviceHistoryId: "ee2e7882-1901-4269-8236-3e0290fdbea5",
//         invoiceId: "25069ee1-604e-409f-97c7-0c66e3b868f3",
//         createdAt: "2025-03-25T05:08:44.9312951+00:00",
//         replacementParts: [],
//         serviceHistory: {
//           serviceId: "70185522-82fe-41bb-9168-04065c56009f",
//           price: 13000000,
//           status: "Inactive",
//           createdAt: "2025-03-24T17:59:36.302708+07:00",
//           updatedAt: "0001-01-01T00:00:00+00:00",
//         },
//         service: {
//           id: "70185522-82fe-41bb-9168-04065c56009f",
//           serviceName: "Nâng Cấp Bánh Răng Truyền Động",
//           serviceCategory: "Upgrade",
//           carPartId: "a38cba54-aacf-412b-a94d-bad73182dd34",
//           carCategoryId: "6f9e4206-d0a0-4366-a997-094827005006",
//           price: 13000000,
//           workNature: "Enhancement",
//           action: "Replace",

//           estimatedHours: 1,
//           status: "Active",
//         },
//       },
//     ],
//   },
//   {
//     id: "0131d798-ca3a-48cc-a357-b56d48c47169",
//     invoiceType: "InvocieSell",
//     customerId: "773d6761-8990-4408-be8f-321a7659825a",
//     customerName: "A",
//     customerPhoneNumber: "0902596109",
//     customerEmail: "customer1@gmail.com",
//     totalPrice: 8735087.88,
//     status: "Inactive",
//     createdAt: "2025-03-24T19:29:52.2688128+07:00",
//     invoiceSellProducts: [
//       {
//         id: "f3f06e59-7643-4ee0-af99-797a38353fda",
//         productId: "95655aac-ead4-49aa-9b54-a185b702cd81",
//         productName: "Bình chữa cháy mini",
//         quantity: 1,
//         createdAt: "2025-03-24T19:29:52.590574+07:00",
//       },
//     ],
//     invoicePackageDetails: [],
//     invoiceServiceDetails: [],
//   },
//   {
//     id: "24483113-be6d-4f29-b3bf-bca5df0c0a4e",
//     invoiceType: "InvoicePackage",
//     customerId: "773d6761-8990-4408-be8f-321a7659825a",
//     customerName: "Tan Nguyen",
//     customerPhoneNumber: "0902596109",
//     customerEmail: "customer1@gmail.com",
//     totalPrice: 50000000,
//     status: "Inactive",
//     createdAt: "2025-03-25T05:51:01.517783+00:00",
//     invoiceSellProducts: [],
//     invoicePackageDetails: [
//       {
//         invoiceId: "24483113-be6d-4f29-b3bf-bca5df0c0a4e",
//         packageHistoryId: "24120cfb-caa7-487c-aede-7cb30475697c",
//         createdAt: "2025-03-25T05:51:01.517783+00:00",
//         packageHistory: {
//           id: "24120cfb-caa7-487c-aede-7cb30475697c",
//           packageId: "8a11ae41-1cb7-4bcf-a5b3-26156fbfd8dd",
//           serviceCategory: "Maintenance",
//           carCategoryId: "3a6129c6-36ce-4e85-b0a0-8ffbee30ddf1",
//           packageName: "Maintain Sedan V1",

//           type: "TimeLimited",
//           packagePrice: 20000000,
//           validityPeriod: 6,
//           timeUnit: "Month",
//           usageLimit: 3,
//           createdAt: "2025-03-24T18:58:59.2776588+07:00",
//         },
//       },
//     ],
//     invoiceServiceDetails: [
//       {
//         serviceHistoryId: "7a12d7df-57f5-4d51-9c24-1e1e167dbb73",
//         invoiceId: "24483113-be6d-4f29-b3bf-bca5df0c0a4e",
//         createdAt: "2025-03-25T05:51:01.517783+00:00",
//         replacementParts: [],
//         serviceHistory: {
//           serviceId: "03d9feff-780c-44b3-a58e-df291d1646c8",
//           price: 15000000,
//           status: "Inactive",
//           createdAt: "2025-03-24T18:20:28.4064053+07:00",
//           updatedAt: "0001-01-01T00:00:00+00:00",
//         },
//         service: {
//           id: "03d9feff-780c-44b3-a58e-df291d1646c8",
//           serviceName: "Kiểm Tra và Nâng Cấp Bánh Răng Truyền Động",
//           serviceCategory: "Upgrade",
//           carPartId: "a38cba54-aacf-412b-a94d-bad73182dd34",
//           carCategoryId: "3a6129c6-36ce-4e85-b0a0-8ffbee30ddf1",
//           price: 15000000,
//           workNature: "Enhancement",
//           action: "Inspect",

//           estimatedHours: 2,
//           status: "Inactive",
//         },
//       },
//       {
//         serviceHistoryId: "475b905e-bd56-455f-bbee-c34566f085a7",
//         invoiceId: "24483113-be6d-4f29-b3bf-bca5df0c0a4e",
//         createdAt: "2025-03-25T05:51:01.517783+00:00",
//         replacementParts: [],
//         serviceHistory: {
//           serviceId: "acd96a1f-b64b-45b3-ad70-bfbacef5b60f",
//           price: 1300000,
//           status: "Inactive",
//           createdAt: "2025-03-24T18:11:38.2751431+07:00",
//           updatedAt: "0001-01-01T00:00:00+00:00",
//         },
//         service: {
//           id: "acd96a1f-b64b-45b3-ad70-bfbacef5b60f",
//           serviceName: "Kiểm Tra Dây Nối Bình Ắc Quy",
//           serviceCategory: "Maintenance",
//           carPartId: "f09d5572-1c41-4d68-8346-1b01be972dc0",
//           carCategoryId: "3a6129c6-36ce-4e85-b0a0-8ffbee30ddf1",
//           price: 1300000,
//           workNature: "Preventive",
//           action: "Inspect",
//           estimatedHours: 1,
//           status: "Active",
//         },
//       },
//       {
//         serviceHistoryId: "3f55dcb7-52bb-4a1a-918d-cfc484aab05b",
//         invoiceId: "24483113-be6d-4f29-b3bf-bca5df0c0a4e",
//         createdAt: "2025-03-25T05:51:01.517783+00:00",
//         replacementParts: [],
//         serviceHistory: {
//           serviceId: "fe34bef4-abe0-4b10-ab6c-c764c69b6018",
//           price: 5000000,
//           status: "Inactive",
//           createdAt: "2025-03-24T17:32:26.3138951+07:00",
//           updatedAt: "0001-01-01T00:00:00+00:00",
//         },
//         service: {
//           id: "fe34bef4-abe0-4b10-ab6c-c764c69b6018",
//           serviceName: "Nâng Cấp Lốp Xe Sedan",
//           serviceCategory: "Upgrade",
//           carPartId: "81d61fbe-00d5-4e65-94aa-62639341c4f1",
//           carCategoryId: "3a6129c6-36ce-4e85-b0a0-8ffbee30ddf1",
//           price: 5000000,
//           workNature: "Enhancement",
//           action: "Replace",
//           estimatedHours: 1,
//           status: "Active",
//         },
//       },
//     ],
//   },
// ];
export default function HistoryOrderCus() {
  const { t } = useTranslation("order_history_customer");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const render = sAccount.use();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getAllInvoice();
      if (response.data.value) {
        setOrders(response.data.value);
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách hóa đơn:", error);
    }
  };

  const handleViewDetail = (order) => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  const getIconByType = (type) => {
    if (type === "InvoiceService") return <FaTools className="text-blue-500" />;
    if (type === "InvocieSell") return <FaBox className="text-green-500" />;
    if (type === "InvoicePackage")
      return <FaLayerGroup className="text-purple-500" />;
    return <FaClock />;
  };

  const groupByType = (type) => orders.filter((o) => o.invoiceType === type);

  const renderOrderRow = (order) => (
    <div
      key={order.id}
      className="p-4 flex items-center justify-between border border-gray-300 rounded-lg shadow-sm bg-gray-50"
    >
      <div className="flex items-center gap-4">
        <div className="p-2 bg-gray-100 rounded-full text-xl">
          {getIconByType(order.invoiceType)}
        </div>
        <div>
          <p className="text-gray-800 font-medium">{order.customerName}</p>
          <p className="text-sm text-gray-500">
            {new Date(order.createdAt).toLocaleString("vi-VN")}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            order.status === "Active"
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {t(`status.${order.status.toLowerCase()}`)}
        </span>
        <p className="text-gray-700 font-semibold">
          {order.totalPrice.toLocaleString("vi-VN")}₫
        </p>
        <button
          className="p-2 text-gray-500 hover:text-gray-700"
          onClick={() => handleViewDetail(order)}
        >
          <FaEye size={20} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 min-h-screen">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{t("title")}</h2>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-blue-600">
          {t("service_invoices")}
        </h3>
        {groupByType("InvoiceService").map(renderOrderRow)}

        <h3 className="text-lg font-semibold text-green-600">
          {t("product_invoices")}
        </h3>
        {groupByType("InvocieSell").map(renderOrderRow)}

        <h3 className="text-lg font-semibold text-purple-600">
          {t("package_invoices")}
        </h3>
        {groupByType("InvoicePackage").map(renderOrderRow)}
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <FaTimesCircle size={24} />
            </button>

            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              {t("order_detail")}
            </h2>
            <p>
              <strong>{t("customer_name")}</strong>:{" "}
              {selectedOrder.customerName}
            </p>
            <p>
              <strong>{t("phone")}</strong>: {selectedOrder.customerPhoneNumber}
            </p>
            <p>
              <strong>{t("email")}</strong>: {selectedOrder.customerEmail}
            </p>
            <p>
              <strong>{t("total_price")}</strong>:{" "}
              {selectedOrder.totalPrice.toLocaleString("vi-VN")}₫
            </p>

            {selectedOrder.invoiceType === "InvoiceService" && (
              <div className="mt-4 max-h-[60vh] overflow-y-auto flex flex-col gap-4 pr-2">
                {selectedOrder.invoiceServiceDetails.map((detail, idx) => (
                  <div
                    key={idx}
                    className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                  >
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div className="flex items-center gap-2">
                        <FaTag className="text-blue-500" />
                        <strong>{t("invoice_service.name")}</strong>:{" "}
                        {detail.service.serviceName}
                      </div>
                      <div className="flex items-center gap-2">
                        <FaList className="text-yellow-500" />
                        <strong>{t("invoice_service.category")}</strong>:{" "}
                        {detail.service.serviceCategory}
                      </div>
                      <div className="flex items-center gap-2">
                        <FaDollarSign className="text-green-600" />
                        <strong>{t("invoice_service.price")}</strong>:{" "}
                        {detail.service.price.toLocaleString("vi-VN")}₫
                      </div>
                      <div className="flex items-center gap-2">
                        <FaCog className="text-indigo-500" />
                        <strong>{t("invoice_service.nature")}</strong>:{" "}
                        {detail.service.workNature}
                      </div>
                      <div className="flex items-center gap-2">
                        <FaExchangeAlt className="text-pink-500" />
                        <strong>{t("invoice_service.action")}</strong>:{" "}
                        {detail.service.action}
                      </div>
                      <div className="flex items-center gap-2">
                        <FaHourglassHalf className="text-orange-500" />
                        <strong>
                          {t("invoice_service.estimated_hours")}
                        </strong>: {detail.service.estimatedHours} giờ
                      </div>
                      <div className="flex items-center gap-2">
                        <FaCheck className="text-teal-600" />
                        <strong>{t("invoice_service.status")}</strong>:{" "}
                        {detail.service.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {selectedOrder.invoiceType === "InvocieSell" && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedOrder.invoiceSellProducts.map((product, idx) => (
                  <div
                    key={idx}
                    className="border border-gray-200 rounded-lg p-4 bg-gray-50 shadow-sm"
                  >
                    <p className="text-lg font-semibold text-gray-800 mb-2">
                      🛒 {product.productName}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>{t("invoice_product.quantity")}:</strong>{" "}
                      {product.quantity}
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>{t("invoice_product.created_at")}:</strong>{" "}
                      {new Date(product.createdAt).toLocaleString("vi-VN")}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {selectedOrder.invoiceType === "InvoicePackage" && (
              <>
                {/* GÓI DỊCH VỤ */}
                <div className="mt-4 flex flex-col gap-4">
                  {selectedOrder.invoicePackageDetails.map((pkg, idx) => (
                    <div
                      key={idx}
                      className="border border-purple-300 rounded-lg p-4 bg-purple-50 shadow-sm"
                    >
                      <p className="text-lg font-semibold text-purple-700 mb-2">
                        🎁 {pkg.packageHistory.packageName}
                      </p>
                      <p>
                        <strong>{t("invoice_package.type")}:</strong>{" "}
                        {pkg.packageHistory.type}
                      </p>
                      <p>
                        <strong>{t("invoice_package.package_price")}:</strong>{" "}
                        {pkg.packageHistory.packagePrice.toLocaleString(
                          "vi-VN"
                        )}
                        ₫
                      </p>
                      <p>
                        <strong>{t("invoice_package.validity")}:</strong>{" "}
                        {pkg.packageHistory.validityPeriod}{" "}
                        {pkg.packageHistory.timeUnit}
                      </p>
                      <p>
                        <strong>{t("invoice_package.usage_limit")}:</strong>{" "}
                        {pkg.packageHistory.usageLimit}
                      </p>
                    </div>
                  ))}
                </div>

                {/* DỊCH VỤ TRONG GÓI */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedOrder.invoiceServiceDetails.map((detail, idx) => (
                    <div
                      key={idx}
                      className="border border-gray-200 rounded-lg p-4 bg-gray-50 shadow-sm"
                    >
                      <div className="grid grid-cols-1 gap-3">
                        <div className="flex items-center gap-2">
                          <FaTag className="text-blue-500" />
                          <strong>{t("invoice_service.name")}:</strong>{" "}
                          {detail.service.serviceName}
                        </div>
                        <div className="flex items-center gap-2">
                          <FaList className="text-yellow-500" />
                          <strong>{t("invoice_service.category")}:</strong>{" "}
                          {detail.service.serviceCategory}
                        </div>
                        <div className="flex items-center gap-2">
                          <FaDollarSign className="text-green-600" />
                          <strong>{t("invoice_service.price")}:</strong>{" "}
                          {detail.service.price.toLocaleString("vi-VN")}₫
                        </div>
                        <div className="flex items-center gap-2">
                          <FaCog className="text-indigo-500" />
                          <strong>{t("invoice_service.nature")}:</strong>{" "}
                          {detail.service.workNature}
                        </div>
                        <div className="flex items-center gap-2">
                          <FaExchangeAlt className="text-pink-500" />
                          <strong>{t("invoice_service.action")}:</strong>{" "}
                          {detail.service.action}
                        </div>
                        <div className="flex items-center gap-2">
                          <FaHourglassHalf className="text-orange-500" />
                          <strong>
                            {t("invoice_service.estimated_hours")}:
                          </strong>{" "}
                          {detail.service.estimatedHours} giờ
                        </div>
                        <div className="flex items-center gap-2">
                          <FaCheck className="text-teal-600" />
                          <strong>{t("invoice_service.status")}:</strong>{" "}
                          {detail.service.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            <div className="mt-6 text-right">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                {t("close")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

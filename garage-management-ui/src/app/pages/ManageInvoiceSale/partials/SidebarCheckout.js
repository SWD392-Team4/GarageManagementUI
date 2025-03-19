import React from "react";
import { useTranslation } from "react-i18next";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";

export default function SidebarCheckout({
  register,
  fields,
  handleQuantityChange,
  remove,
  calculateTotal,
  handleSubmit,
  onSubmit,
  isFormValid,
}) {
  const { t } = useTranslation("create_invoice_sale");

  return (
    <div className="col-span-1 bg-white p-6 rounded-xl shadow-lg flex flex-col justify-between border">
      {/* Thông tin khách hàng */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          {t("create_invoice_sale.sidebar_checkout.customer_info")}
        </h3>

        <div className="space-y-3">
          <input
            className="border rounded-lg w-full p-3 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            {...register("customer.name")}
            placeholder={t(
              "create_invoice_sale.sidebar_checkout.customer_name"
            )}
          />
          <input
            className="border rounded-lg w-full p-3 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            {...register("customer.phone")}
            placeholder={t(
              "create_invoice_sale.sidebar_checkout.customer_phone"
            )}
          />
          <input
            className="border rounded-lg w-full p-3 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            {...register("customer.email")}
            placeholder={t(
              "create_invoice_sale.sidebar_checkout.customer_email"
            )}
          />
        </div>
      </div>
      {/* Danh sách sản phẩm đã chọn */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          {t("create_invoice_sale.sidebar_checkout.selected_products")}
        </h3>

        <div className="max-h-[250px] overflow-y-auto border rounded-lg p-3 bg-gray-50">
          {fields.length > 0 ? (
            <div className="grid grid-cols-3 gap-2 items-center bg-gray-100 p-2 rounded-lg font-semibold text-gray-700 text-sm">
              <span className="text-center">
                {t("create_invoice_sale.sidebar_checkout.product_name")}
              </span>
              <span className="text-center">
                {t("create_invoice_sale.sidebar_checkout.quantity")}
              </span>
              <span className="text-center">
                {t("create_invoice_sale.sidebar_checkout.actions")}
              </span>
            </div>
          ) : null}

          {fields.length > 0 ? (
            fields.map((item, index) => (
              <div
                key={item.productId}
                className="grid grid-cols-3 items-center bg-white rounded-lg p-3 shadow-sm border mt-2"
              >
                {/* Cột 1: Tên sản phẩm */}
                <div className="text-sm font-medium text-gray-800 text-center">
                  {item.name}
                </div>

                {/* Cột 2: Điều chỉnh số lượng */}
                <div className="flex items-center justify-center gap-2">
                  <button
                    className="bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 transition"
                    onClick={() =>
                      handleQuantityChange(index, item.quantity - 1)
                    }
                  >
                    <FaMinus size={12} />
                  </button>
                  <input
                    type="number"
                    className="w-12 text-center border rounded-lg p-1"
                    value={item.quantity}
                    min="1"
                    max={item.maxQuantity}
                    onChange={(e) =>
                      handleQuantityChange(index, parseInt(e.target.value) || 1)
                    }
                  />
                  <button
                    className="bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 transition"
                    onClick={() =>
                      handleQuantityChange(index, item.quantity + 1)
                    }
                  >
                    <FaPlus size={12} />
                  </button>
                </div>

                {/* Cột 3: Xóa sản phẩm */}
                <div className="flex justify-center">
                  <button
                    className="text-red-500 hover:text-red-700 transition"
                    onClick={() => remove(index)}
                  >
                    <FaTrash size={16} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm text-center mt-2">
              {t("create_invoice_sale.sidebar_checkout.no_products")}
            </p>
          )}
        </div>
      </div>
      {/* Tổng tiền */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800">{t("total")}</h3>
        <p className="text-2xl font-bold text-green-600">
          {calculateTotal().toLocaleString()} VND
        </p>
      </div>
      {/* Nút tạo hóa đơn */}
      <button
        className={`px-5 py-3 rounded-lg w-full font-semibold mt-6 transition-all shadow-md ${
          isFormValid
            ? "bg-green-500 text-white hover:bg-green-600"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        onClick={handleSubmit(onSubmit)}
        disabled={!isFormValid}
      >
        {t("create_invoice_sale.sidebar_checkout.create_invoice")}
      </button>
    </div>
  );
}

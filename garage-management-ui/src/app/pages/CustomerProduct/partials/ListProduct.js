import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
const ListProduct = ({ products }) => {
  const navigate = useNavigate();
  const { t } = useTranslation("customer_product_detail");
  return (
    <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {products.map((item) => {
        return (
          <div
            onClick={() => navigate(`/product/${item.Id}`)}
            key={item.Id}
            className=" border rounded-2xl shadow-lg p-4 flex flex-col items-center bg-white transition transform hover:-translate-y-2 hover:shadow-xl cursor-pointer "
          >
            <img
              src={item.ProductImg || "https://via.placeholder.com/150"}
              alt={item.ProductName}
              className="w-full h-40 object-contain rounded-md"
            />
            <hr className="w-full border-t mt-2 outline-red" />
            <h3 className="text-lg font-semibold mt-2">{item.ProductName}</h3>
            <p className="text-gray-600 ">{item.ProductPrice}đ</p>
            <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
              {t("customer_product_detail.product_book_now")}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ListProduct;

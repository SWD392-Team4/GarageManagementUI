import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
const ListProduct = ({ products }) => {
  const navigate = useNavigate();
  const placeholder = "/assets/img/placeholder-product.jpeg";
  const { t } = useTranslation("customer_product_detail");
  return (
    <div className="min-h-screen p-6">
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((item) => {
          const productImage =
            item.productImage?.length > 0 ? item.productImage[0] : placeholder;
          return (
            <div
              onClick={() => navigate(`/product/${item.id}`)}
              key={item.id}
              className=" bg-white border border-gray-300 rounded-2xl shadow-md p-4 flex flex-col items-center 
                          transition transform hover:scale-105 hover:shadow-2xl cursor-pointer "
            >
              <img
                src={productImage}
                alt={item.productName}
                className="w-full h-40 object-contain rounded-md"
              />
              <hr className="w-full border-t mt-2" />
              <h3 className="text-lg font-semibold text-black mt-2">
                {item.productName}
              </h3>
              <p className="text-gray-600 font-semibold ">
                {item.productPrice}đ
              </p>
              <button
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg transition 
                   hover:bg-red-600 hover:text-white"
              >
                {t("customer_product_detail.product_book_now")}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListProduct;

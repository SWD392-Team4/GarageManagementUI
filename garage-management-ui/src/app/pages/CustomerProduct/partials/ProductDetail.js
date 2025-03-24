import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "../partials/LoadingSpinner";
import { getProduct } from "../services/CustomerProductService";
import ImageCarousel from "../../ManageProduct/partials/ImageCarousel";
const ProductDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation("customer_product_detail");

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);
  const placeholder = "/assets/img/placeholder-product.jpeg";

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await getProduct(id);
        if (data) {
          setProduct(data);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError("Failed to fetch product");
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);
  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!product) return null;

  return (
    <div className="py-12 2xl:px-20 md:px-6 px-4">
      <div className="md:flex items-start justify-center">
        {/* Image Carousel Section */}
        <div className="xl:w-2/6 lg:w-2/5 sm:w-full flex flex-col items-center">
          {product.productImage ? (
            <ImageCarousel linkImage={product.productImage} imagesWatch={[]} />
          ) : (
            <img
              src={placeholder}
              alt="Product"
              className="w-full h-full object-cover rounded-lg"
            />
          )}
        </div>

        {/* Product Info Section */}
        <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
          <div className="border-b border-gray-200 pb-6">
            <p className="text-md leading-none text-gray-600 mb-3">
              {product.category}
            </p>
            <h1
              className="
							lg:text-3xl
							text-2xl
							font-semibold
							lg:leading-6
							leading-7
							text-gray-800
							mt-2
						"
            >
              {product.productName}
            </h1>
            <p className="text-2xl font-semibold mt-6 text-gray-800">
              {product.productPrice}đ
            </p>
          </div>
          <div className="text-base lg:leading-tight leading-normal text-gray-600 mt-7 mb-8">
            <p className="text-base leading-4 mt-7 text-gray-600">
              {t("customer_product_detail.product_code")}:{" "}
              {product.productBarcode}
            </p>
            <p className="text-base leading-4 mt-4 text-gray-600">
              {t("customer_product_detail.product_brand")}: {product.brandName}
            </p>
            <p className="text-base leading-4 mt-4 text-gray-600">
              {t("customer_product_detail.product_made_in")}: Vietnam
            </p>
            <p className="text-base leading-4 mt-4 text-gray-600">
              {t("customer_product_detail.product_warranty")}: 12 months
            </p>
          </div>

          <Link to={"/booking"}>
            <button
              className="
						text-base
						flex
						items-center
						justify-center
						leading-none
						text-white
						bg-red-600
						w-full
						py-4
						hover:bg-red-500
            rounded-lg 
            transition
					"
            >
              {t("customer_product_detail.product_book_now")}
            </button>
          </Link>
        </div>
      </div>
      {/* Product Description */}
      <div className="mt-10 border-t border-gray-200 pt-6 ">
        <h2 className="w-full text-2xl font-semibold text-gray-800 mb-4 bg-gray-100 px-4 py-2 rounded-md inline-block">
          {t("customer_product_detail.product_detail")}
        </h2>

        <p className="text-gray-600">{product.productDescription}</p>
      </div>
    </div>
  );
};

export default ProductDetail;

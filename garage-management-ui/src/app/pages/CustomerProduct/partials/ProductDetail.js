import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../partials/LoadingSpinner";
import {getProduct} from "../services/CustomerProductService";
const ProductDetail = () => {
  const { id } = useParams();
  const {t} = useTranslation("customer_product_detail");
  // const product = {
  //   id: 101,
  //   name: "Lọc dầu động cơ",
  //   price: "250",
  //   uri: "https://templates.hibootstrap.com/audeck/default/assets/img/home-one/parts/1.png",
  //   category: "Engine Parts",
  //   code: "LOCD101",
  //   brand: "OEM",
  //   manufacture: "Vietnam",
  //   warranty: "12 months",
  //   description:
  //     "A high-quality engine oil filter designed to improve performance and longevity.",
  //   images: [
  //     "https://templates.hibootstrap.com/audeck/default/assets/img/home-one/parts/1.png",
  //     "https://templates.hibootstrap.com/audeck/default/assets/img/home-one/parts/2.png",
  //     "https://templates.hibootstrap.com/audeck/default/assets/img/home-one/parts/3.png",
  //     "https://templates.hibootstrap.com/audeck/default/assets/img/home-one/parts/4.png",
  //     "https://templates.hibootstrap.com/audeck/default/assets/img/home-one/parts/5.png",
  //   ],
  // };
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [error, setError] = useState(null);
  const placeholder = "/assets/img/service_img_1.jpg";
  const [startIndex, setStartIndex] = useState(0);
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await getProduct(id);
        if (data) {
          setProduct(data);
          setSelectedImage(data.ImageLink[0] || placeholder ); 
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

  const totalImages = product.ImageLink.length;
  const thumbnailsToShow = Math.min(totalImages, 5); // Show up to 5 thumbnails
  const visibleThumbnails = product.ImageLink.slice(startIndex, startIndex + thumbnailsToShow);
  
  const nextThumbnails = () => {
    if (startIndex + thumbnailsToShow < totalImages) {
      setStartIndex(startIndex + 1);
    }
  };

  const prevThumbnails = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };
  return (
    <div className="py-12 2xl:px-20 md:px-6 px-4">
      <div className="md:flex items-start justify-center">
        {/* Image Section */}
        <div className="xl:w-2/6 lg:w-2/5 sm:w-full  flex flex-col items-center">
          <img
            className="w-full h-80 object-contain rounded-lg "
            alt={product.ProductName}
            src={selectedImage}
          />
        {/* Thumbnail Navigation */}
        {totalImages > 1 && (
            <div className="flex items-center justify-center mt-4 space-x-2">
              {startIndex > 0 && (
                <button
                  className="p-2 rounded-full text-gray-700 hover:bg-gray-200"
                  onClick={prevThumbnails}
                >
                  <ChevronLeftIcon className="w-6 h-6" />
                </button>
              )}

              {visibleThumbnails.map((img, index) => (
                <img
                  key={index}
                  className={`w-16 h-16 object-contain border cursor-pointer rounded-md transition ${
                    selectedImage === img ? "border-red-500" : "border-gray-300"
                  }`}
                  alt={product.ProductName}
                  src={img}
                  onClick={() => setSelectedImage(img)}
                />
              ))}

              {startIndex + thumbnailsToShow < totalImages && (
                <button
                  className="p-2 rounded-full text-gray-700 hover:bg-gray-200"
                  onClick={nextThumbnails}
                >
                  <ChevronRightIcon className="w-6 h-6" />
                </button>
              )}
            </div>
          )}
        </div>
        {/* Product Info Section */}
        <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
          <div className="border-b border-gray-200 pb-6">
            <p className="text-md leading-none text-gray-600 mb-3">
              {product.Category}
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
              {product.ProductName}
            </h1>
            <p className="text-2xl font-semibold mt-6 text-gray-800">
              {product.ProductPrice}đ
            </p>
          </div>
          <div className="text-base lg:leading-tight leading-normal text-gray-600 mt-7 mb-8">
            <p className="text-base leading-4 mt-7 text-gray-600">
              {t("customer_product_detail.product_code")}: {product.ProductBarcode}
            </p>
            <p className="text-base leading-4 mt-4 text-gray-600">
            {t("customer_product_detail.product_brand")}: {product.BrandName}
            </p>
            <p className="text-base leading-4 mt-4 text-gray-600">
            {t("customer_product_detail.product_made_in")}: Vietnam
            </p>
            <p className="text-base leading-4 mt-4 text-gray-600">
            {t("customer_product_detail.product_warranty")}: 12 months
            </p>
          </div>

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
        </div>
      </div>
       {/* Product Description */}
      <div className="mt-10 border-t border-gray-200 pt-6 ">
        <h2 className="w-full text-2xl font-semibold text-gray-800 mb-4 bg-gray-100 px-4 py-2 rounded-md inline-block">
        {t("customer_product_detail.product_detail")}
        </h2>
        {/* <ReactMarkdown className="prose max-w-none text-gray-600">
            {product.description}
          </ReactMarkdown> */}
          <p className="text-gray-600">{product.ProductDescription}</p>
      </div>
    </div>
  );
};

export default ProductDetail;

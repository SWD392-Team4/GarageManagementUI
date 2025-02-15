import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const product = {
    id: 101,
    name: "Lọc dầu động cơ",
    price: "250",
    uri: "https://templates.hibootstrap.com/audeck/default/assets/img/home-one/parts/1.png",
    category: "Engine Parts",
    code: "LOCD101",
    brand: "OEM",
    manufacture: "Vietnam",
    warranty: "12 months",
    description:
      "A high-quality engine oil filter designed to improve performance and longevity.",
    images: [
      "https://templates.hibootstrap.com/audeck/default/assets/img/home-one/parts/1.png",
      "https://templates.hibootstrap.com/audeck/default/assets/img/home-one/parts/2.png",
      "https://templates.hibootstrap.com/audeck/default/assets/img/home-one/parts/3.png",
      "https://templates.hibootstrap.com/audeck/default/assets/img/home-one/parts/4.png",
      "https://templates.hibootstrap.com/audeck/default/assets/img/home-one/parts/5.png",
    ],
  };
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [startIndex, setStartIndex] = useState(0);

  const visibleThumbnails = product.images.slice(startIndex, startIndex + 3);

  const nextThumbnails = () => {
    if (startIndex + 3 < product.images.length) {
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
        <div className="xl:w-2/6 lg:w-2/5 sm:w-full  flex flex-col items-center">
          <img
            className="w-full h-80 object-contain rounded-lg "
            alt={product.name}
            src={selectedImage}
          />

          <div className="flex items-center justify-center mt-4 space-x-2">
            <button
              className={`p-2 rounded-full ${
                startIndex === 0
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
              onClick={prevThumbnails}
              disabled={startIndex === 0}
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>

            {visibleThumbnails.map((img, index) => (
              <img
                key={index}
                className={`w-16 h-16 object-contain border cursor-pointer rounded-md transition ${
                  selectedImage === img ? "border-red-500" : "border-gray-300"
                }`}
                alt={product.name}
                src={img}
                onClick={() => setSelectedImage(img)}
              />
            ))}

            <button
              className={`p-2 rounded-full ${
                startIndex + 3 >= product.images.length
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
              onClick={nextThumbnails}
              disabled={startIndex + 3 >= product.images.length}
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
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
              {product.name}
            </h1>
            <p className="text-2xl font-semibold mt-6 text-gray-800">
              {product.price}đ
            </p>
          </div>
          <div className="text-base lg:leading-tight leading-normal text-gray-600 mt-7 mb-8">
            <p className="text-base leading-4 mt-7 text-gray-600">
              Product Code: {product.code}
            </p>
            <p className="text-base leading-4 mt-4 text-gray-600">
              Brand: {product.brand}
            </p>
            <p className="text-base leading-4 mt-4 text-gray-600">
              Made in: {product.manufacture}
            </p>
            <p className="text-base leading-4 mt-4 text-gray-600">
              Warranty Period: {product.warranty}
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
            Book Now
          </button>
        </div>
      </div>
      <div className="mt-10 border-t border-gray-200 pt-6 ">
        <h2 className="w-full text-2xl font-semibold text-gray-800 mb-4 bg-gray-100 px-4 py-2 rounded-md inline-block">
          Product's Details
        </h2>
        {/* <ReactMarkdown className="prose max-w-none text-gray-600">
            {product.description}
          </ReactMarkdown> */}
      </div>
    </div>
  );
};

export default ProductDetail;

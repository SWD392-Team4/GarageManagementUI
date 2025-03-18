import { FaMoneyBillWave, FaBox, FaTag, FaIndustry } from "react-icons/fa";
import {
  getStatusLabel,
  getStatusColor,
  getStockLabel,
  getStockColor,
} from "../../schemas/ProductAtStoreSchemas";

export default function ProductCard({ product, handleSelectProduct }) {
  console.log("Check product : ", product);
  return (
    <div
      key={product.id}
      className="border rounded-xl shadow-md p-4 cursor-pointer hover:shadow-xl transition bg-white h-full flex flex-col justify-between"
      onClick={() => handleSelectProduct(product.productId)}
    >
      {/* Ảnh sản phẩm */}
      <img
        src={product.productImage?.[0] || "/placeholder.jpg"}
        alt={product.productName}
        className="w-full h-48 object-cover rounded-lg"
      />

      {/* Thông tin sản phẩm */}
      <div className="mt-3 flex flex-col gap-2">
        {/* Tiêu đề sản phẩm */}
        <h3 className="font-bold text-lg text-gray-800">
          {product.productName}
        </h3>
        {/* Dòng phân cách */}
        <hr className="border-gray-200 my-2" />
        {/* Danh mục sản phẩm */} {/* Thương hiệu sản phẩm */}
        <div className="flex justify-between text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <FaTag className="text-gray-500" />
            <span className="font-medium">
              {product.productCategory || "Không có danh mục"}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <FaIndustry className="text-gray-500" />
            <span className="font-medium">
              {product.brandName || "Không có thương hiệu"}
            </span>
          </div>
        </div>
        {/* Dòng phân cách */}
        <hr className="border-gray-200 my-2" />
        {/* Dòng thông tin (Giá, Số lượng, Tình trạng kho) */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          {/* Giá tiền */}
          <span className="flex items-center gap-1">
            <FaMoneyBillWave className="text-blue-600" />
            <span className="font-semibold text-md text-blue-600">
              {product.productPrice}
            </span>
          </span>

          {/* Số lượng + Tình trạng tồn kho */}
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1">
              <FaBox className="text-gray-600" />
              <span className="font-semibold text-md">
                {product.totalQuantity}
              </span>
            </span>
            <span
              className={`px-3 py-1 text-sm font-semibold rounded-md ${getStockColor(
                product.totalQuantity
              )}`}
            >
              {getStockLabel(product.totalQuantity)}
            </span>
          </div>
        </div>
        {/* Dòng phân cách */}
        <hr className="border-gray-200 my-2" />
        {/* Trạng thái Active/Inactive */}
        <span
          className={`px-3 py-1 text-sm font-semibold rounded-md w-fit ${getStatusColor(
            product.status
          )}`}
        >
          {getStatusLabel(product.status)}
        </span>
      </div>
    </div>
  );
}

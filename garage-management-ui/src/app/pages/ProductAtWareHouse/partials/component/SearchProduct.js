import React, { useState } from "react";

export default function SearchProduct({ onSearch }) {
    const [productName, setProductName] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [productBrandName, setProductBrandName] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [productStatus, setProductStatus] = useState("");

    const handleSearch = () => {
        onSearch({
            ProductName: productName,
            ProductCategory: productCategory,
            ProductBrandName: productBrandName,
            MinPrice: minPrice,
            MaxPrice: maxPrice,
            ProductStatus: productStatus,
        });
    };

    const handleClearFilters = () => {
        setProductName("");
        setProductCategory("");
        setProductBrandName("");
        setMinPrice("");
        setMaxPrice("");
        setProductStatus("");

        onSearch({
            ProductName: "",
            ProductCategory: "",
            ProductBrandName: "",
            MinPrice: "",
            MaxPrice: "",
            ProductStatus: "",
        });
    };

    return (
        <div className="flex flex-wrap gap-4 p-4 bg-white shadow-md rounded-lg w-full">
            {/* Tên sản phẩm */}
            <input
                type="text"
                name="ProductName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Tên sản phẩm"
                className="border p-2 rounded w-1/4"
            />

            {/* Danh mục sản phẩm */}
            <input
                type="text"
                name="ProductCategory"
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
                placeholder="Danh mục"
                className="border p-2 rounded w-1/4"
            />

            {/* Thương hiệu sản phẩm */}
            <input
                type="text"
                name="ProductBrandName"
                value={productBrandName}
                onChange={(e) => setProductBrandName(e.target.value)}
                placeholder="Thương hiệu"
                className="border p-2 rounded w-1/4"
            />

            {/* Giá tối thiểu */}
            <input
                type="number"
                name="MinPrice"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="Giá tối thiểu"
                className="border p-2 rounded w-1/4"
            />

            {/* Giá tối đa */}
            <input
                type="number"
                name="MaxPrice"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Giá tối đa"
                className="border p-2 rounded w-1/4"
            />

            {/* Trạng thái sản phẩm */}
            <select
                name="ProductStatus"
                value={productStatus}
                onChange={(e) => setProductStatus(e.target.value)}
                className="border p-2 rounded w-1/4"
            >
                <option value="">Trạng thái</option>
                <option value="Active">Hoạt động</option>
                <option value="Inactive">Không hoạt động</option>
            </select>

            {/* Nút tìm kiếm */}
            <button
                onClick={handleSearch}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Tìm kiếm
            </button>

            {/* Nút xóa bộ lọc */}
            <button
                onClick={handleClearFilters}
                className="bg-gray-500 text-white px-4 py-2 rounded"
            >
                Xóa bộ lọc
            </button>
        </div>
    );
}

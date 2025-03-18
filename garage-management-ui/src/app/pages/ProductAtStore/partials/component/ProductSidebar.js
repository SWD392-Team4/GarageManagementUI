import React from 'react'
import MDEditor from "@uiw/react-md-editor";
import { FaTimes, FaBox } from "react-icons/fa";
import { getStatusLabel, getStatusColor, getStockLabel, getStockColor } from "../../schemas/ProductAtStoreSchemas"
import Barcode from 'react-barcode';


export default function ProductSidebar({ selectedProduct, handleCloseSidebar }) {
    return (
        selectedProduct && (
            <>
                {/* Nút đóng sidebar */}
                <button className="absolute top-2 right-2 text-gray-500 hover:text-red-500" onClick={handleCloseSidebar}>
                    <FaTimes size={18} />
                </button>

                {selectedProduct ? (
                    <>
                        {/* Ảnh sản phẩm */}
                        <div className="w-full flex justify-center">
                            <img
                                src={selectedProduct.imageLink?.[0] || "https://via.placeholder.com/300"}
                                alt={selectedProduct.productName}
                                className="w-auto max-h-[250px] object-contain rounded-lg"
                            />
                        </div>

                        {/* Thông tin sản phẩm */}
                        <div className="mt-4 flex flex-col gap-4">
                            {/* Tên sản phẩm */}
                            <div>
                                <label className="text-gray-500 text-sm">Tên sản phẩm:</label>
                                <h2 className="text-2xl font-bold text-gray-800">{selectedProduct.productName}</h2>
                            </div>

                            <hr className="border-gray-200" />

                            {/* Giá tiền */}
                            <div>
                                <label className="text-gray-500 text-sm">Giá bán:</label>
                                <p className="text-lg font-semibold text-blue-600">{selectedProduct.productPrice} VND</p>
                            </div>

                            <hr className="border-gray-200" />

                            {/* Trạng thái Hoạt động/Không hoạt động */}
                            <div>
                                <label className="text-gray-500 text-sm">Trạng thái:</label>
                                <span className={`px-3 py-1 text-sm font-semibold rounded-md ${getStatusColor(selectedProduct.status)}`}>
                                    {getStatusLabel(selectedProduct.status)}
                                </span>
                            </div>

                            <hr className="border-gray-200" />

                            {/* Số lượng & Tình trạng tồn kho */}
                            <div>
                                <label className="text-gray-500 text-sm">Số lượng tồn kho:</label>
                                <div className="flex items-center gap-2">
                                    <span className="flex items-center gap-1 text-md font-semibold">
                                        <FaBox className="text-gray-600" />
                                        <span className={getStockColor(selectedProduct.totalQuantity)}>
                                            {selectedProduct.totalQuantity}
                                        </span>
                                    </span>
                                    <span className={`px-3 py-1 text-sm font-semibold rounded-md ${selectedProduct.totalQuantity > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                        {getStockLabel(selectedProduct.totalQuantity)}
                                    </span>
                                </div>
                            </div>

                            <hr className="border-gray-200" />

                            {/* Danh mục xe */}
                            <div>
                                <label className="text-gray-500 text-sm">Danh mục xe:</label>
                                <p className="text-gray-700 text-md">{selectedProduct.category} Car Category</p>
                            </div>

                            {/* Thương hiệu */}
                            <div>
                                <label className="text-gray-500 text-sm">Thương hiệu:</label>
                                <p className="text-gray-700 text-md">{selectedProduct.brandName}</p>
                            </div>

                            <hr className="border-gray-200" />

                            {/*Barcode*/}
                            <div>
                                <label className="text-gray-500 text-sm">BarCode:</label>
                                <div className="border rounded-md p-3 bg-gray-50" >
                                    <Barcode
                                        value={selectedProduct.productBarcode}
                                        width={0.7}
                                        height={80}
                                        // displayValue={true}
                                        fontSize={10}
                                    // lineColor="#333"
                                    />
                                </div>
                            </div>
                            {/* Mô tả sản phẩm (Markdown) */}
                            <div>
                                <label className="text-gray-500 text-sm">Mô tả sản phẩm:</label>
                                <div className="border rounded-md p-3 bg-gray-50" data-color-mode="light">
                                    <MDEditor.Markdown source={selectedProduct.productDescription || "_Chưa có mô tả._"} />
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <p className="text-gray-500 text-center">Loading...</p>
                )}
            </>
        )
    );
}
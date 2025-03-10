import React, { useState } from "react";

const productsList = [
    { id: 1, name: "Bình ắc quy 12V", price: 750000 },
    { id: 2, name: "Dầu nhớt tổng hợp", price: 300000 },
    { id: 3, name: "Má phanh trước", price: 450000 },
    { id: 4, name: "Lọc gió động cơ", price: 250000 },
    { id: 5, name: "Bugi Iridium", price: 180000 },
    { id: 6, name: "Dây curoa cam", price: 600000 },
    { id: 7, name: "Cảm biến áp suất lốp", price: 500000 },
    { id: 8, name: "Bơm xăng điện tử", price: 800000 },
    { id: 9, name: "Gương chiếu hậu", price: 200000 },
    { id: 10, name: "Đèn pha LED", price: 950000 },
];


export default function ProductSelectModal({ onSelect, onClose }) {
    const [search, setSearch] = useState("");
    const [selectedProducts, setSelectedProducts] = useState([]);

    const filteredProducts = productsList.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );

    const toggleProductSelection = (product) => {
        setSelectedProducts((prev) => {
            const existingProduct = prev.find((p) => p.id === product.id);
            if (existingProduct) {
                return prev.map((p) => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p);
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const updateQuantity = (id, quantity) => {
        setSelectedProducts((prev) =>
            prev.map((p) => (p.id === id ? { ...p, quantity: quantity } : p))
        );
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-lg w-[900px] h-[600px] shadow-lg grid grid-cols-7 gap-4">
                {/* Phần 7: Hiển thị sản phẩm dưới dạng card */}
                <div className="col-span-5 border-r pr-4">
                    <h2 className="text-lg font-bold mb-4">Chọn sản phẩm</h2>
                    <input
                        type="text"
                        className="border p-2 w-full mb-4"
                        placeholder="Tìm sản phẩm..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className="grid grid-cols-3 gap-4 max-h-[450px] overflow-y-auto">
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                className={`p-4 border rounded-lg cursor-pointer shadow-sm hover:shadow-md transition ${selectedProducts.find((p) => p.id === product.id) ? "bg-blue-100 border-blue-500" : "bg-white"
                                    }`}
                                onClick={() => toggleProductSelection(product)}
                            >
                                <h3 className="font-semibold">{product.name}</h3>
                                <p className="text-sm text-gray-600">{product.price.toLocaleString()} VND</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Phần 5: Hiển thị sản phẩm đã chọn */}
                <div className="col-span-2 flex flex-col justify-between">
                    <h3 className="text-lg font-bold mb-2">Sản phẩm đã chọn</h3>
                    <div className="max-h-[450px] overflow-y-auto space-y-2 border p-2 rounded-lg flex-1">
                        {selectedProducts.length > 0 ? (
                            selectedProducts.map((product) => (
                                <div key={product.id} className="flex justify-between items-center p-2 border-b">
                                    <span>{product.name}</span>
                                    <input
                                        type="number"
                                        className="w-12 border rounded text-center"
                                        value={product.quantity}
                                        min="1"
                                        onChange={(e) => updateQuantity(product.id, Math.max(1, parseInt(e.target.value) || 1))}
                                    />
                                    <button
                                        className="text-red-500 text-sm"
                                        onClick={() => setSelectedProducts(selectedProducts.filter((p) => p.id !== product.id))}
                                    >
                                        Xóa
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm text-center">Chưa có sản phẩm nào</p>
                        )}
                    </div>
                    <div className="flex justify-end space-x-2 pt-4">
                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded"
                            onClick={() => {
                                onSelect(selectedProducts || []);
                                onClose();
                            }}
                        >
                            Xác nhận chọn
                        </button>

                        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={onClose}>
                            Đóng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
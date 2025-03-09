import React, { useState } from "react";

const servicesList = [
    { id: 1, name: "Rửa xe", price: 50000 },
    { id: 2, name: "Thay dầu nhớt", price: 200000 },
    { id: 3, name: "Bảo dưỡng phanh", price: 300000 },
    { id: 4, name: "Cân chỉnh lốp", price: 150000 },
    { id: 5, name: "Đánh bóng xe", price: 500000 },
];

export default function ServiceSelectModal({ onSelect, onClose }) {
    const [search, setSearch] = useState("");
    const [selectedServices, setSelectedServices] = useState([]);

    const filteredServices = servicesList.filter((service) =>
        service.name.toLowerCase().includes(search.toLowerCase())
    );

    const toggleServiceSelection = (service) => {
        setSelectedServices((prev) => {
            const existingService = prev.find((s) => s.id === service.id);
            if (existingService) {
                return prev.map((s) => s.id === service.id ? { ...s, quantity: s.quantity + 1 } : s);
            }
            return [...prev, { ...service, quantity: 1 }];
        });
    };

    const updateQuantity = (id, quantity) => {
        setSelectedServices((prev) =>
            prev.map((s) => (s.id === id ? { ...s, quantity: quantity } : s))
        );
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-lg w-[900px] h-[600px] shadow-lg grid grid-cols-7 gap-4">
                <div className="col-span-5 border-r pr-4">
                    <h2 className="text-lg font-bold mb-4">Chọn dịch vụ</h2>
                    <input
                        type="text"
                        className="border p-2 w-full mb-4"
                        placeholder="Tìm dịch vụ..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className="grid grid-cols-3 gap-4 max-h-[450px] overflow-y-auto">
                        {filteredServices.map((service) => (
                            <div
                                key={service.id}
                                className={`p-4 border rounded-lg cursor-pointer shadow-sm hover:shadow-md transition ${selectedServices.find((s) => s.id === service.id) ? "bg-blue-100 border-blue-500" : "bg-white"
                                    }`}
                                onClick={() => toggleServiceSelection(service)}
                            >
                                <h3 className="font-semibold">{service.name}</h3>
                                <p className="text-sm text-gray-600">{service.price.toLocaleString()} VND</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="col-span-2 flex flex-col justify-between">
                    <h3 className="text-lg font-bold mb-2">Dịch vụ đã chọn</h3>
                    <div className="max-h-[450px] overflow-y-auto space-y-2 border p-2 rounded-lg flex-1">
                        {selectedServices.length > 0 ? (
                            selectedServices.map((service) => (
                                <div key={service.id} className="flex justify-between items-center p-2 border-b">
                                    <span>{service.name}</span>
                                    <input
                                        type="number"
                                        className="w-12 border rounded text-center"
                                        value={service.quantity}
                                        min="1"
                                        onChange={(e) => updateQuantity(service.id, Math.max(1, parseInt(e.target.value) || 1))}
                                    />
                                    <button
                                        className="text-red-500 text-sm"
                                        onClick={() => setSelectedServices(selectedServices.filter((s) => s.id !== service.id))}
                                    >
                                        Xóa
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm text-center">Chưa có dịch vụ nào</p>
                        )}
                    </div>
                    <div className="flex justify-end space-x-2 pt-4">
                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded"
                            onClick={() => {
                                onSelect(selectedServices || []);
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

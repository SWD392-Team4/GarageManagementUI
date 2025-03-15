import React, { useEffect, useState } from "react";
import { getAllCarPart } from "../services/ProductService";
import { useTranslation } from "react-i18next";


export default function ModelSelectCarPart({ isOpen, onClose, selectedCarParts, setSelectedCarParts }) {
    const { t } = useTranslation("create_product");
    const [carParts, setCarParts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchCarParts = async () => {
            const response = await getAllCarPart();
            if (response?.data?.value) {
                setCarParts(response.data.value);
            }
        };
        fetchCarParts();
    }, []);

    const toggleCarPartSelection = (part) => {
        if (selectedCarParts.some((p) => p.id === part.id)) {
            setSelectedCarParts(selectedCarParts.filter((p) => p.id !== part.id));
        } else {
            setSelectedCarParts([...selectedCarParts, part]);
        }
    };

    // Lọc car parts theo từ khóa tìm kiếm
    const filteredCarParts = carParts.filter((part) =>
        part.partName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        isOpen && (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-2/3 max-h-[80vh] flex flex-col">
                    {/* Tiêu đề */}
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">{t("create_product.select_car_parts.title")}</h2>
                        <button type="button" className="text-gray-600 hover:text-red-500" onClick={onClose}>✖</button>
                    </div>

                    {/* Thanh tìm kiếm */}
                    <input
                        type="text"
                        placeholder={t("create_product.select_car_parts.search_placeholder")}
                        className="border p-2 rounded w-full mb-3"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    {/* Danh sách Car Parts */}
                    <div className="overflow-y-auto flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredCarParts.length > 0 ? (
                            filteredCarParts.map((part) => {
                                const isSelected = selectedCarParts.some((p) => p.id === part.id);
                                return (
                                    <div
                                        key={part.id}
                                        className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${isSelected ? "border-blue-500 bg-blue-100 shadow-md" : "border-gray-300"
                                            }`}
                                        onClick={() => toggleCarPartSelection(part)}
                                    >
                                        <h3 className="font-semibold text-lg">{part.partName}</h3>
                                        <p className="text-sm text-gray-600">{t("create_product.select_car_parts.category")}: {part.partCategory}</p>
                                        <p className={`text-sm font-semibold mt-1 ${part.status === "Active" ? "text-green-600" : "text-red-600"}`}>
                                            {part.status === "Active" ? t("create_product.select_car_parts.active") : t("create_product.select_car_parts.inactive")}
                                        </p>
                                        <p className="text-xs text-gray-500">{t("create_product.select_car_parts.created_at")}: {part.createdAt}</p>
                                        <p className="text-xs text-gray-500">{t("create_product.select_car_parts.updated_at")}: {part.updatedAt}</p>
                                    </div>
                                );
                            })
                        ) : (
                            <p className="text-gray-500 text-center col-span-full">{t("create_product.select_car_parts.no_results")}</p>
                        )}
                    </div>

                    {/* Nút xác nhận */}
                    <div className="flex justify-end mt-4">
                        <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={onClose}>
                            {t("create_product.select_car_parts.confirm")}
                        </button>
                    </div>
                </div>
            </div>
        )
    );
}
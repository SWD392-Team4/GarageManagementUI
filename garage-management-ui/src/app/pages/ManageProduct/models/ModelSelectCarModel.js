import React, { useEffect, useState } from "react";
import { getAllCarModels } from "../services/ProductService";
import { useTranslation } from "react-i18next";

export default function ModelSelectCarModel({
  isOpen,
  onClose,
  selectedCarModels,
  setSelectedCarModels,
}) {
  const { t } = useTranslation("create_product");
  const [carModels, setCarModels] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCarModels = async () => {
      const response = await getAllCarModels();
      if (response?.data?.value) {
        setCarModels(response.data.value);
      }
    };
    fetchCarModels();
  }, []);

  const toggleCarModelSelection = (model) => {
    if (selectedCarModels.some((m) => m.id === model.id)) {
      setSelectedCarModels(selectedCarModels.filter((m) => m.id !== model.id));
    } else {
      setSelectedCarModels([...selectedCarModels, model]);
    }
  };

  // Lọc danh sách theo từ khóa tìm kiếm
  const filteredCarModels = carModels.filter((model) =>
    model.modelName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-2/3 max-h-[80vh] flex flex-col">
          {/* Tiêu đề */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {t("create_product.select_car_models.title")}
            </h2>{" "}
            {/* ✅ Dịch tiêu đề */}
            <button
              type="button"
              className="text-gray-600 hover:text-red-500"
              onClick={onClose}
            >
              ✖
            </button>
          </div>

          {/* Thanh tìm kiếm */}
          <input
            type="text"
            placeholder={t(
              "create_product.select_car_models.search_placeholder"
            )} // ✅ Dịch placeholder
            className="border p-2 rounded w-full mb-3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Danh sách Car Models */}
          <div className="overflow-y-auto flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCarModels.length > 0 ? (
              filteredCarModels.map((model) => {
                const isSelected = selectedCarModels.some(
                  (m) => m.id === model.id
                );
                return (
                  <div
                    key={model.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? "border-blue-500 bg-blue-100 shadow-md"
                        : "border-gray-300"
                    }`}
                    onClick={() => toggleCarModelSelection(model)}
                  >
                    {/* Hiển thị hình ảnh thương hiệu */}
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          model.brandLinkLogo ||
                          "https://via.placeholder.com/50"
                        }
                        alt={model.brandName}
                        className="w-10 h-10 object-contain rounded-md"
                      />
                      <h3 className="font-semibold text-lg">
                        {model.modelName}
                      </h3>
                    </div>

                    {/* Thông tin chi tiết */}
                    <p className="text-sm text-gray-600">
                      {t("create_product.select_car_models.brand")}:{" "}
                      {model.brandName}
                    </p>
                    <p className="text-sm text-gray-600">
                      {t("create_product.select_car_models.category")}:{" "}
                      {model.carCategory}
                    </p>
                    <p className="text-sm font-semibold text-blue-700">
                      {t("create_product.select_car_models.year")}:{" "}
                      {new Date(model.modelYear).getFullYear()}
                    </p>

                    {/* Trạng thái */}
                    <p
                      className={`text-sm font-semibold mt-1 ${
                        model.status === "Active"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {model.status === "Active"
                        ? t("create_product.select_car_models.active")
                        : t("create_product.select_car_models.inactive")}
                    </p>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500 text-center col-span-full">
                {t("create_product.select_car_models.no_results")}
              </p>
            )}
          </div>

          {/* Nút xác nhận */}
          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              onClick={onClose}
            >
              {t("create_product.select_car_models.confirm")}
            </button>
          </div>
        </div>
      </div>
    )
  );
}

import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaCarAlt, FaList } from "react-icons/fa";
import { SiBrandfolder } from "react-icons/si";
import Select from "react-select";
import { AiOutlineApartment } from "react-icons/ai";

import {
  getAllBrand,
  getAllCarCategory,
  getAllCarModelWithBrandAndCategory,
  getAllCarPart,
} from "../Services/BookingPageService";
import { BookingSignify } from "../Services/BookingSignify";
import Navigation from "./Navigation";
import ToggleOptions from "./ToggleOptions";
import { useNavigate } from "react-router-dom";

const formatOptionLabel = ({ label, image }) => (
  <div style={{ display: "flex", alignItems: "center" }}>
    <img
      src={image}
      alt={label}
      style={{ width: 30, height: 30, marginRight: 10 }}
    />
    <span>{label}</span>
  </div>
);

export default function SelectOptions() {
  const { t } = useTranslation("BookingOnline");

  const [brands, setBrands] = useState([]);
  const [carCategorys, setCarCategorys] = useState([]);
  const [carModels, setCarModels] = useState([]);
  const [carParts, setCarParts] = useState([]);
  const sBooking = BookingSignify.use();

  // Fetch dữ liệu cho Brand và Car Category
  const fetchData = useCallback(async () => {
    try {
      let response = await getAllBrand();
      setBrands(response.data.value);
      response = await getAllCarCategory();
      setCarCategorys(response.data.value);
      response = await getAllCarPart();
      setCarParts(response.data.value);
    } catch (error) {
      console.error("Error loading data", error);
    }
  }, []);

  useEffect(() => {
    BookingSignify.set((v) => {
      v.value.services = [];
      v.value.package = [];
    });
    fetchData();
  }, [fetchData]);

  const fetchCarModel = useCallback(async () => {
    try {
      let response = await getAllCarModelWithBrandAndCategory();
      setCarModels(response.data.value);
    } catch (error) {
      console.error("Error loading data", error);
    }
  }, []);

  useEffect(() => {
    if (sBooking.brandId !== "" && sBooking.carCategoryId !== "") {
      fetchCarModel();
    }
  }, [sBooking.brandId, sBooking.carCategoryId, fetchCarModel]);
  // Custom render option với hình ảnh

  // Tạo options cho react-select
  const brandOptions = brands.map((brand) => ({
    value: brand.id,
    label: brand.brandName,
    image: brand.imageLink,
  }));
  const carCategoryOptions = carCategorys.map((carCate) => ({
    value: carCate.id,
    label: carCate.category,
  }));
  const carPartOptions = carParts.map((carPart) => ({
    value: carPart.id,
    label: carPart.partName,
  }));
  const carModelOptions = carModels.map((carM) => ({
    value: carM.id,
    label: `${carM.modelName} ${new Date(carM.modelYear).getFullYear()}`,
  }));

  const navigate = useNavigate();

  useEffect(() => {
    if (BookingSignify.value.garaId === "") {
      navigate("/booking");
    }
  }, [navigate]);

  return (
    <div className="p-4">
      <div className="text-gray-800 text-5xl font-extrabold font-space text-center pb-10 ">
        Your vehicle details & services
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Car Brand */}
        <div>
          <div className="mb-2 flex items-center gap-2">
            <SiBrandfolder className="text-xl text-orange-700" />
            <label htmlFor="brand-select" className="text-gray-700 font-medium">
              {t("select.carBrand")}
            </label>
          </div>
          <Select
            id="brand-select"
            className="z-30"
            formatOptionLabel={formatOptionLabel}
            options={brandOptions}
            value={
              brandOptions.find(
                (option) => option.value === BookingSignify.value.brandId
              ) || null
            }
            onChange={(option) => {
              BookingSignify.set((v) => {
                v.value.brandId = option.value;
              });
            }}
            placeholder={t("select.selectCarBrand")}
          />
        </div>
        {/* Car Type */}
        <div>
          <div className="mb-2 flex items-center gap-2">
            <FaList className="text-xl text-orange-700" />
            <label
              htmlFor="category-select"
              className="text-gray-700 font-medium"
            >
              {t("select.carType")}
            </label>
          </div>
          <Select
            id="category-select"
            options={carCategoryOptions}
            value={
              carCategoryOptions.find(
                (option) => option.value === BookingSignify.value.carCategoryId
              ) || null
            }
            placeholder={t("select.selectCarType")}
            className="z-30"
            onChange={(option) => {
              BookingSignify.set((v) => {
                v.value.carCategoryId = option.value;
              });
            }}
          />
        </div>
        {/* Car part */}
        <div>
          <div className="mb-2 flex items-center gap-2">
            <AiOutlineApartment className="text-xl text-orange-700" />
            <label
              htmlFor="category-select"
              className="text-gray-700 font-medium"
            >
              {t("select.carPart")}
            </label>
          </div>
          <Select
            id="carPart-select"
            options={carPartOptions}
            placeholder={t("select.selectCarPart")}
            className="z-20"
            value={
              carPartOptions.find(
                (option) => option.value === BookingSignify.value.carPartId
              ) || null
            }
            onChange={(option) => {
              BookingSignify.set((v) => {
                v.value.carPartId = option.value;
              });
            }}
          />
        </div>
        {/* Car Model */}
        <div>
          <div className="mb-2 flex items-center gap-2">
            <FaCarAlt className="text-xl text-orange-700" />
            <label htmlFor="model-select" className="text-gray-700 font-medium">
              {t("select.carModel")}
            </label>
          </div>
          <Select
            id="model-select"
            options={carModelOptions}
            placeholder={t("select.selectCarModel")}
            className="z-20"
            value={
              carModelOptions.find(
                (option) => option.value === BookingSignify.value.carModel
              ) || null
            }
            onChange={(option) => {
              BookingSignify.set((v) => {
                v.value.carModel = option.value;
              });
            }}
            isDisabled={
              !(sBooking.brandId !== "" && sBooking.carCategoryId !== "")
            }
          />
        </div>
        <div className="col-span-2">
          <ToggleOptions />
        </div>
      </div>

      <div className="col-span-2">
        <Navigation
          prevLink="/booking/address"
          nextLink={
            BookingSignify.value.brandId &&
            BookingSignify.value.carCategoryId &&
            BookingSignify.value.carModel &&
            BookingSignify.value.type
              ? BookingSignify.value.type === "sigle-service"
                ? "/booking/select-services"
                : "/booking/select-packages"
              : undefined
          }
        />
      </div>
    </div>
  );
}

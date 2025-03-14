import React, { useCallback, useEffect, useState } from "react";
import { FaCarAlt, FaList } from "react-icons/fa";
import { SiBrandfolder } from "react-icons/si";
import Select from "react-select";
import {
  getAllBrand,
  getAllCarCategory,
  getAllCarModelWithBrandAndCategory,
} from "../Services/BookingPageService";
import { BookingSignify } from "../Services/BookingSignify";
import Navigation from "./Navigation";
import ToggleOptions from "./ToggleOptions";
import { useTranslation } from "react-i18next";

export default function SelectOptions() {
  const { t } = useTranslation("BookingOnline");

  const [brands, setBrands] = useState([]);
  const [carCategorys, setCarCategorys] = useState([]);
  const [carModels, setCarModels] = useState([]);
  const sBooking = BookingSignify.use();

  // Fetch dữ liệu cho Brand và Car Category
  const fetchData = useCallback(async () => {
    try {
      let response = await getAllBrand();
      setBrands(response.data.value);
      response = await getAllCarCategory();
      setCarCategorys(response.data.value);
    } catch (error) {
      console.error("Error loading data", error);
    }
  }, []);

  useEffect(() => {
    BookingSignify.set((v) => {
      v.value.brandId = "";
      v.value.type = "";
      v.value.carCategoryId = "";
      v.value.carModel = "";
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

  // Tạo options cho react-select
  const brandOptions = brands.map((brand) => ({
    value: brand.id,
    label: brand.brandName,
  }));
  const carCategoryOptions = carCategorys.map((carCate) => ({
    value: carCate.id,
    label: carCate.category,
  }));
  const carModelOptions = carModels.map((carM) => ({
    value: carM.id,
    label: `${carM.modelName} ${new Date(carM.modelYear).getFullYear()}`,
  }));

  return (
    <div className="p-4">
      <div className="text-red-800 text-5xl font-extrabold font-space text-center pb-10 ">
        Your vehicle details & services
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
            className="z-30 "
            options={brandOptions}
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
            placeholder={t("select.selectCarType")}
            className="z-30"
            onChange={(option) => {
              BookingSignify.set((v) => {
                v.value.carCategoryId = option.value;
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
            className="z-30"
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
        <div className="col-span-3">
          <ToggleOptions />
        </div>
      </div>

      <div className="col-span-3">
        <Navigation
          prevLink="/booking/address"
          nextLink={
            sBooking.brandId &&
            sBooking.carCategoryId &&
            sBooking.carModel &&
            sBooking.type
              ? "/booking/customer-info"
              : undefined
          }
        />
      </div>
    </div>
  );
}

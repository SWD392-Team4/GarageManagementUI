import UserService from "../../../hooks/services/UserService";
import { BookingSignify } from "./BookingSignify";
const userService = new UserService();

export const getAllGara = async () => {
  try {
    const response = await userService.sendAjax(
      "/api/workplaces?WorkplaceType=Garage",
      "GET",
      null,
      false
    );
    return response;
  } catch (error) {
    console.error("Fail with: ", error);
  }
};
export const getAllBrand = async () => {
  try {
    const response = await userService.sendAjax(
      "/api/brands?PageSize=0",
      "GET",
      null,
      false
    );
    return response;
  } catch (error) {
    console.error("Fail with: ", error);
  }
};
export const getAllCarCategory = async () => {
  try {
    const response = await userService.sendAjax(
      "/api/car-categories?Status=Active&PageSize=0",
      "GET",
      null,
      false
    );
    return response;
  } catch (error) {
    console.error("Fail with: ", error);
  }
};
export const getAllPackage = async () => {
  try {
    const response = await userService.sendAjax(
      `/api/packages?CarCategoryId=${BookingSignify.value.carCategoryId}&CarPartId=${BookingSignify.value.carPartId}&Status=Active&PageSize=50`,
      "GET",
      null,
      false
    );
    return response;
  } catch (error) {
    console.error("Fail with: ", error);
  }
};
export const getAllCarPart = async () => {
  try {
    const response = await userService.sendAjax(
      `/api/car-parts?Status=Active&PageSize=0`,
      "GET",
      null,
      false
    );
    return response;
  } catch (error) {
    console.error("Fail with: ", error);
  }
};
export const ServiceOnPackage = async (packageId) => {
  try {
    const response = await userService.sendAjax(
      `/api/packages/${packageId}/services?PageSize=0'`,
      "GET",
      null,
      false
    );
    return response;
  } catch (error) {
    console.error("Fail with: ", error);
  }
};
export const getAllServiceByCarModel = async () => {
  try {
    const response = await userService.sendAjax(
      `/api/services/carModel/${BookingSignify.value.carModel}`,
      "GET",
      null,
      false
    );
    return response;
  } catch (error) {
    console.error("Fail with: getAllServiceByCarModel", error);
  }
};
export const getAllProductSuitable = async (carPartId) => {
  try {
    const response = await userService.sendAjax(
      `/api/products/car-model/car-part/noau/${BookingSignify.value.garaId}/${BookingSignify.value.carModel}/${BookingSignify.value.carPartId}?ProductStatus=Active&PageSize=0`,
      "GET",
      null,
      false
    );
    return response;
  } catch (error) {
    console.error("Fail with: getAllServiceByCarModel", error);
  }
};
export const getAllCarModelWithBrandAndCategory = async () => {
  try {
    const response = await userService.sendAjax(
      `/api/car-models?BrandId=${BookingSignify.value.brandId}&CarCategoryId=${BookingSignify.value.carCategoryId}&Status=Active&PageSize=50`,
      "GET",
      null,
      false
    );
    return response;
  } catch (error) {
    console.error("Fail with: ", error);
  }
};
export const createAppointmentApi = async (data) => {
  try {
    const response = await userService.sendAjax(
      `/api/workplaces/${BookingSignify.value.garaId}/appointments`,
      "POST",
      data,
      false
    );
    userService.showToast(200, "Create Goods Create Appointment Successful");
    return response.status;
  } catch (error) {
    console.error("Fail with : ", error.message);
    userService.showToast(400, error.message);
  }
};

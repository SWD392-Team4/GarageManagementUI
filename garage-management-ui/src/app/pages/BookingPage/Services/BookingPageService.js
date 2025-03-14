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
      "/api/brands?PageSize=1000",
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
      "/api/car-categories?Status=Active&PageSize=100",
      "GET",
      null,
      false
    );
    return response;
  } catch (error) {
    console.error("Fail with: ", error);
  }
};
export const getAllCarModelWithBrandAndCategory = async () => {
  try {
    const response = await userService.sendAjax(
      `/api/car-models?BrandId=${BookingSignify.value.brandId}&CarCategoryId=${BookingSignify.value.carCategoryId}&Status=Active&PageSize=100`,
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
      true
    );
    userService.showToast(200, "Create Goods Create Appointment Successful");
    return response;
  } catch (error) {
    console.error("Fail with : ", error.message);
    userService.showToast(400, error.message);
  }
};

import UserService from "../../../hooks/services/UserService";
import { sAccount } from "../../AuthCustomer/services/store";
import { AppointmentSignify } from "./store/AppointmentSignify";

const userService = new UserService();
export const getAllCarModel = async () => {
  try {
    const response = await userService.sendAjax(
      "/api/car-models?Status=Active&PageSize=1000",
      "GET",
      null,
      true
    );
    return response;
  } catch (error) {
    console.error("Fail with: ", error);
  }
};
export const getAllServices = async () => {
  try {
    const response = await userService.sendAjax(
      "/api/services?Status=Active&PageSize=1000",
      "GET",
      null,
      true
    );
    return response;
  } catch (error) {
    console.error("Fail with: ", error);
  }
};
export const getAllServicesOnPackage = async () => {
  try {
    const response = await userService.sendAjax(
      `/api/packages/${AppointmentSignify.value.packageCurrent}/services`,
      "GET",
      null,
      true
    );
    return response;
  } catch (error) {
    console.error("Fail with: ", error);
  }
};
export const getAllProductsOnService = async () => {
  try {
    const response = await userService.sendAjax(
      "/api/products?ProductStatus=Active&PageSize=1000",
      "GET",
      null,
      true
    );
    return response;
  } catch (error) {
    console.error("Fail with: ", error);
  }
};
export const getAllPackages = async () => {
  try {
    const response = await userService.sendAjax(
      "/api/packages?Status=Active&PageSize=1000",
      "GET",
      null,
      true
    );
    return response;
  } catch (error) {
    console.error("Fail with: ", error);
  }
};

export const CreateAppointmentApi = async (data) => {
  try {
    const response = await userService.sendAjax(
      `/api/workplaces/${sAccount.value.workPlaceId}/appointments
      `,
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

import UserService from "../../../hooks/services/UserService";
import { AppointmentSignify } from "../../AdminManageAppoinment/services/store/AppointmentSignify";
import { sAccount } from "../../AuthCustomer/services/store";
import { formatDate } from "../schemas/CustomerValid";

const userService = new UserService();

export const getAllCustomer = async (PageNumber = 1) => {
  try {
    const response = await userService.sendAjax(
      `/api/users/customers?PageNumber=${PageNumber}`,
      "GET",
      null,
      true
    );
    if (response != null) {
      if (response.data?.value) {
        response.data.value = response.data.value.map((product) => ({
          ...product,
          createdAt: formatDate(product.createdAt),
          updatedAt: formatDate(product.updatedAt),
        }));
      }
      return response;
    } else {
      console.error(`Error: Received status ${response.error}`);
      return [];
    }
  } catch (error) {
    console.error("Error fetching customer: ", error);
    return [];
  }
};

export const SearchCustomer = async (params) => {
  try {
    const queryString = Object.keys(params)
      .filter((key) => params[key])
      .map((key) => `${key}=${encodeURIComponent(params[key])}`)
      .join("&");

    const response = await userService.sendAjax(
      `/api/users/customers?${queryString}`,
      "GET",
      null,
      true
    );

    if (response.status == 200) {
      response.data.value = response.data.value.map((customer) => ({
        ...customer,
        createdAt: formatDate(customer.createdAt),
        updatedAt: formatDate(customer.updatedAt),
      }));
      userService.showToast(200, "Searching customer successful");
      return response;
    } else {
      userService.showToast(400, "Searching customer fail");
      return null;
    }
  } catch (error) {
    console.error("Fail to searching: ", error.message);
  }
};

export const getCustomerDetails = async (customerId) => {
  try {
    // "/api/users/customers/${customerId}",
    // "/api/users/info"
    const response = await userService.sendAjax(
      `/api/users/customers/${customerId}`,
      "GET",
      null,
      true
    );

    response.data.value.createdAt = formatDate(response.data.value.createdAt);
    response.data.value.updatedAt = formatDate(response.data.value.updatedAt);

    return response;
  } catch (error) {
    console.error("Fail with: ", error.message);
  }
};

export const getAllGarage = async () => {
  try {
    const response = await userService.sendAjax(
      "/api/workplaces?WorkplaceType=Garage",
      "GET",
      null,
      true
    );
    return response;
  } catch (error) {
    console.error("Fail with: ", error.message);
  }
};

export const getApointmentCustomer = async (
  // garageId,
  customerEmail,
  PageNumber = 1
) => {
  //customerPhoneNumer
  try {
    // CustomerPhoneNumber=${customerPhoneNumer}&
    const response = await userService.sendAjax(
      `/api/workplaces/${
        sAccount.value.role === "Administrator"
          ? AppointmentSignify.value.garaCurrent
          : sAccount.value.workPlaceId
      }/appointments?CustomerEmail=${customerEmail}&PageNumber=${PageNumber}`,
      "GET",
      null,
      true
    );

    response.data.value = response.data.value.map((pre) => ({
      ...pre,
      createdAt: formatDate(pre.createdAt),
      updatedAt: formatDate(pre.updatedAt),
    }));

    return response;
  } catch (error) {
    console.error("Fail with : ", error.message);
  }
};

export const searchApointmentCustomer = async (customerEmail, params) => {
  try {
    const queryString = Object.keys(params)
      .filter((key) => params[key])
      .map((key) => `${key}=${encodeURIComponent(params[key])}`)
      .join("&");

    const response = await userService.sendAjax(
      `/api/workplaces/${
        sAccount.value.role === "Administrator"
          ? AppointmentSignify.value.garaCurrent
          : sAccount.value.workPlaceId
      }/appointments?CustomerEmail=${customerEmail}&${queryString}`,
      "GET",
      null,
      true
    );

    response.data.value = response.data.value.map((pre) => ({
      ...pre,
      createdAt: formatDate(pre.createdAt),
      updatedAt: formatDate(pre.updatedAt),
    }));
    return response;
  } catch (error) {
    console.error("Error with : ", error.message);
  }
};

export const getApointmentDetails = async (garageId, apointmentId) => {
  try {
    const response = await userService.sendAjax(
      `/api/workplaces/${garageId}/appointments/${apointmentId}`,
      "GET",
      null,
      true
    );
    console.log("check tai service: ", response.data.value);

    return response;
  } catch (error) {
    console.error("Fail with: ", error.message);
  }
};

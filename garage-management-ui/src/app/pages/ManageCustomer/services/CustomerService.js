import UserService from "../../../hooks/services/UserService";
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
      .filter(key => params[key])
      .map(key => `${key}=${encodeURIComponent(params[key])}`)
      .join("&");

    const response = await userService.sendAjax(
      `/api/users/customers?${queryString}`,
      "GET",
      null,
      true
    );

    if (response.status == 200) {
      response.data.value = response.data.value.map(customer => ({
        ...customer,
        createdAt: formatDate(customer.createdAt),
        updatedAt: formatDate(customer.updatedAt)
      }))
      userService.showToast(200, "Searching customer successful")
      return response;
    } else {
      userService.showToast(400, "Searching customer fail")
      return null;
    }
  } catch (error) {
    console.error("Fail to searching: ", error.message);
  }
}

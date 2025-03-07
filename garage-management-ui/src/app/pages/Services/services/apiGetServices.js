import UserService from "../../../hooks/services/UserService";
import { sServiceHome } from "../services/SignifyServiceHome";

const userService = new UserService();
export const getServicesWithSignify = async () => {
  try {
    const filters = sServiceHome.value;
    // Khởi tạo query với pageNumber luôn có
    let queryParams = `PageNumber=${filters.pageNumber}`;
    if (filters.serviceName) {
      queryParams += `&ServiceName=${encodeURIComponent(filters.serviceName)}`;
    }
    if (filters.carPartName) {
      queryParams += `&CarPartName=${encodeURIComponent(filters.carPartName)}`;
    }
    // if (filters.serviceCategory) {
    //   queryParams += `&serviceCategory=${encodeURIComponent(
    //     filters.serviceCategory
    //   )}`;
    // }
    if (filters.category) {
      queryParams += `&CarCategoryName=${encodeURIComponent(filters.category)}`;
    }
    if (filters.workNature) {
      queryParams += `&WorkNature=${encodeURIComponent(filters.workNature)}`;
    }
    if (filters.action) {
      queryParams += `&Action=${encodeURIComponent(filters.action)}`;
    }

    // queryParams += `&Status=Active`;

    const response = await userService.sendAjax(
      `/api/services?${queryParams}`,
      "GET",
      null,
      false
    );
    if (response != null) {
      return response.data.value;
    } else {
      console.error(`Error: Received status ${response.error}`);
      return [];
    }
  } catch (error) {
    console.error("Error fetching products: ", error);
    return [];
  }
};
export const getDetailServices = async (id) => {
  try {
    const response = await userService.sendAjax(
      `/api/services/${id}`,
      "GET",
      null,
      false
    );
    if (response != null) {
      return response.data.value;
    } else {
      console.error(`Error: Received status ${response.error}`);
      return;
    }
  } catch (error) {
    console.error("Error fetching products: ", error);
    return;
  }
};

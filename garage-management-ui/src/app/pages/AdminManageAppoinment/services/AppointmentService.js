import UserService from "../../../hooks/services/UserService";
import { sAccount } from "../../AuthCustomer/services/store";
import { formatDate } from "../schemas/appointmentSchema";
import { AppointmentSignify } from "./store/AppointmentSignify";
import { FilterAppointment } from "./store/FilterStore";

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
export const getAllAppointment = async (status) => {
  // Khởi tạo query với pageNumber và trạng thái nếu có
  let queryParams = `PageNumber=${FilterAppointment.value.pageCurrent}`;
  if (status !== "") {
    queryParams += `&AppointmentStatus=${status}`;
  }

  // Nếu có filter được áp dụng (ví dụ search === true)
  if (FilterAppointment.value.search) {
    if (FilterAppointment.value.searchNamecus) {
      queryParams += `&CustomerName=${encodeURIComponent(
        FilterAppointment.value.searchNamecus
      )}`;
    }
    if (FilterAppointment.value.searchEmailCus) {
      queryParams += `&CustomerEmail=${encodeURIComponent(
        FilterAppointment.value.searchEmailCus
      )}`;
    }
    if (FilterAppointment.value.type) {
      queryParams += `&AppointmentType=${encodeURIComponent(
        FilterAppointment.value.type
      )}`;
    }
    if (FilterAppointment.value.startDate) {
      queryParams += `&FromTime=${encodeURIComponent(
        FilterAppointment.value.startDate
      )}`;
    }
    if (FilterAppointment.value.endDate) {
      queryParams += `&ToTime=${encodeURIComponent(
        FilterAppointment.value.endDate
      )}`;
    }
    // Nếu cần thêm filter cho tên nhân viên (searchNameEmp) thì uncomment đoạn bên dưới
    // if (filters.searchNameEmp) {
    //   queryParams += `&EmployeeName=${encodeURIComponent(filters.searchNameEmp)}`;
    // }
  }

  // Xây dựng URL đầy đủ với workplaceId và các queryParams
  const query =
    sAccount.value.role === "Administrator"
      ? `/api/workplaces/${AppointmentSignify.value.garaCurrent}/appointments?${queryParams}`
      : `/api/workplaces/${sAccount.value.workPlaceId}/appointments?${queryParams}`;
  console.log("query ", query);
  try {
    const response = await userService.sendAjax(query, "GET", null, true);
    response.data.value = response.data.value.map((pre) => ({
      ...pre,
      estimatedAppointmentTime: formatDate(pre.estimatedAppointmentTime),
      actualAppointmentTime: formatDate(pre.actualAppointmentTime),
      estimatedEndTime: formatDate(pre.estimatedEndTime),
      actualEndTime: formatDate(pre.actualEndTime),
    }));
    return response;
  } catch (error) {
    console.error("Fail with: ", error);
  }
};

export const createAppointmentApi = async (data) => {
  try {
    const response = await userService.sendAjax(
      `/api/workplaces/${sAccount.value.workPlaceId}/appointments`,
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
export const getAllGara = async () => {
  try {
    const response = await userService.sendAjax(
      "/api/workplaces?WorkplaceType=Garage",
      "GET",
      null,
      true
    );
    return response;
  } catch (error) {
    console.error("Fail with: ", error);
  }
};

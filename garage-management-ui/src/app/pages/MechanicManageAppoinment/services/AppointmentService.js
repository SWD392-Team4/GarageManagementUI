import UserService from "../../../hooks/services/UserService";
import { AppointmentSignify } from "../../AdminManageAppoinment/services/store/AppointmentSignify";
import { sAccount } from "../../AuthCustomer/services/store";
import { formatDate } from "../schemas/appointmentSchema";
import { FilterAppointment } from "./store/FilterStore";
import { currentAppointment } from "./store/mechanic";

const userService = new UserService();

export const getAllAppointment = async (status) => {
  const filters = FilterAppointment.value;
  // Khởi tạo query với pageNumber và trạng thái nếu có
  let queryParams = `PageNumber=${filters.pageCurrent}`;

  // Nếu có filter được áp dụng (ví dụ search === true)
  if (filters.search) {
    if (filters.searchNamecus) {
      queryParams += `&CustomerName=${encodeURIComponent(
        filters.searchNamecus
      )}`;
    }
    if (filters.searchEmailCus) {
      queryParams += `&CustomerEmail=${encodeURIComponent(
        filters.searchEmailCus
      )}`;
    }
    if (filters.type) {
      queryParams += `&AppointmentType=${encodeURIComponent(filters.type)}`;
    }
    if (filters.status) {
      queryParams += `&AppointmentStatus=${encodeURIComponent(filters.status)}`;
    }
    if (filters.startDate) {
      queryParams += `&FromTime=${encodeURIComponent(filters.startDate)}`;
    }
    if (filters.endDate) {
      queryParams += `&ToTime=${encodeURIComponent(filters.endDate)}`;
    }
  }

  // Xây dựng URL đầy đủ với workplaceId và các queryParams
  const query = `/api/workplaces/6760cbb7-f1fa-445f-a175-97e3f060c861/appointments?${queryParams}`;

  try {
    const response = await userService.sendAjax(
      "/api/users/my-schedules",
      "GET",
      null,
      true
    );
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
export const AddAppointmentReplacementPartDetailApi = async (
  data,
  id,
  serviceDetailId
) => {
  try {
    const response = await userService.sendAjax(
      `/api/workplaces/${
        sAccount.value.role !== "Administrator"
          ? sAccount.value.workPlaceId
          : AppointmentSignify.value.garaCurrent
      }/appointments/${id}/details/${serviceDetailId}/products`,
      "POST",
      data,
      true
    );
    userService.showToast(200, "Add Product to service successful");
    return response;
  } catch (error) {
    console.error("Fail with : ", error.message);
    userService.showToast(400, error.message);
  }
};
export const StartAppointmet = async (scheduleId) => {
  try {
    const response = await userService.sendAjax(
      `/api/users/schedules/${scheduleId}/start`,
      "POST",
      null,
      true
    );
    userService.showToast(200, " Start appointment successful");
    return response;
  } catch (error) {
    console.error("Fail with StartAppointmet : ", error.message);
    userService.showToast(400, error.message);
  }
};
export const EndAppointmet = async (scheduleId) => {
  try {
    const response = await userService.sendAjax(
      `/api/users/schedules/${scheduleId}/end`,
      "POST",
      null,
      true
    );
    userService.showToast(200, " End appointment successful");
    return response;
  } catch (error) {
    console.error("Fail with StartAppointmet : ", error.message);
    userService.showToast(400, error.message);
  }
};
export const addAppointmentDetail = async (data, appoinmentId) => {
  try {
    const response = await userService.sendAjax(
      `/api/workplaces/${sAccount.value.workPlaceId}/appointments/${appoinmentId}/details`,
      "POST",
      data,
      true
    );
    currentAppointment.set((v) => {
      v.value.load += 1;
    });
    userService.showToast(
      200,
      "Request add service successfull please waiting cashier confirm!"
    );
    return response;
  } catch (error) {
    userService.showToast(400, error.message);

    console.error("Fail with: ", error);
  }
};

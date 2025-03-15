import UserService from "../../../hooks/services/UserService";
import { formatDate } from "../schemas/appointmentSchema";
import { FilterAppointment } from "./store/FilterStore";

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

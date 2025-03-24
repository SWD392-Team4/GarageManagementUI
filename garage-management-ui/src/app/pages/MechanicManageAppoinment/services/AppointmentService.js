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
  const query = `/api/users/my-schedules?${queryParams}`;

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
    await refreshCurrentAppointment();
    return response;
  } catch (error) {
    console.error("Fail with : ", error.message);
    userService.showToast(400, error.message);
  }
};
export const StartAppointmet = async (
  scheduleId,
  imageFormData,
  appoinmentId,
  detailId
) => {
  try {
    const response = await userService.sendAjax(
      `/api/users/schedules/${scheduleId}/start`,
      "GET",
      null,
      true
    );
    const response2 = await carconditonImageBefore(
      imageFormData,
      appoinmentId,
      detailId
    );
    await refreshCurrentAppointment();
    userService.showToast(200, " Start appointment successful");
    return response, response2;
  } catch (error) {
    console.error("Fail with StartAppointmet : ", error.message);
    userService.showToast(400, error.message);
  }
};
export const EndAppointmet = async (
  scheduleId,
  imageFormData,
  appoinmentId,
  detailId
) => {
  try {
    const response = await userService.sendAjax(
      `/api/users/schedules/${scheduleId}/end`,
      "GET",
      null,
      true
    );
    const response2 = await carconditonImageAfter(
      imageFormData,
      appoinmentId,
      detailId
    );
    await refreshCurrentAppointment();
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
    await refreshCurrentAppointment();
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
export const carconditonImageBefore = async (
  imageFormData,
  appoinmentId,
  detailId
) => {
  try {
    const response = await userService.sendAjax(
      `/api/appointments/${appoinmentId}/appointment-details/${detailId}/car-conditions/before`,
      "POST",
      imageFormData,
      true,
      true
    );

    return response;
  } catch (error) {
    userService.showToast(400, error.message);

    console.error("Fail with: ", error);
  }
};
export const carconditonImageAfter = async (
  imageFormData,
  appoinmentId,
  detailId
) => {
  try {
    const response = await userService.sendAjax(
      `/api/appointments/${appoinmentId}/appointment-details/${detailId}/car-conditions/after`,
      "POST",
      imageFormData,
      true,
      true
    );

    return response;
  } catch (error) {
    userService.showToast(400, error.message);

    console.error("Fail with: ", error);
  }
};
export const updateReplacementPart = async (
  appoinmentId,
  detailId,
  replacementPartId,
  data
) => {
  try {
    const response = await userService.sendAjax(
      `/api/workplaces/${sAccount.value.workPlaceId}/appointments/${appoinmentId}/details/${detailId}/products/${replacementPartId}`,
      "PUT",
      data,
      true
    );
    await refreshCurrentAppointment();
    return response;
  } catch (error) {
    userService.showToast(400, error.message);

    console.error("Fail with: ", error);
  }
};
// Giả sử hàm getAllAppointment đã được import và trả về response với:
// response.data.value là một mảng các appointment,
// trong đó mỗi appointment có thuộc tính "id" và "appointmentDetails"
export const refreshCurrentAppointment = async () => {
  try {
    const response = await getAllAppointment();
    // Lấy id của appointment hiện tại (theo store)
    const currentId = currentAppointment.value.appointmentDetail.id;
    // Tìm appointment trong kết quả trả về có id khớp
    const updatedAppointment = response.data.value.find(
      (app) => app.id === currentId
    );
    if (updatedAppointment) {
      // Cập nhật lại store currentAppointment để giao diện được re-render
      currentAppointment.set((v) => {
        v.value.appointmentDetail = updatedAppointment;
        return v;
      });
    } else {
      console.error("Không tìm thấy appointment có id:", currentId);
    }
  } catch (error) {
    console.error("Error refreshing current appointment:", error);
  }
};

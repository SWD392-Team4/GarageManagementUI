import UserService from "../../../hooks/services/UserService";
import { sAccount } from "../../AuthCustomer/services/store";
import { ConnectionSignify } from "../../Notification/services/connectionSignify";
import { formatDate } from "../schemas/appointmentSchema";
import {
  AppointmentSignify,
  currentAppointment,
} from "./store/AppointmentSignify";
import { FilterAppointment } from "./store/FilterStore";

const userService = new UserService();
export const getAllCarModel = async () => {
  try {
    const response = await userService.sendAjax(
      "/api/car-models?Status=Active&PageSize=50",
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
      "/api/services?Status=Active&PageSize=0",

      "GET",
      null,
      true
    );
    return response;
  } catch (error) {
    console.error("Fail with: ", error);
  }
};

export const getAllServiceByCarModel = async (carModelId) => {
  try {
    const response = await userService.sendAjax(
      `/api/services/carModel/${carModelId}`,
      "GET",
      null,
      true
    );
    return response;
  } catch (error) {
    console.error("Fail with: getAllServiceByCarModel", error);
  }
};
export const getAllMechanic = async () => {
  try {
    const response = await userService.sendAjax(
      `/api/users/employees?Role=Mechanic`,
      "GET",
      null,
      true
    );
    return response;
  } catch (error) {
    console.error("Fail with: getAllMechanic", error);
  }
};
export const getAllService = async () => {
  try {
    const response = await userService.sendAjax(
      `/api/services?Status=Active&PageSize=0`,
      "GET",
      null,
      true
    );
    return response;
  } catch (error) {
    console.error("Fail with: getAllService", error);
  }
};

export const getAllServicesOnPackages = async (idpackage) => {
  try {
    const response = await userService.sendAjax(
      `/api/packages/${idpackage}/services?PageSize=50`,
      "GET",
      null,
      true
    );
    return response;
  } catch (error) {
    console.error("Fail with: ", error);
  }
};
export const getAllProductSuitable = async (carModelSelectId, carPartId) => {
  try {
    const response = await userService.sendAjax(
      `/api/products/car-model/car-part/${carModelSelectId}/${carPartId}?ProductStatus=Active&PageSize=0`,
      // "/api/products?ProductStatus=Active",
      "GET",
      null,
      true
    );
    return response;
  } catch (error) {
    console.error("Fail with: getAllServiceByCarModel", error);
  }
};
export const getAllPackages = async () => {
  try {
    const response = await userService.sendAjax(
      "/api/packages?Status=Active&PageSize=0",
      "GET",
      null,
      true
    );
    return response;
  } catch (error) {
    console.error("Fail with: ", error);
  }
};
export const getAllProducts = async () => {
  try {
    const response = await userService.sendAjax(
      "/api/product-at-garages",
      "GET",
      null,
      true
    );
    return response;
  } catch (error) {
    console.error("Fail with: getAllProducts", error);
  }
};
export const getAllProductsAtGara = async () => {
  try {
    const response = await userService.sendAjax(
      `/api/product-at-garages/product/${sAccount.value.workPlaceId}?minQuantity=1`,
      "GET",
      null,
      true
    );
    return response;
  } catch (error) {
    console.error("Fail with: getAllProducts", error);
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
export const updatedAppointmentApi = async (data, id) => {
  try {
    const response = await userService.sendAjax(
      `/api/workplaces/${
        sAccount.value.role !== "Administrator"
          ? sAccount.value.workPlaceId
          : AppointmentSignify.value.garaCurrent
      }/appointments/${id}`,
      "PUT",
      data,
      true
    );
    userService.showToast(200, "Updated Appointment Successful");
    return response;
  } catch (error) {
    console.error("Fail with : ", error.message);
    userService.showToast(400, error.message);
  }
};
export const updatedAppointmentDetailApi = async (data, id) => {
  try {
    const response = await userService.sendAjax(
      `/api/workplaces/${
        sAccount.value.role !== "Administrator"
          ? sAccount.value.workPlaceId
          : AppointmentSignify.value.garaCurrent
      }/appointments/${id}/details`,
      "POST",
      data,
      true
    );
    userService.showToast(200, "Updated Appointment Detail Successful");
    return response;
  } catch (error) {
    console.error("Fail with : ", error.message);
    userService.showToast(400, error.message);
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
export const confirmAppointment = async (
  estimatedAppointmentTime,
  appoinmentId
) => {
  try {
    const response = await userService.sendAjax(
      `/api/workplaces/${
        sAccount.value.role !== "Administrator"
          ? sAccount.value.workPlaceId
          : AppointmentSignify.value.garaCurrent
      }/appointments/${appoinmentId}/confirmation`,
      "PUT",
      {
        estimatedAppointmentTime: estimatedAppointmentTime,
      },
      true
    );
    userService.showToast(200, "Confirm appointment successfull");
    return response;
  } catch (error) {
    userService.showToast(400, error.message);

    console.error("Fail with: ", error);
  }
};
export const cancelAppointment = async (reason, appoinmentId) => {
  try {
    const response = await userService.sendAjax(
      `/api/workplaces/${
        sAccount.value.role !== "Administrator"
          ? sAccount.value.workPlaceId
          : AppointmentSignify.value.garaCurrent
      }/appointments/${appoinmentId}/cancel`,
      "PUT",
      {
        cancelledReason: reason,
      },
      true
    );
    userService.showToast(200, "Cancel appointment successfull");
    return response;
  } catch (error) {
    userService.showToast(400, error.message);

    console.error("Fail with: ", error);
  }
};
export const cancelAppointmentDetail = async (
  reason,
  appoinmentId,
  serviceDetailId,
  type
) => {
  try {
    const response = await userService.sendAjax(
      `/api/workplaces/${
        sAccount.value.role !== "Administrator"
          ? sAccount.value.workPlaceId
          : AppointmentSignify.value.garaCurrent
      }/appointments/${appoinmentId}/details/${type}`,
      "PUT",
      {
        appointmentDetailId: [serviceDetailId],
        cancelledReason: reason,
      },
      true
    );
    userService.showToast(200, "Cancel appointment detail successfull!");
    return response;
  } catch (error) {
    userService.showToast(400, error.message);

    console.error("Fail with: ", error);
  }
};
export const AssignAppointmentDetail = async (
  appoinmentId,
  detailId,
  employeeid
) => {
  try {
    const response = await userService.sendAjax(
      `/api/workplaces/${
        sAccount.value.role !== "Administrator"
          ? sAccount.value.workPlaceId
          : AppointmentSignify.value.garaCurrent
      }/appointments/${appoinmentId}/details/${detailId}/assign `,
      "POST",
      {
        employeeId: employeeid,
      },
      true
    );
    if (ConnectionSignify.value.connection) {
      await sendNotification(
        ConnectionSignify.value.connection,
        notificationTypes.APPOINTMENT_ASSIGNED,
        employeeid
      );
    }

    userService.showToast(
      200,
      "Assign Employee to appointment detail successfull!"
    );
    return response;
  } catch (error) {
    userService.showToast(400, error.message);

    console.error("Fail with: ", error);
  }
};
export const UnAssignAppointmentDetail = async (
  appoinmentId,
  detailId,
  payload
) => {
  try {
    const response = await userService.sendAjax(
      `/api/workplaces/${
        sAccount.value.role !== "Administrator"
          ? sAccount.value.workPlaceId
          : AppointmentSignify.value.garaCurrent
      }/appointments/${appoinmentId}/details/${detailId}/unassign `,
      "POST",
      payload,
      true
    );
    userService.showToast(200, "UnAssign Employee successfull!");
    return response;
  } catch (error) {
    userService.showToast(400, error.message);

    console.error("Fail with: ", error);
  }
};
export const arrivalAppointment = async (data, appoinmentId) => {
  try {
    const response = await userService.sendAjax(
      `/api/workplaces/${
        sAccount.value.role !== "Administrator"
          ? sAccount.value.workPlaceId
          : AppointmentSignify.value.garaCurrent
      }/appointments/${appoinmentId}/arrival`,
      "PUT",
      data,
      true
    );
    userService.showToast(200, "Confirm Arrival successfull");
    return response;
  } catch (error) {
    userService.showToast(400, error.message);

    console.error("Fail with: ", error);
  }
};
export const getFullInfomationAppointment = async (appoinmentId) => {
  try {
    const response = await userService.sendAjax(
      `/api/workplaces/${
        sAccount.value.role !== "Administrator"
          ? sAccount.value.workPlaceId
          : AppointmentSignify.value.garaCurrent
      }/appointments/${appoinmentId}`,
      "GET",
      null,
      true
    );
    return response;
  } catch (error) {
    userService.showToast(400, error.message);

    console.error("Fail with: ", error);
  }
};
export const addAppointmentDetail = async (data, appoinmentId) => {
  try {
    const response = await userService.sendAjax(
      `/api/workplaces/${
        sAccount.value.role !== "Administrator"
          ? sAccount.value.workPlaceId
          : AppointmentSignify.value.garaCurrent
      }/appointments/${appoinmentId}/details`,
      "POST",
      data,
      true
    );
    userService.showToast(200, "Add detail appointment successfull");
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
    currentAppointment.set((v) => {
      v.value.load += 1;
    });
    if (response) {
      userService.showToast(
        200,
        data.status === "Cancelled"
          ? "Delete product from Service successfull! "
          : "Update product from Service successfull! "
      );
    }
    return response;
  } catch (error) {
    userService.showToast(400, error.message);

    console.error("Fail with: ", error);
  }
};

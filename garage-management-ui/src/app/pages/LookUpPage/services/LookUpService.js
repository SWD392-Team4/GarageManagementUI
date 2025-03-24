import UserService from "../../../hooks/services/UserService";
import { sLookUp } from "../services/LookUpSignify";

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
    console.error("Error with: ", error.message);
  }
};

export const viewAppointmentLookUp = async () => {
  try {
    const response = await userService.sendAjax(
      `/api/workplaces/${sLookUp.value.garareId}/appointments/guest?VerifyCode=${sLookUp.value.VerifyCode}&CustomerEmail=${sLookUp.value.CustomerEmail}&CustomerPhoneNumber=${sLookUp.value.CustomerPhoneNumber}&EstimatedTime=${sLookUp.value.EstimatedTime}`,
      "GET",
      null,
      false
    );
    console.log("Check response format: ", response);
    response.data.value.estimatedAppointmentTime = formatDateTime(
      response.data.value.estimatedAppointmentTime
    );
    response.data.value.estimatedEndTime = formatDateTime(
      response.data.value.estimatedEndTime
    );
    return response;
  } catch (error) {
    userService.showToast(400, error.message);
    console.error("Fail with : ", error.message);
  }
};

export const formatDateTime = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return (
    date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }) +
    " " +
    date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // Sử dụng định dạng 24 giờ
    })
  );
};

export const cancelAppointment = async (reasonData) => {
  try {
    const data = {
      verifyCode: sLookUp.value.VerifyCode,
      customerEmail: sLookUp.value.CustomerEmail,
      customerPhoneNumber: sLookUp.value.CustomerPhoneNumber,
      estimatedTime: sLookUp.value.EstimatedTime,
      cancelledReason: reasonData,
    };
    const response = await userService.sendAjax(
      `/api/workplaces/${sLookUp.value.garareId}/appointments/guest/cancel`,
      "PUT",
      data,
      false
    );
    userService.showToast(200, "Canceled Apointment Successful");
    return response;
  } catch (error) {
    userService.showToast(400, error.message);
    console.error("Fail with : ", error.message);
  }
};

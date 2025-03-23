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
    return response;
  } catch (error) {
    console.error("Fail with : ", error.message);
  }
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

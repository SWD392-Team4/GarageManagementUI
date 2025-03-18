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

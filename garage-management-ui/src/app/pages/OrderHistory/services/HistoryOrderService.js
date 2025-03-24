import UserService from "../../../hooks/services/UserService";
import { sAccount } from "../../AuthCustomer/services/store";

const userService = new UserService();

export const getAllInvoice = async () => {
  try {
    const response = await userService.sendAjax(
      `/api/invoices/customer?phonenumber=${sAccount.value.phoneNumber}&gmail=${sAccount.value.email}`,
      "GET",
      null,
      false
    );

    return response;
  } catch (error) {
    console.error("Error with: ", error.message);
  }
};

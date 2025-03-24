import UserService from "../../../hooks/services/UserService";
import { AppointmentSignify } from "../../AdminManageAppoinment/services/store/AppointmentSignify";

const userService = new UserService();

export const getGarageRevenueYear = async (year) => {
  try {
    const response = userService.sendAjax(
      `/api/dashboard/revenue/${year}?garageId=${AppointmentSignify.value.garaCurrent}`,
      "GET",
      null,
      true
    );
    return response;
  } catch (error) {
    console.error("Fail with: ", error.message);
  }
};

export const getDashBoardPackageYear = async (year) => {
  try {
    const response = userService.sendAjax(
      `/api/dashboard/package/${year}?garageId=${AppointmentSignify.value.garaCurrent}`,
      "GET",
      null,
      true
    );
    return response;
  } catch (error) {
    console.error("Error with: ");
  }
};

export const getDashBoardServiceYear = async (year) => {
  try {
    const response = await userService.sendAjax(
      `/api/dashboard/service/${year}?garageId=${AppointmentSignify.value.garaCurrent}`,
      "GET",
      null,
      true
    );
    return response;
  } catch (error) {
    console.error("Fail with: ", error.message);
  }
};

export const getDashBoardAppointmentYear = async (year) => {
  try {
    const response = await userService.sendAjax(
      `/api/dashboard/appointment/${year}?garageId=${AppointmentSignify.value.garaCurrent}`,
      "GET",
      null,
      true
    );
    return response;
  } catch (error) {
    console.error("Fail with: ", error.message);
  }
};

export const getDashBoardCustomer = async (year) => {
  try {
    const response = await userService.sendAjax(
      `/api/dashboard/customers/${year}?garageId=${AppointmentSignify.value.garaCurrent}`,
      "GET",
      null,
      true
    );

    return response;
  } catch (error) {
    console.error("Fail with: ", error.message);
  }
};

export const getDashBoardSale = async (year) => {
  try {
    const response = await userService.sendAjax(
      `/api/dashboard/sales/${year}?garageId=${AppointmentSignify.value.garaCurrent}`,
      "GET",
      null,
      true
    );
    return response;
  } catch (error) {
    console.error("Fail with: ", error.message);
  }
};

export const getDashBoardLowStockProduct = async (lowStockProduct) => {
  try {
    const response = await userService.sendAjax(
      `/api/dashboard/LowStockProduct/${lowStockProduct}`,
      "GET",
      null,
      true
    );

    return response;
  } catch (error) {
    console.error("Fail with: ", error.message);
  }
};

export const getGoodReceivedByDate = async () => {
  try {
    const response = await userService.sendAjax(
      `/api/dashboard/goodsReceivedByDate?`,
      "GET",
      null,
      true
    );
    return response;
  } catch (error) {
    console.error("Fail with: ", error.nessage);
  }
};

export const getGoodsIssuedByDate = async () => {
  try {
    const response = await userService.sendAjax(
      `/api/dashboard/goodsIssuedByDate`,
      "GET",
      null,
      true
    );
    return response;
  } catch (error) {
    console.error("Fail with: ", error.message);
  }
};

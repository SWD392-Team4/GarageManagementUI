import UserService from "../../../hooks/services/UserService";
import { sAccount } from "../../AuthCustomer/services/store";

const userService = new UserService();

export const getAllInvoiceSale = async (PageNumber) => {
  try {
    let url;

    if (sAccount.value.role === "Administrator") {
      url = `/api/invoices/admin/${AppointmentSignify.value.garaCurrent}?PageNumber=${PageNumber}`;
    } else {
      url = `/api/invoices/cashier?PageNumber=${PageNumber}`;
    }

    const response = await userService.sendAjax(url, "GET", null, true);
    response.data.value = response.data.value.map((pre) => ({
      ...pre,
      totalPrice: formatVietnameseCurrency(pre.totalPrice),
      createdAt: formatDate(pre.createdAt),
    }));

    return response;
  } catch (error) {
    console.error("Fail with: ", error.message);
  }
};

export const searchInvoice = async (params) => {
  try {
    const queryString = Object.keys(params)
      .filter((key) => params[key])
      .map((key) => `${key}=${encodeURIComponent(params[key])}`)
      .join("&");

    let url;

    if (sAccount.value.role === "Administrator") {
      url = `/api/invoices/admin/${AppointmentSignify.value.garaCurrent}?${queryString}`;
    } else {
      url = `/api/invoices/cashier?${queryString}`;
    }

    const response = await userService.sendAjax(url, "GET", null, true);

    response.data.value = response.data.value.map((pre) => ({
      ...pre,
      totalPrice: formatVietnameseCurrency(pre.totalPrice),
      createdAt: formatDate(pre.createdAt),
    }));
    return response;
  } catch (error) {
    console.error("Fail with: ", error.message);
  }
};

export const getDetailProductSell = async (invoiceId) => {
  try {
    const response = await userService.sendAjax(
      `/api/invoices/detail-sell-products/${invoiceId}`,
      "GET",
      null,
      true
    );
    return response;
  } catch (error) {
    console.error("Fail with :", error.message);
  }
};

export const createInvoiceSale = async (data) => {
  try {
    const response = await userService.sendAjax(
      "/api/invoices",
      "POST",
      data,
      true
    );
    userService.showToast(200, "Create Goods Issued Successful");
    return response;
  } catch (error) {
    userService.showToast(400, error.message);
    console.error("Fail to searching Goods Issued", error.message);
  }
};

export const updateInvoiceSale = async (invoiceSaleId, updatedData) => {
  try {
    const response = await userService.sendAjax(
      `/api/invoices-sale${invoiceSaleId}`,
      "PUT",
      updatedData,
      true
    );
    userService.showToast(200, "Updated Invoice Sale Successful");
    return response;
  } catch (error) {
    userService.showToast(400, "Updated Invoice Sale Fail");
    console.error("Fail to searching Invoice Sale ", error.message);
  }
};

export const getProductAtStore = async (data) => {
  try {
    const response = await userService.sendAjax(
      `/api/product-at-garages/product/${sAccount.value.workPlaceId}`,
      "GET",
      null,
      data
    );
    return response;
  } catch (error) {
    userService.showToast(400, error.message);
    console.error("Fail with: ", error.message);
  }
};

export const getProductAtGarageByBarCode = async (productBarCode) => {
  try {
    const response = await userService.sendAjax(
      `/api/barcode/scan/garage/${productBarCode}/${
        sAccount.value.role === "Administrator"
          ? AppointmentSignify.value.garaCurrent
          : sAccount.value.workPlaceId
      }`,
      "GET",
      null,
      true
    );
    return response;
  } catch (error) {
    userService.showToast(400, error.description);
    console.error("Fail With: ", error.message);
  }
};

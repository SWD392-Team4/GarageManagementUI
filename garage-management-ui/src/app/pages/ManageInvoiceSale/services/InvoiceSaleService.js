import UserService from "../../../hooks/services/UserService";

const userService = new UserService();

export const getAllInvoiceSale = async (PageNumber = 1) => {
  try {
    const response = await userService.sendAjax(
      `/api/invoice-sale?PageNumber=${PageNumber}`,
      "GET",
      null,
      true
    );
    // userService.showToast(200, "Loading List Invoice Sale Succesfful");
    return response;
  } catch (error) {
    console.error("Error with: ", error.message);
  }
};

export const searchInvoiceSale = async (params) => {
  try {
    const queryString = Object.keys(params)
      .filter((key) => params[key])
      .map((key) => `${key}=${encodeURIComponent(params[key])}`)
      .join("&");

    const response = await userService.sendAjax(
      `/api/invoice-sale?${queryString}`,
      "GET",
      null,
      true
    );
    return response;
  } catch (error) {
    console.error("Fail to searching Goods Issued", error.message);
  }
};

export const createInvoiceSale = async (data) => {
  try {
    const response = await userService.sendAjax(
      "/api/invocie-sale",
      "POST",
      data,
      true
    );
    userService.showToast(200, "Create Goods Issued Successful");
    return response;
  } catch (error) {
    userService.showToast(400, "Create Goods Issued Fail");
    console.error("Fail to searching Goods Issued", error.message);
  }
};

export const updateInvoiceSale = async (invoiceSaleId, updatedData) => {
  try {
    const response = await userService.sendAjax(
      `/api/invoice-sale${invoiceSaleId}`,
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

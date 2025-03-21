import UserService from "../../../hooks/services/UserService";
import { AppointmentSignify } from "../../AdminManageAppoinment/services/store/AppointmentSignify";
import { sAccount } from "../../AuthCustomer/services/store";
import {
  formatDate,
  formatVietnameseCurrency,
} from "../schemas/InventorySchemas";

const userService = new UserService();

export const getAllProductAtWarehouse = async (PageNumber = 1) => {
  try {
    const response = await userService.sendAjax(
      `/api/product-at-warehouses/${
        sAccount.value.role === "Administrator"
          ? AppointmentSignify.value.garaCurrent
          : sAccount.value.workPlaceId
      }?PageNumber=${PageNumber}`,
      "GET",
      null,
      true
    );
    response.data.value = response.data.value.map((pre) => ({
      ...pre,
      createdAt: formatDate(pre.createdAt),
      updatedAt: formatDate(pre.updatedAt),
    }));
    // userService.showToast(200, "Loading Inventory Successful");
    return response;
  } catch (error) {
    console.error("Fail with: ", error);
  }
};

export const searchProductAtWarehouse = async (params) => {
  try {
    const queryString = Object.keys(params)
      .filter((key) => params[key])
      .map((key) => `${key}=${encodeURIComponent(params[key])}`)
      .join("&");

    const response = await userService.sendAjax(
      `/api/product-at-warehouses/${
        sAccount.value.role === "Administrator"
          ? AppointmentSignify.value.garaCurrent
          : sAccount.value.workPlaceId
      }?${queryString}`,
      "GET",
      null,
      true
    );
    // response.data.value = response.data.value.map((pre) => ({
    //   ...pre,
    //   createdAt: formatDate(pre.createdAt),
    //   updatedAt: formatDate(pre.updatedAt),
    // }));
    return response;
  } catch (error) {
    console.error("Fail with: ", error);
  }
};

export const getAllWareHouse = async () => {
  try {
    const repsonse = userService.sendAjax(
      "/api/workplaces?WorkplaceType=Warehouse",
      "GET",
      null,
      true
    );
    return repsonse;
  } catch (error) {
    console.error("Error With: ", error);
  }
};

export const getProductByWareHouse = async (params) => {
  try {
    const queryString = Object.keys(params)
      .filter((key) => params[key])
      .map((key) => `${key}=${encodeURIComponent(params[key])}`)
      .join("&");

    const url = `/api/product-at-warehouses/product/${
      sAccount.value.role === "Administrator"
        ? AppointmentSignify.value.garaCurrent
        : sAccount.value.workPlaceId
    }${queryString ? `?${queryString}` : ""}`;

    const response = await userService.sendAjax(url, "GET", null, true);

    // response.data.value = response.data.value.map((pre) => ({
    //   ...pre,
    //   productPrice: formatVietnameseCurrency(pre.productPrice),
    // }));
    return response;
  } catch (error) {
    console.error("Error with: ", error);
  }
};

export const getProductDetails = async (productId) => {
  try {
    const response = await userService.sendAjax(
      `/api/product-at-warehouses/${productId}`,
      "GET",
      null,
      true
    );
    // response.data.value.productPrice = formatVietnameseCurrency(
    //   response.data.value.productPrice
    // );
    return response;
  } catch (error) {
    console.error("Error with: ", error);
  }
};

export const getProductAtWarehouseByBarCode = async (productBarCode) => {
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

// ========================================================Goods Received==========================================

export const getAllGoodsReceived = async (params = {}) => {
  try {
    // Kiểm tra nếu params là null hoặc undefined thì thay thế bằng object rỗng
    const queryString =
      params && Object.keys(params).length > 0
        ? Object.keys(params)
            .filter((key) => params[key] !== null && params[key] !== undefined)
            .map((key) => `${key}=${encodeURIComponent(params[key])}`)
            .join("&")
        : "";

    // Xác định đường dẫn API phù hợp với role
    const warehouseId =
      sAccount.value.role === "Administrator"
        ? AppointmentSignify.value.garaCurrent
        : sAccount.value.workPlaceId;

    const url = `/api/goods-received/warehouse/${warehouseId}${
      queryString ? `?${queryString}` : ""
    }`;

    const response = await userService.sendAjax(url, "GET", null, true);

    response.data.value = response.data.value.map((pre) => ({
      ...pre,
      totalPrice: formatVietnameseCurrency(pre.totalPrice),
      createdAt: formatDate(pre.createdAt),
      updatedAt: formatDate(pre.updatedAt),
    }));

    return response;
  } catch (error) {
    console.error("Error with: ", error.message);
  }
};

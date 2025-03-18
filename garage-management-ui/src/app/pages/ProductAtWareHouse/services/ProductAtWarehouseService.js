import UserService from "../../../hooks/services/UserService";
import {
  formatDate,
  formatVietnameseCurrency,
} from "../schemas/InventorySchemas";

const userService = new UserService();

export const getAllProductAtWarehouse = async (PageNumber = 1) => {
  try {
    const response = await userService.sendAjax(
      `/api/product-at-warehouses?PageNumber=${PageNumber}`,
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
      `/api/product-at-warehouses?${queryString}`,
      "GET",
      null,
      true
    );
    response.data.value = response.data.value.map((pre) => ({
      ...pre,
      createdAt: formatDate(pre.createdAt),
      updatedAt: formatDate(pre.updatedAt),
    }));
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

export const getProductByWareHouse = async (warehouseId, params) => {
  try {
    console.log("check params: ", params);

    const queryString = Object.keys(params)
      .filter((key) => params[key])
      .map((key) => `${key}=${encodeURIComponent(params[key])}`)
      .join("&");

    const url = `/api/products/warehouse/${warehouseId}${
      queryString ? `?${queryString}` : ""
    }`;

    const response = await userService.sendAjax(url, "GET", null, true);

    response.data.value = response.data.value.map((pre) => ({
      ...pre,
      productPrice: formatVietnameseCurrency(pre.productPrice),
    }));
    return response;
  } catch (error) {
    console.error("Error with: ", error);
  }
};

export const getProductDetails = async (productId) => {
  try {
    const response = await userService.sendAjax(
      `/api/products/product/${productId}`,
      "GET",
      null,
      true
    );
    response.data.value.productPrice = formatVietnameseCurrency(
      response.data.value.productPrice
    );
    return response;
  } catch (error) {
    console.error("Error with: ", error);
  }
};

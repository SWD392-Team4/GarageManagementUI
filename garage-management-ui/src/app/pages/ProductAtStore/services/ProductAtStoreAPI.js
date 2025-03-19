import { m } from "framer-motion";
import UserService from "../../../hooks/services/UserService";
import {
  formatDate,
  formatVietnameseCurrency,
} from "../schemas/ProductAtStoreSchemas";
import { sProductAtStore } from "./ProductAtStoreSignify";

const userService = new UserService();

export const getAllProductAtGarage = async (garageId, params) => {
  try {
    const queryString = Object.keys(params)
      .filter((key) => params[key])
      .map((key) => `${key}=${encodeURIComponent(params[key])}`)
      .join("&");

    const url = `/api/product-at-garages/garage`;

    const response = await userService.sendAjax(url, "GET", null, true);

    response.data.value = response.data.value.map((pre) => ({
      ...pre,
      productPrice: formatVietnameseCurrency(pre.productPrice),
    }));

    return response;
  } catch (error) {}
};

export const getAllStore = async () => {
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

export const getProductDetails = async (productId) => {
  try {
    const response = await userService.sendAjax(
      `/api/product-at-garages/${productId}`,
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

export const getProductAtGarageByBarCode = async (productBarCode) => {
  try {
    const response = await userService.sendAjax(
      `/api/product-at-garages/${productBarCode}`,
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

export const generationBarCode = async (barcode) => {
  try {
    const response = await userService.sendAjax(
      `/barcode/generate?barcodeText=${barcode}`,
      "GET",
      null,
      true
    );
    return response;
  } catch (error) {
    console.error("Fail with: ", error.message);
  }
};

///////////////////////////////////////////////////////////////////Phan invoice
export const getAllInvoiceSale = async (PageNumber) => {
  try {
    const response = await userService.sendAjax(
      `/api/invoices/cashier?PageNumber=${PageNumber}`,
      "GET",
      null,
      true
    );
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

    const response = await userService.sendAjax(
      `/api/invoices/cashier?${queryString}`,
      "GET",
      null,
      true
    );

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

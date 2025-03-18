import { error } from "jquery";
import UserService from "../../../hooks/services/UserService";
import { formatDate } from "../schemas/SuplierContactValid";

const userService = new UserService();

export const getAllSupplierContact = async (PageNumber = 1) => {
  try {
    const response = await userService.sendAjax(
      `/api/supplier/contacts?PageNumber=${PageNumber}`,
      "GET",
      null,
      true
    );

    response.data.value = response.data.value.map((supplier) => ({
      ...supplier,
      createdAt: formatDate(supplier.createdAt),
      updatedAt: formatDate(supplier.updatedAt),
    }));
    // userService.showToast(200, "Loading car parts successful");
    return response;
  } catch (error) {
    console.error("Error fetching car parts: ", error);
    userService.showToast(400, "Unknown error");
    return null;
  }
};

export const SearchSupplier = async (params) => {
  try {
    const queryString = Object.keys(params)
      .filter((key) => params[key])
      .map((key) => `${key}=${encodeURIComponent(params[key])}`)
      .join("&");

    const response = await userService.sendAjax(
      `/api/supplier/contacts?${queryString}`,
      "GET",
      null,
      true
    );

    response.data.value = response.data.value.map((suppliers) => ({
      ...suppliers,
      createdAt: formatDate(suppliers.createdAt),
      updatedAt: formatDate(suppliers.updatedAt),
    }));
    return response;
  } catch (error) {
    console.error("Fail to searching: ", error.message);
  }
};

export const createSupplierContact = async (data) => {
  console.log("check du lieu ", data);

  try {
    const response = await userService.sendAjax(
      "/api/supplier/contacts",
      "POST",
      data,
      true
    );
    userService.showToast(200, "Create Supplier Contact Successful");
    return response;
  } catch (error) {
    showToast(400, "Create Supplier Contact Fail");
    console.error("Error : ", error.message);
  }
};

export const updateSupplierContact = async (supplierContactId, updatedData) => {
  try {
    const response = await userService.sendAjax(
      `/api/supplier/contacts/${supplierContactId}`,
      "PUT",
      updatedData,
      true
    );
    userService.showToast(200, "Update Supplier contact successfull");
    return response;
  } catch (error) {
    console.error("Error : ", error.message);
    // userService.showToast(200, "Update Supplier contact fail")
  }
};

export const getSupplierContactDetail = async (supplierContactId) => {
  try {
    const response = await userService.sendAjax(
      `/api/supplier/contacts/${supplierContactId}`,
      "GET",
      null,
      true
    );
    return response;
  } catch {
    console.error("Error : ", error.message);
  }
};

export const getAllSupplier = async () => {
  try {
    const response = await userService.sendAjax(
      "/api/suppliers",
      "GET",
      null,
      true
    );
    response.data.value = response.data.value.map((suppliers) => ({
      ...suppliers,
      createdAt: formatDate(suppliers.createdAt),
      updatedAt: formatDate(suppliers.updatedAt),
    }));
    return response;
  } catch (error) {
    console.error("Error fetching suppliers: ", error);
    return [];
  }
};

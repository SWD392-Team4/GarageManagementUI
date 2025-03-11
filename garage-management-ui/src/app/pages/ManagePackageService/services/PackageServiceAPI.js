import UserService from "../../../hooks/services/UserService";
import { formatDate } from "../schemas/PackageServiceSchemas";
import { sPackageService } from "../services/PackageServiceSignify";

const userService = new UserService();

export const getAllPackageService = async (PageNumber = 1) => {
  try {
    const response = await userService.sendAjax(
      `/api/packages?PageNumber=${PageNumber}`,
      "GET",
      null,
      true
    );

    response.data.value = response.data.value.map((pre) => ({
      ...pre,
      createdAt: formatDate(pre.createdAt),
      updatedAt: formatDate(pre.updatedAt),
    }));

    userService.showToast(200, "Loading Package Service Successful");
    return response;
  } catch (error) {
    userService.showToast(400, "Loading Package Service Fail");
    console.error("Fail with: ", error);
  }
};

export const searchPackageService = async (params) => {
  try {
    const queryString = Object.keys(params)
      .filter((key) => params[key])
      .map((key) => `${key}=${encodeURIComponent(params[key])}`)
      .join("&");

    const response = await userService.sendAjax(
      `/api/packages?${queryString}`,
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

export const createPackage = async (data) => {
  try {
    const response = await userService.sendAjax(
      "/api/packages",
      "POST",
      data,
      true,
      true
    );

    userService.showToast(200, "Create Package Service Successful");
    return response;
  } catch (error) {
    userService.showToast(400, "Create Package Service Fail");
    console.error("❌ Error:", error);
  }
};

export const updatePackage = async (PackageId, FormData) => {
  try {
    const response = await userService.sendAjax(
      `/api/packages/${PackageId}`,
      "PUT",
      FormData,
      true
    );
    userService.showToast(200, "Update Package Service Successful");
    return response;
  } catch (error) {
    userService.showToast(400, "Update Package Service Fail");
    console.error("Error with: ", error);
  }
};

export const createImagePackage = async (PackageID, FormImage) => {
  try {
    const response = await userService.sendAjax(
      `/api/packages/${PackageID}/images`,
      "POST",
      FormImage,
      true
    );
    return response;
  } catch (error) {
    console.error("Error with: ", error);
  }
};

//cac api ho tro cho viec create va update
export const getPackageType = async () => {
  try {
    const response = await userService.sendAjax(
      "/api/packages/type",
      "GET",
      null,
      true
    );
    return response.data.value;
  } catch (error) {
    console.error("Error with: ", error);
  }
};

export const getPackageStatus = async () => {
  try {
    const response = await userService.sendAjax(
      "/api/packages/status",
      "GET",
      null,
      true
    );
    return response;
  } catch (error) {
    console.error("Error with: ", error);
  }
};

export const getPakageTimeUnit = async () => {
  try {
    const response = await userService.sendAjax(
      "/api/packages/timeUnit",
      "GET",
      null,
      true
    );
    return response;
  } catch (error) {
    console.error("Error with: ", error);
  }
};

export const getAllServiceCategory = async () => {
  try {
    const response = await userService.sendAjax(
      "/api/services?PageSize=0&Fields=serviceCategory",
      "GET",
      null,
      true
    );
    return response;
  } catch (error) {
    console.error("Error with: ", error);
  }
};

export const getAllCarCategory = async (PageNumber) => {
  try {
    //call api
    const response = await userService.sendAjax(
      "/api/car-categories?PageSize=0&Fields=id%2C%20category",
      "GET",
      null,
      true
    );
    return response;
  } catch (error) {
    console.error("Fail to loading car category", error.message);
  }
};

export const getAllConditionType = async () => {
  try {
    //call api
    const response = await userService.sendAjax(
      "/api/packages/ConditionType",
      "GET",
      null,
      true
    );
    return response;
  } catch (error) {
    console.error("Fail to loading Condition Type", error.message);
  }
};

export const getAllService = async () => {
  try {
    const response = await userService.sendAjax(
      "/api/services?PageSize=0",
      "GET",
      null,
      true
    );
    return response;
  } catch (error) {
    console.error("Fail to loading service", error.message);
  }
};

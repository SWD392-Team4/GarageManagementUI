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

export const getPackageDetail = async (PackageId) => {
  try {
    const response = await userService.sendAjax(
      `/api/packages/${PackageId}`,
      "GET",
      null,
      true,
    );
    response.data.value.createdAt = formatDate(response.data.value.createdAt);
    response.data.value.updatedAt = formatDate(response.data.value.updatedAt);
    userService.showToast(200, "Loading PackageDetail Successful");
    return response;
  } catch (error) {
    console.error("Error with : ", error.message);
    userService.showToast(400, "Loading PackageDetail Successful");

  }
}

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

export const GetServiceByPackageId = async (PackageId) => {
  try {
    const response = await userService.sendAjax(
      `/api/packages/${PackageId}/services`,
      "GET",
      null,
      true
    );
    return response;
  } catch (error) {
    console.error("Fail with: ", error);
  }
}


export const deteleImagePackage = async (packageId, imageId) => {
  try {
    const response = await userService.sendAjax(
      `/api/packages/${packageId}/images/${imageId}`,
      "DELETE",
      null,
      true
    );
    // Kiểm tra status code trong header, nếu là 204 thì xác nhận xóa thành công
    if (response?.status === 204) {
      userService.showToast(200, "Remove image successful");
      return true; // Trả về true để xác nhận ảnh đã bị xóa
    }

    return false; // Nếu không phải 204, trả về false
  } catch (error) {
    console.error("Error with:", error);
  }
}



export const createImagePackageUpdate = async (PackageID, FormImage) => {
  try {
    const response = await userService.sendAjax(
      `/api/packages/${PackageID}/images`,
      "POST",
      FormImage,
      true,
      true,
    );
    return response;
  } catch (error) {
    console.error("Error with: ", error);
  }
};


export const getPackageConditionTypeById = async (PackageId) => {
  try {
    const response = await userService.sendAjax(
      `/api/packages/${PackageId}/conditions`,
      "GET",
      null,
      true
    );
    return response;
  } catch (error) {
    console.error("Fail with: ", error);
  }
}

export const updatePackageConditionType = async (PackageId, ConditionId, data) => {
  try {
    const response = await userService.sendAjax(
      `/api/packages/${PackageId}/conditions/${ConditionId}`,
      "PUT",
      data,
      true
    );
    userService.showToast(200, "Update Package Conditions Succesful");
    return response;
  } catch (error) {
    console.error("Fail with: ", error);
  }
}

export const createPackageConditionType = async (PackageId, data) => {
  try {
    const response = await userService.sendAjax(
      `/api/packages/${PackageId}/conditions`,
      "POST",
      data,
      true
    );
    userService.showToast(200, "Create Package Conditions Successful");
    return response;
  } catch (error) {
    console.error("Fail With :", error);
  }
}
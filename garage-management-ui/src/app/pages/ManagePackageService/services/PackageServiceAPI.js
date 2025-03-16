import UserService from "../../../hooks/services/UserService";
import { formatDate, formatVietnameseCurrency } from "../schemas/PackageServiceSchemas";
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
      packagePrice: formatVietnameseCurrency(pre.packagePrice),
      createdAt: formatDate(pre.createdAt),
      updatedAt: formatDate(pre.updatedAt),
    }));

    userService.showToast(200, "Loading Package Service Successful");
    return response;
  } catch (error) {
    userService.showToast(400, "Loading Package Service Fail");
    console.error("Fail with: ", error.message);
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
      packagePrice: formatVietnameseCurrency(pre.packagePrice),
      createdAt: formatDate(pre.createdAt),
      updatedAt: formatDate(pre.updatedAt),
    }));

    return response;
  } catch (error) {
    userService.showToast(400, error.message);
    console.error("Fail with: ", error.message);
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

    //clear thong tin signify
    sPackageService.set((pre) => ([
      pre.value.id = "",
      pre.value.serviceCategory = "",
      pre.value.carCategory = "",
      pre.value.category = "",
      pre.value.packageName = "",
      pre.value.type = "",
      pre.value.status = "",
      pre.value.packagePrice = "",
      pre.value.validityPeriod = "",
      pre.value.timeUnit = "",
      pre.value.usageLimit = "",
      pre.value.createdAt = "",
      pre.value.updatedAt = ""
    ]))

    console.log("check thong tin: 1111 ", response.data);
    response.data.value.packagePrice = formatVietnameseCurrency(response.data.value.packagePrice)
    response.data.value.createdAt = formatDate(response.data.value.createdAt)
    response.data.value.updatedAt = formatDate(response.data.value.updatedAt)
    //gan vao signify
    sPackageService.set(response.data.value)



    userService.showToast(200, "Create Package Service Successful");
    return response;
  } catch (error) {
    userService.showToast(400, error.message);
    console.error("❌ Error:", error.message);
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
    response.data.value.packagePrice = formatVietnameseCurrency(response.data.value.packagePrice);
    response.data.value.createdAt = formatDate(response.data.value.createdAt);
    response.data.value.updatedAt = formatDate(response.data.value.updatedAt);
    userService.showToast(200, "Loading PackageDetail Successful");
    return response;
  } catch (error) {
    console.error("Error with : ", error.message);
    userService.showToast(400, error.message);

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
    //clear thong tin signify
    sPackageService.set((pre) => ([
      pre.value.id = "",
      pre.value.serviceCategory = "",
      pre.value.carCategory = "",
      pre.value.category = "",
      pre.value.packageName = "",
      pre.value.type = "",
      pre.value.status = "",
      pre.value.packagePrice = "",
      pre.value.validityPeriod = "",
      pre.value.timeUnit = "",
      pre.value.usageLimit = "",
      pre.value.createdAt = "",
      pre.value.updatedAt = ""
    ]))

    console.log("check thong tin: 1111 ", FormData);
    FormData.packagePrice = parseInt(FormData.packagePrice)
    FormData.packagePrice = formatVietnameseCurrency(FormData.packagePrice)


    //gan vao signify
    sPackageService.set((pre) => ([
      pre.value.id = PackageId,
      pre.value.serviceCategory = FormData.serviceCategory,
      pre.value.category = FormData.category,
      pre.value.packageName = FormData.packageName,
      pre.value.type = FormData.type,
      pre.value.status = FormData.status,
      pre.value.packagePrice = FormData.packagePrice,
      pre.value.validityPeriod = FormData.validityPeriod,
      pre.value.timeUnit = FormData.timeUnit,
      pre.value.usageLimit = FormData.usageLimit,
      pre.value.createdAt = FormData.createdAt,
      pre.value.updatedAt = FormData.updatedAt
    ]))


    userService.showToast(200, "Update Package Service Successful");
    return response;
  } catch (error) {
    userService.showToast(400, error.message);
    console.error("Error with: ", error.message);
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
    console.error("Error with: ", error.message);
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
      "/api/services/categories",
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
    response.data.value = response.data.value.map(pre => ({
      ...pre,
      price: formatVietnameseCurrency(pre.price)
    }))
    // console.log("check data: ", response.data.value)

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
    response.data.value = response.data.value.map(pre => ({
      ...pre,
      price: formatVietnameseCurrency(pre.price)
    }))


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

export const getPackageHistory = async (PackageId) => {
  try {
    const response = await userService.sendAjax(
      `/api/packages/${PackageId}/histories`,
      "GET",
      null,
      true
    );

    response.data.value = response.data.value.map(pre => ({
      ...pre,
      createdAt: formatDate(pre.createdAt)
    }))

    return response;
  } catch (error) {
    console.error("Fail with: ", error);
  }
}
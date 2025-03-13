import UserService from "../../../hooks/services/UserService";
import { formatDate } from "../schemas/PackageSchemas";

const userService = new UserService();

export const getAllPackages = async (
  PageNumber = 1,
  PageSize = 12,
  filters = {}
) => {
  try {
    const queryString = new URLSearchParams({
      PageNumber,
      PageSize,
      PackageName: filters?.searchTerm || "",
      ServiceCategory: filters?.serviceCategory || "",
      CarCategoryId: filters?.carCategory || "",
      Type: filters?.packageType||"",
      MinPrice: filters?.price ? Number(filters.price[0]) : 0,
      MaxPrice: filters?.price ? Number(filters.price[1]) : 10000000,
      PackageStatus: "Active",
    }).toString();

    console.log("API Query:", queryString);

    const response = await userService.sendAjax(
      `/api/packages?${queryString}`,
      "GET",
      null,
      false
    );

    if (response?.data?.value) {
      response.data.value = response.data.value.map((pkg) => ({
        ...pkg,
        createdAt: formatDate(pkg.createdAt),
        updatedAt: formatDate(pkg.updatedAt),
      }));
    }

    userService.showToast(200, "Loading Package Service Successful");
    return response.data;
  } catch (error) {
    console.error("Error fetching packages:", error);
    userService.showToast(400, "Loading Package Service Fail");
    return { value: [], paging: {} };
  }
};
export const getPackage = async (packageId) => {
  try {
    const response = await userService.sendAjax(
      `/api/packages/${packageId}`,
      "GET",
      null,
      false
    );

    return {
      ...response.data.value,
      createdAt: formatDate(response.data.value.createdAt),
      updatedAt: formatDate(response.data.value.updatedAt),
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    userService.showToast(400, "Error loading product");
    return null;
  }
};

export const getAllServicesCategories = async () => {
  try {
    const response = await userService.sendAjax(
      `/api/services/categories`,
      "GET",
      null,
      false
    );
    return response?.data?.value || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    userService.showToast(400, "Error loading categories");
    return [];
  }
};

export const getAllTypes = async () => {
  try {
    const response = await userService.sendAjax(
      `/api/packages/type`,
      "GET",
      null,
      false
    );
    return response?.data?.value|| [];
  } catch (error) {
    console.error("Error fetching types:", error);
    userService.showToast(400, "Error loading types");
    return [];
  }
};
export const getAllCars = async () => {
  try {
    const response = await userService.sendAjax(
      `/api/car-categories`,
      "GET",
      null,
      false
    );
    return response?.data?.value.filter(car => car.status === "Active") || [];
  } catch (error) {
    console.error("Error fetching types:", error);
    userService.showToast(400, "Error loading cars");
    return [];
  }
};

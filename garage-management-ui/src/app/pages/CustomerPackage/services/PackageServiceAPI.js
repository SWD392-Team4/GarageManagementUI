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
      // ServiceCategory: filters?.serviceCategory || "",
      MinPrice: filters?.price ? Number(filters.price[0]) : 0,
      MaxPrice: filters?.price ? Number(filters.price[1]) : 500000,
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

import UserService from "../../../hooks/services/UserService";
import { formatDate } from "../schemas/ProductValid";

const userService = new UserService();

export const getAllProducts = async (PageNumber = 1) => {
  try {
    const response = await userService.sendAjax(
      `/api/users/customers?PageNumber=${PageNumber}`,
      "GET",
      null,
      true
    );
    if (response != null) {
      if (response.data?.value) {
        response.data.value = response.data.value.map((product) => ({
          ...product,
          CreatedAt: formatDate(product.CreatedAt),
          UpdatedAt: formatDate(product.UpdatedAt),
        }));
      }
      return response;
    } else {
      console.error(`Error: Received status ${response.error}`);
      return [];
    }
  } catch (error) {
    console.error("Error fetching products: ", error);
    return [];
  }
};

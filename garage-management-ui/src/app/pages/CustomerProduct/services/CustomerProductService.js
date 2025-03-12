import UserService from "../../../hooks/services/UserService";
import { formatDate } from "../schemas/ProductService";

const userService = new UserService();

export const getAllProducts = async (
  PageNumber = 1,
  PageSize = 12,
  filters = {}
) => {
  try {
    const queryString = new URLSearchParams({
      PageNumber,
      PageSize,
      ProductName: filters?.searchTerm || "",
      ProductCategory: filters?.category || "",
      ProductBrandName: filters?.brand || "",
      MinPrice: filters?.price ? Number(filters.price[0]) : 0,
      MaxPrice: filters?.price ? Number(filters.price[1]) : 500000,
      ProductStatus: "Active",
    }).toString();
    console.log("API Query:", queryString);
    const response = await userService.sendAjax(
      `/api/products?${queryString}`,
      "GET",
      null,
      false
    );

    if (response?.data?.value) {
      response.data.value = response.data.value.map((product) => ({
        ...product,
        createdAt: formatDate(product.createdAt),
        updatedAt: formatDate(product.updatedAt),
      }));
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    userService.showToast(400, "Error loading products");
    return { value: [], paging: {} };
  }
};

export const getProduct = async (productId) => {
  try {
    const response = await userService.sendAjax(
      `/api/products/product/${productId}`,
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

export const getAllCategories = async () => {
  try {
    const response = await userService.sendAjax(
      `/api/product/categories`,
      "GET",
      null,
      false
    );
    return response?.data?.value.map((category) => category.category) || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    userService.showToast(400, "Error loading categories");
    return [];
  }
};

export const getAllBrands = async () => {
  try {
    const response = await userService.sendAjax(
      `/api/brands`,
      "GET",
      null,
      false
    );
    return response?.data?.value.map((brand) => brand.brandName) || [];
  } catch (error) {
    console.error("Error fetching brands:", error);
    userService.showToast(400, "Error loading brands");
    return [];
  }
};

import UserService from "../../../hooks/services/UserService";
import { formatDate } from "../schemas/ProductService";

const userService = new UserService();

export const getAllProducts = async (
  PageNumber = 1,
  PageSize = 12,
  filters = {}
) => {
  try {
    // Khởi tạo các tham số bắt buộc
    const params = {
      PageNumber,
      PageSize,
      ProductStatus: "Active",
    };

    // Chỉ gắn các tham số filter nếu chúng tồn tại
    if (filters?.searchTerm) {
      params.ProductName = filters.searchTerm;
    }
    if (filters?.category) {
      params.ProductCategory = filters.category;
    }
    if (filters?.brand) {
      params.ProductBrandName = filters.brand;
    }
    if (
      filters?.price &&
      Array.isArray(filters.price) &&
      filters.price.length === 2
    ) {
      params.MinPrice = Number(filters.price[0]);
      params.MaxPrice = Number(filters.price[1]);
    }

    // Tạo query string từ object params
    const queryString = new URLSearchParams(params).toString();
    console.log("API Query:", queryString);

    // Gửi yêu cầu với query string đã tạo
    const response = await userService.sendAjax(
      `/api/products?${queryString}`,
      "GET",
      null,
      false
    );

    // Format lại các trường createdAt và updatedAt
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

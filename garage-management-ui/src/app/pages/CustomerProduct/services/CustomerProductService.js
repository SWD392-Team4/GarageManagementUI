import api from "../../../hooks/services/api"; 
import { formatDate } from "../schemas/ProductService"; //Format dates

export const getAllProducts = async (PageNumber = 1, PageSize = 12) => {
  try {
    const response = await api.get(`/products`, {
      params: { PageNumber, PageSize }, 
    });

    if (response?.data?.value) {
      response.data.value = response.data.value.map((product) => ({
        ...product,
        CreatedAt: formatDate(product.CreatedAt),
        UpdatedAt: formatDate(product.UpdatedAt),
      }));
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return { value: [], paging: {} };
  }
};

export const getProduct = async (productId) => {
  try {
    const response = await api.get(`/products/product/${productId}`);

    return {
      ...response.data.value,
      CreatedAt: formatDate(response.data.value.CreatedAt),
      UpdatedAt: formatDate(response.data.value.UpdatedAt),
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

export const searchProduct = async (params) => {
  try {
    const response = await api.get(`/products`, { params });

    if (response?.data?.value) {
      response.data.value = response.data.value.map((product) => ({
        ...product,
        CreatedAt: formatDate(product.CreatedAt),
        UpdatedAt: formatDate(product.UpdatedAt),
      }));
    }

    return response.data;
  } catch (error) {
    console.error("Error searching product:", error);
    throw error;
  }
};

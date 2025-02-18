import UserService from "../../../hooks/services/UserService";
import { formatDate } from "../schemas/ProductValid";

const userService = new UserService();

export const getAllProducts = async () => {
    try {
        const response = await userService.sendAjax("/api/products", "GET", null, true);
        if (response != null) {
            if (response.data?.value) {
                response.data.value = response.data.value.map(product => ({
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


export const getProduct = async (productId) => {
    try {
        const response = await userService.sendAjax(`/api/products/product/${productId}`, "GET", null, true);
        if (response?.data) {
            return {
                ...response.data,
                CreatedAt: formatDate(response.data.CreatedAt),
                UpdatedAt: formatDate(response.data.UpdatedAt),
            };
        }
        return null;
    } catch (error) {
        console.error("Lỗi khi lấy thông tin sản phẩm: ", error);
        return null;
    }
};

export const updateProduct = async (productId, productData) => {
    try {
        const response = await userService.sendAjax(
            `/api/products/${productId}`,
            "PUT",
            JSON.stringify(productData),
            true
        );

        return response;
    } catch (error) {
        console.error("Lỗi khi cập nhật sản phẩm: ", error);
        return null;
    }
};

export const createProduct = async (productData) => {
    try {
        const response = await userService.sendAjax(
            `/api/products`,
            "POST",
            JSON.stringify(productData),
            true
        );

        return response;
    } catch (error) {
        console.error("Lỗi khi tạo sản phẩm: ", error);
        return null;
    }
};

export const searchProduct = async (params) => {
    try {
        const queryString = Object.keys(params)
            .filter(key => params[key])
            .map(key => `${key}=${encodeURIComponent(params[key])}`)
            .join("&");

        const url = `/api/products?${queryString}`;

        const response = await userService.sendAjax(url, "GET", null, true);

        if (response != null && response.data?.value) {
            response.data.value = response.data.value.map(product => ({
                ...product,
                CreatedAt: formatDate(product.CreatedAt),
                UpdatedAt: formatDate(product.UpdatedAt),
            }));
        }

        return response;
    } catch (error) {
        console.error("Error searching product:", error);
        throw error;
    }
};
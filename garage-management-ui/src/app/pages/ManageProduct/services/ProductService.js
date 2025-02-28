import UserService from "../../../hooks/services/UserService";
import { formatDate } from "../schemas/ProductValid";

const userService = new UserService();

export const getAllProducts = async (PageNumber = 1) => {
    try {
        const response = await userService.sendAjax(
            `/api/products?PageNumber=${PageNumber}`,
            "GET",
            null,
            true);
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
                ...response.data.value,
                CreatedAt: formatDate(response.data.value.CreatedAt),
                UpdatedAt: formatDate(response.data.value.UpdatedAt),
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
            productData,
            true
        );
        userService.showToast(200, "Update Successfull");
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
            productData,
            true
        );
        return response;
    } catch (error) {
        console.error("Lỗi khi tạo sản phẩm: ", error);
        return null;
    }
};

export const createProductImage = async (productId, FormData) => {
    console.log("check products id: ", productId);
    try {
        const response = await userService.sendAjax(
            `/api/products/${productId}/images`,
            "POST",
            FormData,
            true,
            true
        );
        if (response.data) {
            return response;
        } else {
            console.error("Fail to Upload: ", response.description);
            return null;
        }
    } catch (error) {
        console.error("Fail to upload image: ", error.message);
    }
}

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

export const getAllCategory = async () => {
    try {
        const response = await userService.sendAjax("/api/product/categories", "GET", null, true);

        if (response?.data?.value) {
            response.data.value = response.data.value.map(category => ({
                ...category,
                CreatedAt: formatDate(category.CreatedAt),
                UpdatedAt: formatDate(category.UpdatedAt),
            }));
        }
        return response;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
};

export const getAllBrand = async () => {
    try {
        const response = await userService.sendAjax(
            `/api/brands`,
            "GET",
            null,
            true
        );

        if (response != null) {
            if (response.data?.value) {
                response.data.value = response.data.value.map(brands => ({
                    ...brands,
                    CreatedAt: formatDate(brands.CreatedAt),
                    UpdatedAt: formatDate(brands.UpdatedAt),
                }));
            }

            return response;
        } else {
            console.error(`Error: Received status ${response.error}`);
            return null;
        }
    } catch (error) {
        console.error("Error fetching brands: ", error);
        return null;
    }
};

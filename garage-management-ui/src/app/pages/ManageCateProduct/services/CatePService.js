import UserService from "../../../hooks/services/UserService";
import { formatDate } from "../schemas/CateValid";
const userService = new UserService();

export const getAllCategory = async () => {
    try {
        const response = await userService.sendAjax("/api/product/categories", "GET", null, true);
        if (response != null) {
            if (response.data?.value) {
                response.data.value = response.data.value.map(categories => ({
                    ...categories,
                    CreatedAt: formatDate(categories.CreatedAt),
                    UpdatedAt: formatDate(categories.UpdatedAt),
                }));
            }
            return response;
        } else {
            console.error(`Error: Received status ${response.error}`);
            return [];
        }
    } catch (error) {
        console.error("Error fetching categories: ", error);
        return [];
    }
};

export const updateCategory = async (categoryId, updatedData) => {
    try {
        const response = await userService.sendAjax(
            `/api/product/categories/${categoryId}`,
            "PUT",
            updatedData,
            true
        );
        return response;
    } catch (error) {
        console.error("Error updating brand:", error);
        throw error;
    }
};
export const createCategory = async (data) => {
    try {
        const response = await userService.sendAjax(
            `/api/product/categories`,
            "POST",
            data,
            true
        );
        return response;
    } catch (error) {
        console.error("Error updating brand:", error);
        throw error;
    }
};

export const CategoryDetails = async (categoryId) => {
    try {
        const response = await userService.sendAjax(
            `/api/product/categories/${categoryId}`,
            "GET",
            null,
            true
        );
        return response;
    } catch (error) {
        console.error("Error updating brand:", error);
        throw error;
    }
};


export const searchCategory = async (params) => {
    try {
        const queryString = Object.keys(params)
            .filter(key => params[key]) // Loại bỏ các giá trị rỗng (null, "")
            .map(key => `${key}=${encodeURIComponent(params[key])}`)
            .join("&");

        const url = `/api/product/categories?${queryString}`;

        const response = await userService.sendAjax(
            url,
            "GET",
            null,
            true
        );
        return response;
    } catch (error) {
        console.error("Error loading brand:", error);
        throw error;
    }
};

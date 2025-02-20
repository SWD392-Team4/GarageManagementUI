import UserService from "../../../hooks/services/UserService";
import { formatDate } from "../schemas/CateValid";

const userService = new UserService();

export const getAllCategory = async (PageNumber = 1) => {
    try {
        const response = await userService.sendAjax(
            `/api/product/categories?PageNumber=${PageNumber}`,
            "GET",
            null,
            true
        );

        if (response?.data?.value) {
            response.data.value = response.data.value.map(category => ({
                ...category,
                CreatedAt: formatDate(category.CreatedAt),
                UpdatedAt: formatDate(category.UpdatedAt),
            }));
            userService.showToast(200, "Loading Category Successful");
        } else {
            userService.showToast(404, "No categories found");
        }
        return response;
    } catch (error) {
        userService.showToast(400, "Loading Category Failed");
        console.error("Error fetching categories:", error);
        return [];
    }
};

export const searchCategory = async (params) => {
    try {
        const queryString = Object.keys(params)
            .filter(key => params[key])
            .map(key => `${key}=${encodeURIComponent(params[key])}`)
            .join("&");

        const url = `/api/product/categories?${queryString}`;

        const response = await userService.sendAjax(url, "GET", null, true);

        if (response?.data?.value?.length > 0) {
            response.data.value = response.data.value.map(category => ({
                ...category,
                CreatedAt: formatDate(category.CreatedAt),
                UpdatedAt: formatDate(category.UpdatedAt),
            }));
            userService.showToast(200, "Search successful");
        } else {
            userService.showToast(404, "No matching categories found");
        }

        return response;
    } catch (error) {
        userService.showToast(400, "Error searching categories");
        console.error("Error searching categories:", error);
        throw error;
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

        if (response?.status === 204) {
            userService.showToast(204, "Category updated successfully");
        } else {
            userService.showToast(response?.status || 400, "Failed to update category");
        }

        return response;
    } catch (error) {
        userService.showToast(400, "Error updating category");
        console.error("Error updating category:", error);
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

        if (response != null) {
            userService.showToast(200, "Category created successfully");
        } else {
            userService.showToast(400, "Failed to create category");
        }

        return response;
    } catch (error) {
        userService.showToast(400, "Error creating category");
        console.error("Error creating category:", error);
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

        if (response?.status === 200 && response?.data) {
            userService.showToast(200, "Category details loaded successfully");
        } else {
            userService.showToast(404, "Category not found");
        }

        return response;
    } catch (error) {
        userService.showToast(400, "Error fetching category details");
        console.error("Error fetching category details:", error);
        throw error;
    }
};


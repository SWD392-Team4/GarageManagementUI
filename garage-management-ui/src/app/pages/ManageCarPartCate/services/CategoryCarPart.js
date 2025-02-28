import UserService from "../../../hooks/services/UserService";
import { formatDate } from "../schemas/CarPartValid";

const userService = new UserService();

export const getAllCarPartCate = async (PageNumber = 1) => {
    try {
        const response = await userService.sendAjax(
            `/api/car-parts/category?PageNumber=${PageNumber}`,
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
        }

        userService.showToast(200, "Loading Car Part Category successful");
        return response;
    } catch (error) {
        console.error("Error fetching Car Part Category:", error);
        userService.showToast(400, "Error loading Car Part Category");
        return null;
    }
};


export const searchCarPartCate = async (params) => {
    try {
        const queryString = Object.keys(params)
            .filter(key => params[key])
            .map(key => `${key}=${encodeURIComponent(params[key])}`)
            .join("&");

        const url = `/api/car-parts/category?${queryString}`;

        const response = await userService.sendAjax(url, "GET", null, true);

        if (response != null && response.data?.value) {
            response.data.value = response.data.value.map(category => ({
                ...category,
                CreatedAt: formatDate(category.CreatedAt),
                UpdatedAt: formatDate(category.UpdatedAt),
            }));
        }
        userService.showToast(200, "Car Part Category search completed successfully");
        return response;
    } catch (error) {
        console.error("Error searching Car Part Category:", error);
        userService.showToast(400, "Error searching Car Part Category");
        throw error;
    }
};


export const createCarPartCate = async (categoryData) => {
    try {
        const response = await userService.sendAjax("/api/car-parts/category", "POST", categoryData, true);
        userService.showToast(200, "Car Part Category created successfully");
        return response;
    } catch (error) {
        console.error("Error creating category:", error);
        userService.showToast(400, "Error creating Car Part Category");
        throw error;
    }
};

export const updateCarPartCate = async (categoryData, categoryId) => {

    try {
        const response = await userService.sendAjax(`/api/car-parts/category/${categoryId}`, "PUT", categoryData, true);
        userService.showToast(200, "Car Part Category updated successfully");
        return response;
    } catch (error) {
        console.error("Error updating category:", error.message);
        userService.showToast(400, "Error updating Car Part Category");
        throw error;
    }
};

export const getCarPartCateDetails = async (CarPartCategoryId) => {
    try {
        const response = await userService.sendAjax(
            `/api/car-parts/category/${CarPartCategoryId}`,
            "GET",
            null,
            true
        );
        if (response.data.value) {
            response.data.value.CreatedAt = formatDate(response.data.value.CreatedAt);
            response.data.value.UpdatedAt = formatDate(response.data.value.UpdatedAt);
        }


        userService.showToast(200, "Car Part Category details loaded successfully");
        return response;
    } catch (error) {
        console.error("Error loading Car Part Category:", error);
        userService.showToast(400, "Error loading Car Part Category");
        throw error;
    }
};

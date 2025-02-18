import UserService from "../../../hooks/services/UserService";
import { formatDate } from "../schemas/BrandValid";
const userService = new UserService();

export const getAllBrand = async () => {
    try {
        const response = await userService.sendAjax("/api/brands", "GET", null, true);
        if (response != null) {
            if (response.data?.value) {
                response.data.value = response.data.value.map(brands => ({
                    ...brands,
                    CreatedAt: formatDate(brands.CreatedAt),
                    UpdatedAt: formatDate(brands.UpdatedAt),
                }));
            }
            userService.showToast(200, "Loading Brands Successful");
            return response;
        } else {
            console.error(`Error: Received status ${response.error}`);
            userService.showToast(400, "Error loading brands");
            return [];
        }
    } catch (error) {
        console.error("Error fetching brands: ", error);
        userService.showToast(400, "Unknown error");
        return [];
    }
};

export const createBrand = async (brandData) => {
    try {
        const response = await userService.sendAjax("/api/brands", "POST", brandData, true);
        userService.showToast(200, "Brand created successfully");
        return response;
    } catch (error) {
        console.error("Error creating brand:", error);
        userService.showToast(400, "Error creating brand");
        throw error;
    }
};

export const updateBrand = async (brandId, updatedData) => {
    try {
        const response = await userService.sendAjax(
            `/api/brands/${brandId}`,
            "PUT",
            updatedData,
            true
        );
        userService.showToast(200, "Brand updated successfully");
        return response;
    } catch (error) {
        console.error("Error updating brand:", error);
        userService.showToast(400, "Error updating brand");
        throw error;
    }
};

export const getBrandDetails = async (brandId) => {
    try {
        const response = await userService.sendAjax(
            `/api/brands/${brandId}`,
            "GET",
            null,
            true
        );
        userService.showToast(200, "Brand details loaded successfully");
        return response;
    } catch (error) {
        console.error("Error loading brand:", error);
        userService.showToast(400, "Error loading brand");
        throw error;
    }
};

export const searchBrand = async (params) => {
    try {
        const queryString = Object.keys(params)
            .filter(key => params[key])
            .map(key => `${key}=${encodeURIComponent(params[key])}`)
            .join("&");

        const url = `/api/brands?${queryString}`;

        const response = await userService.sendAjax(url, "GET", null, true);

        if (response != null && response.data?.value) {
            response.data.value = response.data.value.map(brand => ({
                ...brand,
                CreatedAt: formatDate(brand.CreatedAt),
                UpdatedAt: formatDate(brand.UpdatedAt),
            }));
        }
        userService.showToast(200, "Brands search completed successfully");
        return response;
    } catch (error) {
        console.error("Error searching brands:", error);
        userService.showToast(400, "Error searching brands");
        throw error;
    }
};

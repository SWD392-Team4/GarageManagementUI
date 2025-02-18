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
            return response;
        } else {
            console.error(`Error: Received status ${response.error}`);
            return [];
        }
    } catch (error) {
        console.error("Error fetching brands: ", error);
        return [];
    }
};

export const createBrand = async (brandData) => {
    try {
        const response = await userService.sendAjax("/api/brands", "POST", brandData, true);
        return response;
    } catch (error) {
        console.error("Error creating brand:", error);
        throw error;
    }
};

export const updateBrand = async (brandId, updatedData) => {
    console.log("check id ton tai", brandId);
    try {
        const response = await userService.sendAjax(
            `/api/brands/${brandId}`,
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

export const getBrandDetails = async (brandId) => {
    try {
        const response = await userService.sendAjax(
            `/api/brands/${brandId}`,
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

        return response;
    } catch (error) {
        console.error("Error searching brands:", error);
        throw error;
    }
};
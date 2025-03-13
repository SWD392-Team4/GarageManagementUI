import UserService from "../../../hooks/services/UserService";
import { sBrand } from "../services/BrandSignify"
import { formatDate } from "../schemas/BrandValid";
const userService = new UserService();

export const getAllBrand = async (PageNumber = 1) => {
    try {
        const response = await userService.sendAjax(
            `/api/brands?PageNumber=${PageNumber}`,
            "GET",
            null,
            true
        );

        if (response != null) {
            if (response.data?.value) {
                response.data.value = response.data.value.map(brands => ({
                    ...brands,
                    createdAt: formatDate(brands.createdAt),
                    updatedAt: formatDate(brands.updatedAt),
                }));
            }

            userService.showToast(200, "Loading Brands Successful");
            return response;
        } else {
            console.error(`Error: Received status ${response.error}`);
            userService.showToast(400, "Error loading brands");
            return null;
        }
    } catch (error) {
        console.error("Error fetching brands: ", error);
        userService.showToast(400, "Unknown error");
        return null;
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
                createdAt: formatDate(brand.createdAt),
                updatedAt: formatDate(brand.updatedAt),
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

export const createBrand = async (brandData) => {
    try {
        const response = await userService.sendAjax("/api/brands", "POST", brandData, true);
        console.log("check response :", response.data.value);
        //gan signify
        sBrand.set((pre) => ([
            pre.value.id = "",
            pre.value.brandName = "",
            pre.value.imageLink = "",
            pre.value.status = "",
            pre.value.createdAt = "",
            pre.value.updatedAt = ""
        ]))
        response.data.value.createdAt = formatDate(response.data.value.createdAt)
        response.data.value.updatedAt = formatDate(response.data.value.updatedAt)
        sBrand.set(response.data.value);
        //return
        userService.showToast(200, "Brand created successfully");
        return response;
    } catch (error) {
        console.error("Error creating brand:", error);
        userService.showToast(400, "Error creating brand");
        throw error;
    }
};

export const createBrandImage = async (brandId, ImageBrand) => {
    try {
        const response = await userService.sendAjax(
            `/api/brands/${brandId}/image`,
            "POST",
            ImageBrand,
            true,
            true
        );

        if (response?.status == 204) {
            userService.showToast(200, "Upload image successful");
            return response;
        } else {
            console.error("Upload image fails: ");
        }

        return response;
    } catch (error) {
        console.error("Fail to upload image: ", error.message);
    }
}



export const updateBrand = async (brandId, updatedData) => {
    console.log("check data update: ", updatedData);
    try {
        const response = await userService.sendAjax(
            `/api/brands/${brandId}`,
            "PUT",
            updatedData,
            true
        );
        //xu ly du lieu signfi
        sBrand.set((pre) => ([
            pre.value.id = "",
            pre.value.brandName = "",
            pre.value.imageLink = "",
            pre.value.status = "",
            pre.value.createdAt = "",
            pre.value.updatedAt = ""
        ]))
        //format ngay
        updatedData.createdAt = formatDate(updatedData.createdAt);
        updatedData.updatedAt = formatDate(updatedData.updatedAt);
        sBrand.set(updatedData);
        //return
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



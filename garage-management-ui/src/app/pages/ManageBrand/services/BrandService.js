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
                    CreatedAt: formatDate(brands.CreatedAt),
                    UpdatedAt: formatDate(brands.UpdatedAt),
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

export const createBrand = async (brandData) => {
    try {
        const response = await userService.sendAjax("/api/brands", "POST", brandData, true);
        console.log("check response :", response.data.value);
        //gan signify
        sBrand.set((pre) => ([
            pre.value.Id = "",
            pre.value.BrandName = "",
            pre.value.ImageLink = "",
            pre.value.Status = "",
            pre.value.CreatedAt = "",
            pre.value.UpdatedAt = ""
        ]))
        sBrand.set(response.data.value);
        console.log("check signi data: ", sBrand.value);
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
        const response = userService.sendAjax(
            `/api/brands/${brandId}/image`,
            "POST",
            ImageBrand,
            true,
            true
        );

        if (response?.status == 204) {
            userService.showToast(200, "Upload image successful")
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
            pre.value.Id = "",
            pre.value.BrandName = "",
            pre.value.ImageLink = "",
            pre.value.Status = "",
            pre.value.CreatedAt = "",
            pre.value.UpdatedAt = ""
        ]))
        //format ngay
        updatedData.BrandName = <>{updatedData.BrandName}<span className="font-semibold text-green-500"> - Recently Updated</span> </>
        updatedData.CreatedAt = formatDate(updatedData.CreatedAt);
        updatedData.UpdatedAt = formatDate(updatedData.UpdatedAt);
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



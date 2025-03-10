import UserService from "../../../hooks/services/UserService";
import { formatDate } from "../schemas/CarPartValid";
import { sCarPart } from "./SignifyCarPart";

const userService = new UserService();

// Lấy tất cả phụ tùng xe
export const getAllCarPart = async (PageNumber = 1) => {
    try {
        const response = await userService.sendAjax(
            `/api/car-parts?PageNumber=${PageNumber}`,
            "GET",
            null,
            true
        );

        if (response != null) {
            if (response.data?.value) {
                response.data.value = response.data.value.map(carPart => ({
                    ...carPart,
                    createdAt: formatDate(carPart.createdAt),
                    updatedAt: formatDate(carPart.updatedAt),
                }));
            }

            userService.showToast(200, "Loading car parts successful");
            return response;
        } else {
            console.error(`Error: Received status ${response.error}`);
            userService.showToast(400, "Error loading car parts");
            return null;
        }
    } catch (error) {
        console.error("Error fetching car parts: ", error);
        userService.showToast(400, "Unknown error");
        return null;
    }
};

// Tìm kiếm phụ tùng xe
export const searchCarPart = async (params) => {
    try {
        const queryString = Object.keys(params)
            .filter(key => params[key])
            .map(key => `${key}=${encodeURIComponent(params[key])}`)
            .join("&");

        const url = `/api/car-parts?${queryString}`;

        const response = await userService.sendAjax(url, "GET", null, true);

        if (response != null && response.data?.value) {
            response.data.value = response.data.value.map(carPart => ({
                ...carPart,
                createdAt: formatDate(carPart.createdAt),
                updatedAt: formatDate(carPart.updatedAt),
            }));
        }
        userService.showToast(200, "Car parts search completed successfully");
        return response;
    } catch (error) {
        console.error("Error searching car parts:", error);
        userService.showToast(400, "Error searching car parts");
        throw error;
    }
};

// Cập nhật thông tin phụ tùng xe
export const updateCarPart = async (carPartId, updatedData) => {
    try {
        const response = await userService.sendAjax(
            `/api/car-parts/${carPartId}`,
            "PUT",
            updatedData,
            true
        );
        //xu ly response
        if (response.status == 200) {
            //clear signify
            sCarPart.set((pre) => ([
                pre.value.id = "",
                pre.value.partName = "",
                pre.value.partCategory = "",
                pre.value.status = "",
                pre.value.createdAt = "",
                pre.value.updatedAt = "",
            ]))
            //gan thong tin vao signify
            sCarPart.set((pre) => ([
                pre.value.id = carPartId,
                pre.value.partName = updatedData.partName,
                pre.value.partCategory = updatedData.partCategory,
                pre.value.status = updatedData.status,
                pre.value.createdAt = updatedData.createdAt,
                pre.value.updatedAt = updatedData.updatedAt,
            ]))
            userService.showToast(200, "Car Part updated successfully");
            return response;
        } else {
            userService.showToast(400, "Car Part updated fail");
            return null;
        }

    } catch (error) {
        console.error("Error updating car part:", error);
        userService.showToast(400, "Error updating car part");
        throw error;
    }
};

// Lấy chi tiết một phụ tùng xe
export const getCarPartDetails = async (carPartId) => {
    try {
        const response = await userService.sendAjax(
            `/api/car-parts/${carPartId}`,
            "GET",
            null,
            true
        );

        if (response.data.value) {
            response.data.value.createdAt = formatDate(response.data.value.createdAt);
            response.data.value.updatedAt = formatDate(response.data.value.updatedAt);
        }

        userService.showToast(200, "Car Part details loaded successfully");
        return response;
    } catch (error) {
        console.error("Error loading car part:", error);
        userService.showToast(400, "Error loading car part");
        throw error;
    }
};

export const getAllCarPartCate = async () => {
    try {
        const response = await userService.sendAjax(
            "/api/car-parts/category?Fields=id%2C%20partCategory",
            "GET",
            null,
            true
        );
        return response.data.value;
    } catch (error) {
        console.error("Error fetching Car Part Category:", error);
        return null;
    }
};


export const createCarPart = async (categoryData) => {
    try {
        const response = await userService.sendAjax("/api/car-parts", "POST", categoryData, true);
        console.log("check thong tin: ", response);
        //xu ly thong tin
        if (response.status == 200) {
            // clear thong tin signify
            sCarPart.set((pre) => ([
                pre.value.id = "",
                pre.value.partName = "",
                pre.value.partCategory = "",
                pre.value.status = "",
                pre.value.createdAt = "",
                pre.value.updatedAt = "",
            ]))
            //format
            response.data.value.createdAt = formatDate(response.data.value.createdAt);
            response.data.value.updatedAt = formatDate(response.data.value.updatedAt);
            //gan thong tin moi vao api
            sCarPart.set(response.data.value);

            userService.showToast(200, "Car Part created successfully");
            return response;
        } else {
            userService.showToast(400, "Car Part created fail");
            return null;
        }

    } catch (error) {
        console.error("Error creating category:", error);
        userService.showToast(400, "Error creating Car Part");
        throw error;
    }
};
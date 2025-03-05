import UserService from "../../../hooks/services/UserService";
import { formatDate } from "../schemas/CarPartValid";
import { sCategoryCarPart } from "./CategoryCarPartSinginify"

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
                createdAt: formatDate(category.createdAt),
                updatedAt: formatDate(category.updatedAt),
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
                createdAt: formatDate(category.createdAt),
                updatedAt: formatDate(category.updatedAt),
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

        if (response.status == 200) {
            //logic signify
            sCategoryCarPart.set((pre) => ([
                pre.value.id = "",
                pre.value.partCategory = "",
                pre.value.status = "",
                pre.value.createdAt = "",
                pre.value.updatedAt = "",
            ]))
            //lay thon tin moi gan vao
            response.data.value.createdAt = formatDate(response.data.value.createdAt);
            response.data.value.updatedAt = formatDate(response.data.value.updatedAt);
            //parse ngay
            sCategoryCarPart.set(response.data.value);
            userService.showToast(200, "Car Part Category created successfully");
            return response;
        } else {
            userService.showToast(404, " Car Part Category created fail");
            return null;
        }


    } catch (error) {
        console.error("Error creating category:", error);
        userService.showToast(400, "Error creating Car Part Category");
        throw error;
    }
};

export const updateCarPartCate = async (categoryData, categoryId) => {
    console.log("check data updated: ", categoryData);

    try {
        const response = await userService.sendAjax(`/api/car-parts/category/${categoryId}`, "PUT", categoryData, true);

        //xu ly
        if (response.status == 200) {
            //xu ly signify
            sCategoryCarPart.set((pre) => ([
                pre.value.id = "",
                pre.value.partCategory = "",
                pre.value.status = "",
                pre.value.createdAt = "",
                pre.value.updatedAt = "",
            ]))
            //gan thong tin moi vao
            sCategoryCarPart.set((pre) => ([
                pre.value.id = categoryId,
                pre.value.partCategory = categoryData.partCategory,
                pre.value.status = categoryData.status,
                pre.value.createdAt = categoryData.createdAt,
                pre.value.updatedAt = categoryData.updatedAt
            ]))

            userService.showToast(200, "Car Part Category updated successfully");
            return response;
        } else {
            userService.showToast(400, "Car Part Category updated fail");
            return null;
        }



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
            response.data.value.createdAt = formatDate(response.data.value.createdAt);
            response.data.value.updatedAt = formatDate(response.data.value.updatedAt);
        }


        userService.showToast(200, "Car Part Category details loaded successfully");
        return response;
    } catch (error) {
        console.error("Error loading Car Part Category:", error);
        userService.showToast(400, "Error loading Car Part Category");
        throw error;
    }
};

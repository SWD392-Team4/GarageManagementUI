import UserService from "../../../hooks/services/UserService";
import { formatDate } from "../schemas/CarCategoryValid";
import { sCarCategory } from "./CarCategorySignify";

const userService = new UserService();

export const getAllCarCategory = async (PageNumber) => {
    try {
        //call api
        const response = await userService.sendAjax(
            `/api/car-categories?PageNumber=${PageNumber}`,
            "GET",
            null,
            true
        )

        //check response
        if (response.status == 200) {
            response.data.value = response.data.value.map(category => ({
                ...category,
                createdAt: formatDate(category.createdAt),
                updatedAt: formatDate(category.updatedAt),
            }))
            userService.showToast(200, "Loading Car Category Successful");

            return response;
        } else {
            console.error(`Error: Received status ${response.error}`);
            userService.showToast(404, "Loading Car Category Fail");
            return null;
        }


    } catch (error) {
        console.error("Fail to loading car category", error.message);
    }
}


export const SearchCarCategory = async (params) => {
    try {
        //tách params
        const queryString = Object.keys(params)
            .filter(key => params[key])
            .map(key => `${key}=${encodeURIComponent(params[key])}`)
            .join("&");
        //call api
        const response = await userService.sendAjax(
            `/api/car-categories?${queryString}`,
            "GET",
            null,
            true
        )
        //check response
        if (response) {
            response.data.value = response.data.value.map(category => ({
                ...category,
                createdAt: formatDate(category.createdAt),
                updatedAt: formatDate(category.updatedAt),
            }))
            userService.showToast(200, "Searching Car Category Successful");
            return response;
        } else {
            console.error("Searching Car Category Fail");
            userService.showToast(404, "Searching Car Category Fail")
            return null;
        }
    } catch (error) {
        console.error("Fail to loading car category", error.message);
    }
}

export const CreateCarCategory = async (data) => {
    try {
        const response = await userService.sendAjax(
            "/api/car-categories",
            "POST",
            data,
            true
        )
        console.log("check data: ", response);

        //chuyen doi bien
        response.data.value.createdAt = formatDate(response.data.value.createdAt)
        response.data.value.createdAt = formatDate(response.data.value.updatedAt)
        sCarCategory.set(response.data.value);
        // console.log("check data siginify service", sCarCategory.value);

        userService.showToast(200, "Create Car Category Successful");
        return response;

    } catch (error) {
        console.error("Fail create car category: ", error.message);
    }

}

export const UpdateCarCategory = async (carCategoryID, data) => {
    try {
        const response = await userService.sendAjax(
            `/api/car-categories/${carCategoryID}`,
            "PUT",
            data,
            true
        );
        if (response) {
            //logic signify
            sCarCategory.set((pre) => {
                pre.value.id = ""
                pre.value.category = ""
                pre.value.status = ""
                pre.value.createdAt = ""
                pre.value.updatedAt = ""
            })
            //gan thong tin moi vao
            sCarCategory.set((pre) => {
                pre.value.id = carCategoryID
                pre.value.status = data.status
                pre.value.createdAt = data.createdAt
                pre.value.updatedAt = data.updatedAt
            })

            console.log("check signify: ", sCarCategory.value);

            userService.showToast(200, "Update Car Category Successful");
            return response;
        } else {
            userService.showToast(404, "Fail to Update Car Category");
            return null
        }
    } catch (error) {
        console.error("Fail to Update Car Category", error.message);
    }
}

export const getCarCategory = async (carCategoryID) => {
    try {
        const response = await userService.sendAjax(
            `/api/car-categories/${carCategoryID}`,
            "GET",
            null,
            true
        );
        if (response) {
            response.data.value.createdAt = formatDate(response.data.value.createdAt);
            response.data.value.updatedAt = formatDate(response.data.value.updatedAt);
            return response;
        } else {
            console.error("Fail to loading category with ID: ", carCategoryID);
            return null;
        }

    } catch (error) {
        console.error("Fail to loading category with ID: ", carCategoryID);
    }
}
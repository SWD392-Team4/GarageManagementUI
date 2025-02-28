import { map } from "jquery";
import UserService from "../../../hooks/services/UserService"
import { formatDate } from "../schemas/CarModalValid";

const userService = new UserService();

export const getAllCarModal = async (PageNumber = 1) => {
    try {
        const response = await userService.sendAjax(`/api/car-models?PageNumber=${PageNumber}`, "GET", null, true);
        if (response.data.value) {
            response.data.value = response.data.value.map(carModal => ({
                ...carModal,
                createdAt: formatDate(carModal.createdAt),
                updatedAt: formatDate(carModal.updatedAt)
            }))

            userService.showToast(200, "Loading Car Modal Successful");
            return response;
        } else {
            console.error(`Error: Received status ${response.error}`);
            userService.showToast(400, "Error loading car modal");
            return null;
        }
    } catch (error) {
        console.error("Fetching data Car Modal fail: ", error.message);
    }

}
export const searchCarModal = async (params) => {
    try {

        const queryString = Object.keys(params)
            .filter(key => params[key])
            .map(key => `${key}=${encodeURIComponent(params[key])}`)
            .join("&");

        const response = await userService.sendAjax(`/api/car-models?${queryString}`, "GET", null, true);
        if (response.data.value) {
            response.data.value = response.data.value.map(carModal => ({
                ...carModal,
                createdAt: formatDate(carModal.createdAt),
                updatedAt: formatDate(carModal.updatedAt)
            }))
            userService.showToast(200, "Searching Car Modal Successful");
            return response;
        } else {
            console.error(`Error: Received status ${response.error}`);
            userService.showToast(400, "Error Searching car modal");
            return null;
        }
    } catch (error) {
        console.error("Searching Car Modal Fail: ", error.message);
    }
}

export const createCarModal = async (data) => {
    try {
        const response = userService.sendAjax(
            "/api/car-models",
            "POST",
            data,
            true
        );

        if (response) {
            userService.showToast(200, "Create Car Models Successful");
            return response;
        } else {
            userService.showToast(404, "Create Car Models Fail");
            return null;
        }

    } catch (error) {
        console.error("Error create car models: ", error.message);
    }
}

export const getCarModalDetails = async (carModalId) => {
    try {
        const response = userService.sendAjax(
            `/api/car-models/${carModalId}`,
            "GET",
            null,
            true
        )
        if (response.data.value) {
            response.data.value.createdAt = formatDate(createAt)
            response.data.value.updatedAt = formatDate(updatedAt)
        }
        return response;
    } catch (error) {
        console.error("Fail loading car modal infomation with: ", carModalId);
    }
}




export const getAllBrand = async () => {
    try {
        const response = await userService.sendAjax(
            "/api/brands",
            "GET",
            null,
            true
        );

        if (response != null) {
            return response.data.value;
        } else {
            console.error(`Error: Received status ${response.error}`);
            return null;
        }
    } catch (error) {
        console.error("Error fetching brands: ", error);
        userService.showToast(400, "Unknown error");
        return null;
    }
};

export const getAllCarCategory = async () => {
    try {
        //call api
        const response = await userService.sendAjax(
            "/api/car-categories",
            "GET",
            null,
            true
        )
        //check response
        if (response.status == 200) {
            return response.data.value;
        } else {
            console.error(`Error: Received status ${response.error}`);
            userService.showToast(404, "Loading Car Category Fail");
            return null;
        }
    } catch (error) {
        console.error("Fail to loading car category", error.message);
    }
}

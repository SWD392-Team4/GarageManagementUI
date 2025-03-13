import UserService from "../../../hooks/services/UserService"
import { formatDate } from "../schemas/GoodsReceivedSchema";
import { sGoodsReceived } from "./GoodsReceivedSignify";

const userService = new UserService();

export const getAllGoodReceived = async (PageNumber = 1) => {
    try {
        const response = await userService.sendAjax(
            `/api/goods-received?PageNumber=${PageNumber}`,
            "GET",
            null,
            true,
        );
        response.data.value = response.data.value.map(pre => ({
            ...pre,
            createdAt: formatDate(pre.createdAt),
            updatedAt: formatDate(pre.updatedAt)

        }))

        userService.showToast(200, "Loading List Goods Received");
        return response;
    } catch (error) {
        console.error("Fail to loading", error.message);
        userService.showToast(400, error.message);
    }
}

export const searchGoodsReceived = async (params) => {
    try {
        const queryString = Object.keys(params)
            .filter(key => params[key])
            .map(key => `${key}=${encodeURIComponent(params[key])}`)
            .join("&");

        const response = await userService.sendAjax(
            `/api/goods-received?${queryString}`,
            "GET",
            null,
            true
        );
        response.data.value = response.data.value.map(pre => ({
            ...pre,
            createdAt: formatDate(pre.createdAt),
            updatedAt: formatDate(pre.updatedAt)

        }))

        return response;
    } catch (error) {
        console.error("Fail With: ", error.message);
    }
}


export const createGoodsReceived = async (data) => {
    try {
        const response = await userService.sendAjax(
            "/api/goods-received",
            "POST",
            data,
            true
        );
        userService.showToast(200, "Create Goods Received Successful");
        return response;
    } catch (error) {
        console.error("Fail with : ", error.message);
        userService.showToast(400, error.message);
    }

}

export const getAllProduct = async () => {
    try {
        const response = await userService.sendAjax(
            "/api/products",
            "GET",
            null,
            true
        );
        return response;

    } catch (error) {
        console.error("Fail with: ", error);
    }
}



export const getGoodReceived = async (goodsReceivedId) => {
    try {
        const response = await userService.sendAjax(
            `/api/goods-received/${goodsReceivedId}`,
            "GET",
            null,
            true
        );
        response.data.value.createdAt = formatDate(response.data.value.createdAt);
        response.data.value.updatedAt = formatDate(response.data.value.updatedAt);

        return response;
    } catch (error) {
        console.error("Fail with: ", error.message);
    }

}


export const getGoodsReceivedDetails = async (goodReceivedId) => {
    try {
        const response = await userService.sendAjax(
            `/api/goods-received-detail/${goodReceivedId}/details`,
            "GET",
            null,
            true
        );
        response.data.value = response.data.value.map(pre => ({
            ...pre,
            createdAt: formatDate(pre.createdAt),
            updatedAt: formatDate(pre.updatedAt)
        }))
        console.log("check details: ", response.data);

        return response;
    } catch (error) {
        console.error("Fail with: ", error);
    }

}
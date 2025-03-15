import UserService from "../../../hooks/services/UserService"
import { formatVietnameseCurrency } from "../schemas/ProductAtStoreSchemas";
import { sProductAtStore } from "./ProductAtStoreSignify";

const userService = new UserService();

export const getAllProductAtGarage = async (garageId, params) => {
    try {
        const queryString = Object.keys(params)
            .filter(key => params[key])
            .map(key => `${key}=${encodeURIComponent(params[key])}`)
            .join("&");

        const url = `/api/products/warehouse/${garageId}${queryString ? `?${queryString}` : ""}`;

        const response = await userService.sendAjax(
            url,
            "GET",
            null,
            true
        );

        response.data.value = response.data.value.map((pre) => ({
            ...pre,
            productPrice: formatVietnameseCurrency(pre.productPrice)
        }));

        return response;

    } catch (error) {

    }

}

export const getAllStore = async () => {
    try {
        const response = await userService.sendAjax(
            "/api/workplaces?WorkplaceType=Garage",
            "GET",
            null,
            true
        );
        return response;
    } catch (error) {
        console.error("Fail with: ", error);
    }
}


export const getProductDetails = async (productId) => {
    try {
        const response = await userService.sendAjax(
            `/api/products/product/${productId}`,
            "GET",
            null,
            true
        );
        response.data.value.productPrice = formatVietnameseCurrency(response.data.value.productPrice);
        return response;
    } catch (error) {
        console.error("Error with: ", error);
    }
}

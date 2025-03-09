import UserService from "../../../hooks/services/UserService"
import { sInvoiceService } from "./InvoiceServiceSignify"

const userService = new UserService();

export const getAllInvoiceService = async (PageNumber = 1) => {
    try {
        const response = await userService.sendAjax(
            `/api/invoice-service?PageNumber=${PageNumber}`,
            "GET",
            null,
            true
        );
        userService.showToast(200, "Loading list invoice service successful");
        return response
    } catch (error) {
        console.error("Error with: ", error.message);
    }

}

export const searchInvoiceService = async (params) => {
    try {

        const queryString = Object.keys(params)
            .filter(key => params[key])
            .map(key => `${key}=${encodeURIComponent(params[key])}`)
            .join("&");

        const response = await userService.sendAjax(
            `/api/invoice-serivce?${queryString}`,
            "GET",
            null,
            true
        );
        return response;
    } catch (error) {
        console.error("Fail to searching invoice service", error.message);
    }
}



export const createInvoiceService = async (data) => {
    try {
        const response = await userService.sendAjax(
            "/api/invocie-service",
            "POST",
            data,
            true
        );
        userService.showToast(200, "Create Invoice Service Successful");
        return response;
    } catch (error) {
        userService.showToast(400, "Create Invoice Service Fail");
        console.error("Fail to searching Invoice Service", error.message);
    }
}



export const updateInvoiceService = async (invoiceServiceID, updatedData) => {
    try {
        const response = await userService.sendAjax(
            `/api/invoice-service${invoiceServiceID}`,
            "PUT",
            updatedData,
            true
        );
        userService.showToast(200, "Updated Invoice Service Successful");
        return response;
    } catch (error) {
        userService.showToast(400, "Updated Invoice Service Fail");
        console.error("Fail to searching Invoice Service ", error.message);
    }
}
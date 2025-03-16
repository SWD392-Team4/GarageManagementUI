import UserService from "../../../hooks/services/UserService"


const userService = new UserService();

export const getAllInvoiceSale = async (PageNumber = 1) => {
    try {
        const response = await userService.sendAjax(
            `/api/invoices-sale?PageNumber=${PageNumber}`,
            "GET",
            null,
            true
        );
        return response;
    } catch (error) {
        console.error("Error with: ", error.message);
    }
}


export const searchInvoiceSale = async (params) => {
    try {

        const queryString = Object.keys(params)
            .filter(key => params[key])
            .map(key => `${key}=${encodeURIComponent(params[key])}`)
            .join("&");

        const response = await userService.sendAjax(
            `/api/invoices-sale?${queryString}`,
            "GET",
            null,
            true
        );
        return response;
    } catch (error) {
        console.error("Fail to searching Goods Issued", error.message);
    }
}



export const createInvoiceSale = async (data) => {
    try {
        const response = await userService.sendAjax(
            "/api/invoices",
            "POST",
            data,
            true
        );
        userService.showToast(200, "Create Goods Issued Successful");
        return response;
    } catch (error) {
        userService.showToast(400, error.message);
        console.error("Fail to searching Goods Issued", error.message);
    }
}



export const updateInvoiceSale = async (invoiceSaleId, updatedData) => {
    try {
        const response = await userService.sendAjax(
            `/api/invoices-sale${invoiceSaleId}`,
            "PUT",
            updatedData,
            true
        );
        userService.showToast(200, "Updated Invoice Sale Successful");
        return response;
    } catch (error) {
        userService.showToast(400, "Updated Invoice Sale Fail");
        console.error("Fail to searching Invoice Sale ", error.message);
    }
}

export const getProductAtStore = async (data) => {
    try {
        const response = await userService.sendAjax(
            "/api/product-at-garages/garage",
            "GET",
            null,
            data
        );
        return response;
    } catch (error) {
        userService.showToast(400, error.message);
        console.error("Fail with: ", error.message);

    }
}


import UserService from "../../../hooks/services/UserService"

const userService = new UserService();

export const getAllGoodsIssued = async (PageNumber = 1) => {
    try {
        const response = await userService.sendAjax(
            `/api/goods-issued?PageNumber=${PageNumber}`,
            "GET",
            null,
            true
        );
        return response;
    } catch (error) {
        console.error("Fail to loading Goods Issued", error.message);
    }
}

export const searchGoodsIssued = async (params) => {
    try {

        const queryString = Object.keys(params)
            .filter(key => params[key])
            .map(key => `${key}=${encodeURIComponent(params[key])}`)
            .join("&");

        const response = await userService.sendAjax(
            `/api/goods-issued?${queryString}`,
            "GET",
            null,
            true
        );
        return response;
    } catch (error) {
        console.error("Fail to searching Goods Issued", error.message);
    }
}

export const createGoodsIssue = async (data) => {
    try {
        const response = await userService.sendAjax(
            "/api/goods-issued",
            "POST",
            data,
            true
        );
        userService.showToast(200, "Create Goods Issued Successful");
        return response;
    } catch (error) {
        userService.showToast(400, "Create Goods Issued Fail");
        console.error("Fail to searching Goods Issued", error.message);
    }
}

export const updateGoodsIssue = async (goodsIssuedId, updatedData) => {
    try {
        const response = await userService.sendAjax(
            `/api/goods-issued${goodsIssuedId}`,
            "PUT",
            updatedData,
            true
        );
        userService.showToast(200, "Updated Goods Issued Successful");
        return response;
    } catch (error) {
        userService.showToast(400, "Updated Goods Issued Fail");
        console.error("Fail to searching Goods Issued", error.message);
    }
}

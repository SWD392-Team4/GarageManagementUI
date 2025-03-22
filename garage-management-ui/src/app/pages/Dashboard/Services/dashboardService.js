import UserService from "../../../hooks/services/UserService"

const userService = new UserService();


export const getDashBoardPackageYear = async (year) => {
    try {
        const response = userService.sendAjax(
            `/api/dashboard/package/${year}`,
            "GET",
            null,
            true
        );
        return response;
    } catch (error) {
        console.error("Error with: ");
    }
}

export const getDashBoardServiceYear = async (year) => {
    try {
        const response = await userService.sendAjax(
            `/api/dashboard/service/${year}`,
            "GET",
            null,
            true
        );
        return response;

    } catch (error) {
        console.error("Fail with: ", error.message);
    }
}

export const getDashBoardAppointmentYear = async (year) => {
    try {
        const response = await userService.sendAjax(
            `/api/dashboard/appointment/${year}`,
            "GET",
            null,
            true
        );
        return response
    } catch (error) {
        console.error("Fail with: ", error.message)
    }
}

export const getDashBoardCustomer = async (year) => {
    try {
        const response = await userService.sendAjax(
            `/api/dashboard/customers/${year}`,
            "GET",
            null,
            true
        );

        return response;
    } catch (error) {
        console.error("Fail with: ", error.message);
    }
}

export const getDashBoardSale = async (year) => {
    try {
        const response = await userService.sendAjax(
            `/api/dashboard/sales/${year}`
        );
        return response;
    } catch (error) {
        console.error("Fail with: ", error.message);
    }
}

export const getDashBoardLowStockProduct = async (lowStockProduct) => {
    try {
        const response = await userService.sendAjax(
            `/api/dashboard/LowStockProduct/${lowStockProduct}`,
            "GET",
            null,
            true
        );

        return response;
    } catch (error) {
        console.error("Fail with: ", error.message);
    }
}

export const getGoodReceivedByDate = async () => {
    try {
        const response = await userService.sendAjax(
            `/api/dashboard/goodsReceivedByDate?`,
            "GET",
            null,
            true
        );
        return response;
    } catch (error) {
        console.error("Fail with: ", error.nessage);
    }
}

export const getGoodsIssuedByDate = async () => {
    try {
        const response = await userService.sendAjax(
            `/api/dashboard/goodsIssuedByDate`,
            "GET",
            null,
            true
        );
        return response;
    } catch (error) {
        console.error("Fail with: ", error.message);
    }
}
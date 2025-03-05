import UserService from "../../../hooks/services/UserService";
import { formatDate } from "../schemas/SupplierValid";

const userService = new UserService();

export const getAllSupplier = async (PageNumber = 1) => {
    try {
        const response = await userService.sendAjax(
            `/api/suppliers?PageNumber=${PageNumber}`,
            "GET",
            null,
            true
        );
        if (response != null) {
            if (response.data?.value) {
                response.data.value = response.data.value.map((suppliers) => ({
                    ...suppliers,
                    createdAt: formatDate(suppliers.createdAt),
                    updatedAt: formatDate(suppliers.updatedAt),
                }));
            }
            return response;
        } else {
            console.error(`Error: Received status ${response.error}`);
            return [];
        }
    } catch (error) {
        console.error("Error fetching suppliers: ", error);
        return [];
    }
};

export const SearchSupplier = async (params) => {
    try {
        const queryString = Object.keys(params)
            .filter(key => params[key])
            .map(key => `${key}=${encodeURIComponent(params[key])}`)
            .join("&");

        const response = await userService.sendAjax(
            `/api/suppliers?${queryString}`,
            "GET",
            null,
            true
        );

        if (response.status == 200) {
            response.data.value = response.data.value.map(suppliers => ({
                ...suppliers,
                createdAt: formatDate(suppliers.createdAt),
                updatedAt: formatDate(suppliers.updatedAt)
            }))
            userService.showToast(200, "Searching suppliers successful")
            return response;
        } else {
            userService.showToast(400, "Searching suppliers fail")
            return null;
        }
    } catch (error) {
        console.error("Fail to searching: ", error.message);
    }
}

export const creatSupplier = async (supplierData) => {
    try {
        const response = await userService.sendAjax(
            "/api/suppliers",
            "POST",
            supplierData,
            true);
        //clear signify

        //format
        response.data.value.createdAt = formatDate(response.data.value.createdAt)
        response.data.value.updatedAt = formatDate(response.data.value.updatedAt)
        // response.data.value.brandName = <>{response.data.value.brandName}<span className="font-semibold text-green-500"> - Recently Created</span> </>

        //gan signify
        // sBrand.set(response.data.value);
        //return
        userService.showToast(200, "Supplier created successfully");
        return response;
    } catch (error) {
        console.error("Error creating brand:", error);
        userService.showToast(400, "Error creating Supplier");
        throw error;
    }
}
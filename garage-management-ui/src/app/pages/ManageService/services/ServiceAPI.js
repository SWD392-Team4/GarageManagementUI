import UserService from "../../../hooks/services/UserService"
import { sService } from "./ServiceSignify"

const userService = new UserService();

export const getAllService = async (PageNumber = 1) => {
    try {
        const response = await userService.sendAjax(
            `/api/services?PageNumber=${PageNumber}&PageSize=10`,
            "GET",
            null,
            true
        );


        if (response.data.value != null) {
            userService.showToast(200, "Loading List Service Successful");
            return response;
        } else {
            userService.showToast(404, "Loading List Service Fail")
            console.error("Error To Loading List Service", response.message);
        }

    } catch (error) {
        console.error("Error to loading service", error.message);
    }
}

export const searchService = async (params) => {
    try {
        //tách params
        const queryString = Object.keys(params)
            .filter(key => params[key])
            .map(key => `${key}=${encodeURIComponent(params[key])}`)
            .join("&");

        const response = await userService.sendAjax(
            `/api/services?${queryString}`,
            "GET",
            null,
            true
        );
        if (response.data.value != null) {
            userService.showToast(200, "Search List Service Successful");
            return response;
        } else {
            userService.showToast(400, "Search List Service Fail");
            return null;
        }

    } catch (error) {
        console.error("Fail to searching: ", error.message);
    }
}

export const createService = async (data, formData) => {
    try {
        const response = await userService.sendAjax(
            "/api/services",
            "POST",
            data,
            true
        );
        if (formData) {
            await createServiceImage(response.data.id, formData);
        }
        userService.showToast(200, "Create Service Successful");
        return response;

    } catch (error) {
        console.log("Fail to create service: ", error.message);
        userService.showToast(400, "Create Service Fail", error.description);
    }
}

export const createServiceImage = async (serviceId, FormData) => {
    try {
        const response = await userService.sendAjax(
            `/api/services/${serviceId}/images`,
            "POST",
            FormData,
            true,
            true
        );
        return response;

    } catch (error) {
        console.log("Error: ", error.message);
    }
}

export const getServiceDetails = async (serviceId) => {
    try {
        const response = await userService.sendAjax(
            `/api/services/${serviceId}`,
            "GET",
            null,
            true
        );
        if (response.status == 200) {
            userService.showToast(200, "Loading service detail successful");
            return response.data.value;
        } else {
            userService.showToast(400, "Loading service detail fail");
            return null;
        }

    } catch (error) {
        console.error("Loading Service Details fail");
    }
}


export const updateService = async (serviceId, updateData) => {
    try {
        const response = await userService.sendAjax(
            `/api/services/${serviceId}`,
            "PUT",
            updateData,
            true
        );
        if (response.status == 200) {
            userService.showToast(200, "Updated Service Successful");
            return response;
        } else {
            userService.showToast(400, "Updated Service Fail");
            return null;
        }

    } catch (error) {
        console.error("Fail to updated service: ", error.message);
    }

}

export const getCarCategory = async () => {
    try {
        const response = await userService.sendAjax(
            "/api/car-categories",
            "GET",
            null,
            true,
        );
        if (response.data.value != null) {
            return response.data.value;
        } else {
            return null;
        }


    } catch (error) {
        console.error("Fail to load car categories: ", error.message)
    }

}

export const getCarPart = async () => {
    try {
        const response = await userService.sendAjax(
            "/api/car-parts?Fields=Id%2C%20PartName",
            "GET",
            null,
            true,
        );

        if (response.data.value != null) {
            return response.data.value;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Fail to loading Car Part: ", error.message);
    }
}
import UserService from "../../../hooks/services/UserService"
import { formatVietnameseCurrency } from "../../ManagePackageService/schemas/PackageServiceSchemas";
import { formatDateForFeedBack } from "../schemas/ServiceSchemas";
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
        response.data.value = response.data.value.map(pre => ({
            ...pre,
            price: formatVietnameseCurrency(pre.price)
        }))


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
        response.data.value = response.data.value.map(pre => ({
            ...pre,
            price: formatVietnameseCurrency(pre.price)
        }))

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
            await createServiceImage(response.data.value.id, formData);
        }

        //clear signify
        sService.set((pre) => ([
            pre.value.id = "",
            pre.value.serviceName = "",
            pre.value.serviceCategory = "",
            pre.value.partName = "",
            pre.value.category = "",
            pre.value.price = "",
            pre.value.workNature = "",
            pre.value.action = "",
            pre.value.estimatedHours = "",
            pre.value.status = "",
        ]))
        //parse thong tin
        response.data.value.price = formatVietnameseCurrency(response.data.value.price);
        //set thong tin signify
        sService.set(response.data.value);

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

        response.data.value.price = formatVietnameseCurrency(response.data.value.price);

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
        //clear signify
        sService.set((pre) => ([
            pre.value.id = "",
            pre.value.serviceName = "",
            pre.value.serviceCategory = "",
            pre.value.partName = "",
            pre.value.category = "",
            pre.value.price = "",
            pre.value.workNature = "",
            pre.value.action = "",
            pre.value.estimatedHours = "",
            pre.value.status = "",
        ]))
        //parse thong tin xiu
        updateData.servicePrice = parseInt(updateData.servicePrice);
        updateData.servicePrice = formatVietnameseCurrency(updateData.servicePrice);

        //gan siginify
        sService.set((pre) => ([
            pre.value.id = serviceId,
            pre.value.serviceName = updateData.serviceName,
            pre.value.serviceCategory = updateData.serviceCategory,
            pre.value.carPart = updateData.carPartName,
            pre.value.carCategory = updateData.carCategoryName,
            pre.value.price = updateData.servicePrice,
            pre.value.workNature = updateData.workNature,
            pre.value.action = updateData.action,
            pre.value.estimatedHours = updateData.estimatedHours,
            pre.value.status = updateData.status,
        ]))

        userService.showToast(200, "Updated Service Successful");
        return response;

    } catch (error) {
        console.error("Fail to updated service: ", error.message);
    }

}

export const getCarCategory = async () => {
    try {
        const response = await userService.sendAjax(
            "/api/car-categories?PageSize=50&Fields=id%2C%20category",
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

export const getFeedbackByServiceId = async (serviceId) => {
    try {
        const response = await userService.sendAjax(
            `/api/services/feebacks/service/${serviceId}`,
            "GET",
            null,
            true
        );
        response.data.value = response.data.value.map((pre) => ({
            ...pre,
            createdAt: formatDateForFeedBack(pre.createdAt),
            updatedAt: formatDateForFeedBack(pre.updatedAt)
        }));



        userService.showToast(200, "Loading Feedback successful");
        return response
    } catch (error) {
        console.error("Fail with: ", error);
    }

}
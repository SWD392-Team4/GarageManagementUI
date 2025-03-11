import UserService from "../../../hooks/services/UserService"
import { formatDate } from "../schemas/PackageSchemas";


const userService = new UserService()


export const getAllPackageService = async () => {
    try {
        const response = await userService.sendAjax(
            "/api/packages",
            "GET",
            null,
            false
        );

        response.data.value = response.data.value.map(pre => ({
            ...pre,
            createdAt: formatDate(pre.createdAt),
            updatedAt: formatDate(pre.updatedAt),
        }));


        userService.showToast(200, "Loading Package Service Successful");
        return response
    } catch (error) {
        userService.showToast(400, "Loading Package Service Fail");
        console.error("Fail with: ", error);
    }
}

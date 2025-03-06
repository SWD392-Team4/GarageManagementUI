import UserService from "../../../hooks/services/UserService"
import { formatDate } from "../schemas/EmployeeValid";

const userService = new UserService();

export const getAllEmployee = async (PageNumber = 1) => {
    try {
        const response = await userService.sendAjax(
            `/api/users/employees?PageNumber=${PageNumber}`,
            "GET",
            null,
            true
        );

        if (response.status == 200) {
            response.data.value = response.data.value.map(employee => ({
                ...employee,
                createdAt: formatDate(employee.createdAt),
                updatedAt: formatDate(employee.updatedAt)
            }))

            userService.showToast(200, "Loading employee list succesful");
            return response;
        } else {
            userService.showToast(400, "Loading employee list fail");
            return null;
        }
    } catch (error) {
        console.error("Fail to loading employees", error.message);
    }
}

export const searchEmployee = async (params) => {
    try {
        const queryString = Object.keys(params)
            .filter(key => params[key])
            .map(key => `${key}=${encodeURIComponent(params[key])}`)
            .join("&");

        const response = await userService.sendAjax(
            `/api/users/employees?${queryString}`,
            "GET",
            null,
            true,
        );
        if (response.status == 200) {
            response.data.value = response.data.value.map(employee => ({
                ...employee,
                createdAt: formatDate(employee.createdAt),
                updatedAt: formatDate(employee.updatedAt)
            }))
            return response;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Fail to searching employees", error.message);
    }
}

export const getEmployeeDetail = async (employeeId) => {
    try {
        const response = await userService.sendAjax(
            `/api/users/employees/${employeeId}`,
            "GET",
            null,
            true
        );
        //xu ly thong tin
        if (response.status == 200) {
            userService.showToast(200, "Loading Employee Successful");
            return response;
        } else {
            userService.showToast(400, "Loading Employee Fail");
            return null;
        }

    } catch (error) {
        console.error("Fail to loading Employee");
    }
}

export const updateEmployeeDetal = async (employeeId, updateData) => {
    try {
        const response = await userService.sendAjax(
            `/api/users/employees${employeeId}`,
            "PUT",
            updateData,
            true
        );
        if (response.status == 200) {
            userService.showToast(200, "Updated Employee Information Successful");
            return response;
        } else {
            userService.showToast(400, "Updated Employee Information Fail");
            return null;
        }

    } catch (error) {
        console.error("Fail to update employee: ", error.message);
    }
}

export const createEmployee = async (employeeData) => {
    try {
        const response = await userService.sendAjax(
            "/api/auth/register-employee",
            "POST",
            employeeData,
            true,
        );
        userService.showToast(200, "Created Employee Succesful");
        return response;


    } catch (error) {
        userService.showToast(400, "Created Employee Fail");
        console.error("Fail to create employee");
    }
}

export const getWorkPlace = async () => {
    try {
        const response = await userService.sendAjax(
            "/api/workplaces?Fields=id%2C%20name",
            "GET",
            null,
            true,
        );

        if (response.status == 200) {
            return response.data.value;
        } else {
            console.error("Fail to loading work place");
            return null;
        }

    } catch (error) {
        console.error("Fail to loading Work Place");
    }
}
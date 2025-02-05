import UserService from "../../../hooks/services/UserService";

const userService = new UserService();

export const resetPassword = async (email) => {
  return await userService.sendAjax("/reset", "POST", { email }, false);
};

export const registerUser = async (email, password) => {
  return await userService.sendAjax(
    "/register",
    "POST",
    { email, password },
    false
  );
};

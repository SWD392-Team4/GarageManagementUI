import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import UserService from "../../../hooks/services/UserService";

export const useHandleLogout = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("bttnSignIn");
  const userService = new UserService();

  const handleLogout = () => {
    localStorage.clear();
    userService.showToast(200, t("title4"));
    navigate(userService.navigateBasedOnRole());
  };

  return handleLogout;
};

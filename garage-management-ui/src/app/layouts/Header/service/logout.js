import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import UserService from "../../../hooks/services/UserService";
import { useLoading } from "../../../routers/LoadingContext";

export const useHandleLogout = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("bttnSignIn");
  const userService = new UserService();
  const { setLoading } = useLoading();

  const handleLogout = () => {
    setLoading(true);
    localStorage.clear();
    userService.showToast(200, t("title4"));
    navigate(userService.navigateBasedOnRole());
  };

  return handleLogout;
};

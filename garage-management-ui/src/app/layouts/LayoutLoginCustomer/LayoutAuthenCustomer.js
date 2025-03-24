import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import UserService from "../../hooks/services/UserService";
import { sAccount } from "../../pages/AuthCustomer/services/store";
import Footer from "../../pages/Home/partials/Footer/Footer";
import Header from "../Header/Header";

export default function LayoutAuthenCustomer() {
  const useService = new UserService();
  const navigate = useNavigate();

  useEffect(() => {
    if (sAccount.value) {
      const targetRoute = useService.navigateBasedOnRole();
      console.log("sAccount.value.role: ", sAccount.value.role, targetRoute);
      navigate(targetRoute);
    }
  }, [sAccount.value, navigate, useService]);

  return (
    <div>
      <Header />

      <Outlet></Outlet>

      <Footer />
    </div>
  );
}

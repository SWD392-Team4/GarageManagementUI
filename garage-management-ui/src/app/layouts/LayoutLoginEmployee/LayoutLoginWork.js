import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import backgroundImage from "../../assets/auth/1.jpg"; // Adjust the path as needed
import { sAccount } from "../../pages/AuthCustomer/services/store";
import UserService from "../../hooks/services/UserService";

export default function LayoutLoginWork() {
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
    <section
      className="relative flex items-center justify-center bg-cover bg-center min-h-screen"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="container mx-auto relative z-10">
        <Outlet />
      </div>
    </section>
  );
}

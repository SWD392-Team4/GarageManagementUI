import { sAccount } from "../../pages/AuthCustomer/services/store";

import { Navigate, Outlet } from "react-router-dom";
import LayoutAdminHome from "../LayoutAdminHome/LayoutAdminHome";
import LayoutCashier from "../LayoutCashier/LayoutCashier";
import LayoutMechanic from "../LayoutMechanic/LayoutMechanic";

const DynamicLayout = () => {
  // Xác định layout theo role
  let LayoutComponent;
  switch (sAccount.value.role) {
    case "Administrator":
      LayoutComponent = LayoutAdminHome;
      break;
    case "Cashier":
      LayoutComponent = LayoutCashier;
      break;
    case "Mechanic":
      LayoutComponent = LayoutMechanic;
      break;
    default:
      return <Navigate to="/authen" replace />;
  }

  return (
    <LayoutComponent>
      <Outlet />
    </LayoutComponent>
  );
};

export default DynamicLayout;

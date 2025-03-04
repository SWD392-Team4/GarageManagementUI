import React, { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import routesConfig from "./routes.json";
import LoaddingPage from "../layouts/LoadingPage";
import RedirectRoute from "./RedirectRoute";
import LoaddingPage2 from "../layouts/LoadingPage/index2";

const componentMap = {
  PageNotFound: lazy(() => import("../layouts/PageNotFound")),
  Home: lazy(() => import("../pages/Home")),
  LayoutHome: lazy(() => import("../layouts/LayoutHome")),
  LookUpPage: lazy(() => import("../pages/LookUpPage/LookUpPage")),
  LayoutAuthenCustomer: lazy(() =>
    import("../layouts/LayoutLoginCustomer/LayoutAuthenCustomer")
  ),
  Mision: lazy(() => import("../pages/AboutUs/partials/Mision")),
  History: lazy(() => import("../pages/AboutUs/partials/History")),
  Vision: lazy(() => import("../pages/AboutUs/partials/Vision")),
  LoginPage: lazy(() => import("../pages/AuthCustomer/LoginPage")),
  Chat: lazy(() => import("../pages/Chat/Chat")),
  RegisterPage: lazy(() => import("../pages/AuthCustomer/RegisterPage")),
  ConfirmEmailPage: lazy(() =>
    import("../pages/AuthCustomer/ConfirmEmailPage")
  ),
  ForgetPass: lazy(() => import("../pages/AuthCustomer/ForgetPass")),
  ConfirmResetPassword: lazy(() =>
    import("../pages/AuthCustomer/ConfirmResetPassword")
  ),
  LayoutLoginWork: lazy(() =>
    import("../layouts/LayoutLoginEmployee/LayoutLoginWork")
  ),
  ServicesSection: lazy(() => import("../pages/Services/ServicesSection")),
  ServiceCategory: lazy(() => import("../pages/Services/ServiceCategory")),
  SignIn: lazy(() => import("../pages/AuthEmployee/partials/LoginPage")),
  ResetPasswordWorker: lazy(() =>
    import("../pages/AuthEmployee/partials/ResetPassword")
  ),
  AboutUs: lazy(() => import("../pages/AboutUs/partials/AboutUs")),

  LogOut: lazy(() => import("../pages/AuthEmployee/partials/LogOut")),
  LayoutCustomer: lazy(() =>
    import("../layouts/LayoutCustomer/LayoutCustomer")
  ),
  CustomerProfile: lazy(() =>
    import("../pages/CustomerProfile/CustomerProfile")
  ),
  OrderHistory: lazy(() => import("../pages/OrderHistory/OrderHistory")),
  LayoutAdminHome: lazy(() =>
    import("../layouts/LayoutAdminHome/LayoutAdminHome")
  ),
  AdminProfile: lazy(() => import("../pages/AdminProfile/AdminProfile")),
  Dashboard: lazy(() => import("../pages/Dashboard/index")),
  ManageAccount: lazy(() => import("../pages/ManageAccount/ManageAccount")),
  AccountDetails: lazy(() => import("../pages/ManageAccount/AccountDetails")),
  ManageProduct: lazy(() => import("../pages/ManageProduct/ManageProduct")),
  CreateProduct: lazy(() => import("../pages/ManageProduct/CreateProduct")),
  ProductDetails: lazy(() => import("../pages/ManageProduct/ProductDetails")),
  ManageBrand: lazy(() => import("../pages/ManageBrand/ManageBrand")),
  ManageService: lazy(() => import("../pages/ManageService/ManageService")),
  CreateServicePage: lazy(() =>
    import("../pages/ManageService/CreateServicePage")
  ),
  ManageCateProduct: lazy(() =>
    import("../pages/ManageCateProduct/ManageCateProduct")
  ),
  ManageCarPart: lazy(() => import("../pages/ManageCarPart/ManageCarPart")),
  ManageCarCategory: lazy(() =>
    import("../pages/ManageCarCategory/ManageCarCategory")
  ),

  MechanicDashboard: lazy(() =>
    import("../pages/MechanicManageAppoinment/partial/MechanicDashboard")
  ),
  AppoinmentList: lazy(() =>
    import("../pages/MechanicManageAppoinment/partial/AppoinmentList")
  ),
  MechanicManageAppointment: lazy(() =>
    import("../pages/MechanicManageAppoinment/index")
  ),

  ManageCarModal: lazy(() => import("../pages/ManageCarModal/ManageCarModal")),
  ManageCateProduct: lazy(() =>
    import("../pages/ManageCateProduct/ManageCateProduct")
  ),
  ManageBooking: lazy(() => import("../pages/ManageBooking/ManageBooking")),
  LayoutAppointment: lazy(() =>
    import("../pages/AdminManageAppoinment/LayoutAppointment")
  ),
  appointmentDetail: lazy(() =>
    import("../pages/AdminManageAppoinment/partials/appointmentDetail")
  ),

  AllAppointment: lazy(() =>
    import("../pages/AdminManageAppoinment/partials/AllAppointment")
  ),
  Canceled: lazy(() =>
    import("../pages/AdminManageAppoinment/partials/Canceled")
  ),
  Completed: lazy(() =>
    import("../pages/AdminManageAppoinment/partials/Completed")
  ),
  InProgess: lazy(() =>
    import("../pages/AdminManageAppoinment/partials/InProgess")
  ),
  Waiting: lazy(() =>
    import("../pages/AdminManageAppoinment/partials/Waiting")
  ),

  CustomerProductPage: lazy(() =>
    import("../pages/CustomerProduct/CustomerProductPage")
  ),
  CustomerProductDetail: lazy(() =>
    import("../pages/CustomerProduct/CustomerProductDetail")
  ),
};
const generateRoutes = (routes) => {
  return routes.map((route, index) => {
    const Element = componentMap[route.element];

    if (!Element) return null;

    let element = <Element />;

    // Bọc `Suspense` nếu có `isSuspense: true`
    if (route.isSuspense) {
      element = <Suspense fallback={<LoaddingPage />}>{element}</Suspense>;
    }
    if (route.isSuspense2) {
      element = <Suspense fallback={<LoaddingPage2 />}>{element}</Suspense>;
    }

    // Bọc `PrivateRoute` nếu có quyền hạn
    if (route.private) {
      element = (
        <PrivateRoute allowedRoles={route.private.allowedRoles}>
          {element}
        </PrivateRoute>
      );
    }

    // Nếu là route `index`, dùng `<Route index element={...} />`
    if (route.index) {
      return <Route key={index} index element={element} />;
    }

    if (route.redirect) {
      return (
        <Route
          key={index}
          path={route.path}
          element={<RedirectRoute to={route.redirect} />}
        />
      );
    }

    return (
      <Route key={index} path={route.path} element={element}>
        {route.children && generateRoutes(route.children)}
      </Route>
    );
  });
};

export default function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>{generateRoutes(routesConfig)}</Routes>
    </BrowserRouter>
  );
}

import React, { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import routesConfig from "./routes.json";
import LoaddingPage from "../layouts/LoadingPage";
import RedirectRoute from "./RedirectRoute";
import Home from "../pages/Home";
import LayoutBookingPage from "../layouts/LayoutBooking/LayoutBookingPage";
import LoaddingPage2 from "../layouts/LoadingPage/index2";
import DynamicLayout from "../layouts/LayoutDynamic/DynamicLayout";
import LoginPage from "../pages/AuthCustomer/LoginPage";
import LayoutAuthenCustomer from "../layouts/LayoutLoginCustomer/LayoutAuthenCustomer";
import BookingOnlineComponent from "../pages/BookingPage/Partials/BookingOnlineComponent";
import PickGara from "../pages/BookingPage/Partials/PickGara";
import FormCustomer from "../pages/BookingPage/Partials/FormCustomer";
import SelectOptions from "../pages/BookingPage/Partials/SelectOptions";
import SelectService from "../pages/BookingPage/Partials/SelectService";
import PackageSelect from "../pages/BookingPage/Partials/PackageSelect";
import SuccessPage from "../pages/BookingPage/Partials/SuccessPage";
import { LoadingProvider } from "./LoadingContext";
import StepLookUp from "../pages/LookUpPage/partials/StepLookup";
import PickGarage from "../pages/LookUpPage/partials/PickGarage";
import FillingInformation from "../pages/LookUpPage/partials/FillingInformation";
import ViewAppointmentLookUp from "../pages/LookUpPage/partials/ViewAppointmentLookUp";
import ScrollToTop from "./ScrollToTop";

const componentMap = {
  PageNotFound: lazy(() => import("../layouts/PageNotFound")),
  Home: Home,
  DynamicLayout: DynamicLayout,
  SuccessPage: SuccessPage,
  SelectService: SelectService,
  SelectOptions: SelectOptions,
  PackageSelect: PackageSelect,
  PickGara: PickGara,
  FormCustomer: FormCustomer,
  BookingOnlineComponent: BookingOnlineComponent,
  LayoutHome: lazy(() => import("../layouts/LayoutHome")),
  LayoutAuthenCustomer: LayoutAuthenCustomer,
  LayoutBookingPage: LayoutBookingPage,
  StepLookUp: StepLookUp,
  PickGarage: PickGarage,
  FillingInformation: FillingInformation,
  ViewAppointmentLookUp: ViewAppointmentLookUp,
  LayoutMechanic: lazy(() =>
    import("../layouts/LayoutMechanic/LayoutMechanic")
  ),
  LayoutWareHouse: lazy(() =>
    import("../layouts/LayoutWareHouse/LayoutWareHouse")
  ),
  LayoutCashier: lazy(() => import("../layouts/LayoutCashier/LayoutCashier")),
  ServiceDetails: lazy(() =>
    import("../pages/Services/partials/ServiceDetails")
  ),

  CreateAppointment: lazy(() =>
    import("../pages/AdminManageAppoinment/CreateAppointment")
  ),
  Mission: lazy(() => import("../pages/AboutUs/partials/Mission")),
  History: lazy(() => import("../pages/AboutUs/partials/History")),
  Vision: lazy(() => import("../pages/AboutUs/partials/Vision")),
  LoginPage: LoginPage,
  Chat: lazy(() => import("../pages/Chat/Chat")),
  Chat2: lazy(() => import("../pages/Chat/Chat2")),
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
  AboutUs: lazy(() => import("../pages/AboutUs/AboutUs")),

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

  ManageEmployee: lazy(() => import("../pages/ManageEmployee/ManageEmployee")),
  ManageSupplier: lazy(() => import("../pages/ManageSupplier/ManageSupplier")),
  ManageSupplierContact: lazy(() =>
    import("../pages/ManageSupplierContact/ManageSupplierContact")
  ),
  ProductAtWareHouse: lazy(() =>
    import("../pages/ProductAtWareHouse/ProductAtWareHouse")
  ),
  ProductAtStore: lazy(() => import("../pages/ProductAtStore/ProductAtStore")),
  ManageProduct: lazy(() => import("../pages/ManageProduct/ManageProduct")),
  CreateProduct: lazy(() => import("../pages/ManageProduct/CreateProduct")),
  ProductDetails: lazy(() => import("../pages/ManageProduct/ProductDetails")),
  ManageBrand: lazy(() => import("../pages/ManageBrand/ManageBrand")),
  ManageService: lazy(() => import("../pages/ManageService/ManageService")),
  ManageGoodsIssued: lazy(() =>
    import("../pages/ManageGoodsIssued/ManageGoodsIssued")
  ),
  CreateGoodsIssued: lazy(() =>
    import("../pages/ManageGoodsIssued/CreateGoodsIssued")
  ),
  ManageInvoiceSale: lazy(() =>
    import("../pages/ManageInvoiceSale/ManageInvoiceSale")
  ),
  CreateInvoiceSale: lazy(() =>
    import("../pages/ManageInvoiceSale/CreateInvoiceSale")
  ),
  ManageInvoiceService: lazy(() =>
    import("../pages/ManageInvoiceService/ManageInvoiceService")
  ),
  CreateInvoiceService: lazy(() =>
    import("../pages/ManageInvoiceService/CreateInvoiceService")
  ),
  ManageGoodReceived: lazy(() =>
    import("../pages/ManageGoodReceived/ManageGoodReceived")
  ),
  CreateGoodReceived: lazy(() =>
    import("../pages/ManageGoodReceived/CreateGoodReceived")
  ),
  ViewGoodReceived: lazy(() =>
    import("../pages/ManageGoodReceived/ViewGoodReceived")
  ),
  ManagePackageService: lazy(() =>
    import("../pages/ManagePackageService/ManagePackageService")
  ),
  CreatePackageServicePage: lazy(() =>
    import("../pages/ManagePackageService/CreatePackageServicePage")
  ),
  ViewPackageServicePage: lazy(() =>
    import("../pages/ManagePackageService/ViewPackageServicePage")
  ),
  ManageGoodsIssued: lazy(() =>
    import("../pages/ManageGoodsIssued/ManageGoodsIssued")
  ),
  CreateGoodsIssued: lazy(() =>
    import("../pages/ManageGoodsIssued/CreateGoodsIssued")
  ),
  ManageGoodsIssued: lazy(() =>
    import("../pages/ManageGoodsIssued/ManageGoodsIssued")
  ),
  ViewGoodsIssued: lazy(() =>
    import("../pages/ManageGoodsIssued/ViewGoodsIssued")
  ),
  ManageInvoiceSale: lazy(() =>
    import("../pages/ManageInvoiceSale/ManageInvoiceSale")
  ),
  CreateInvoiceSale: lazy(() =>
    import("../pages/ManageInvoiceSale/CreateInvoiceSale")
  ),
  ManageInvoiceService: lazy(() =>
    import("../pages/ManageInvoiceService/ManageInvoiceService")
  ),
  CreateInvoiceService: lazy(() =>
    import("../pages/ManageInvoiceService/CreateInvoiceService")
  ),
  ManageCarPartCate: lazy(() =>
    import("../pages/ManageCarPartCate/ManageCarPartCate")
  ),
  UpdateServicePage: lazy(() =>
    import("../pages/ManageService/UpdateServicePage")
  ),
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
  Arrival: lazy(() =>
    import("../pages/AdminManageAppoinment/partials/Arrival")
  ),
  Approved: lazy(() =>
    import("../pages/AdminManageAppoinment/partials/Approved")
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
  CustomerPackageList: lazy(() =>
    import("../pages/CustomerPackage/CustomerPackageList")
  ),
  CustomerPackageDetail: lazy(() =>
    import("../pages/CustomerPackage/CustomerPackageDetail")
  ),
  ManageCustomer: lazy(() => import("../pages/ManageCustomer/ManageCustomer")),
  CustomerDetails: lazy(() =>
    import("../pages/ManageCustomer/CustomerDetails")
  ),
  PackageRegister: lazy(() =>
    import("../pages/PackageRegister/PackageRegister")
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
      <LoadingProvider>
        <ScrollToTop />
        <Routes>{generateRoutes(routesConfig)}</Routes>
      </LoadingProvider>
    </BrowserRouter>
  );
}

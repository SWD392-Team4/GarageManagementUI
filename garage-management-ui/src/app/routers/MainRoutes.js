import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageNotFound from "../layouts/PageNotFound";
import Home from "../pages/Home";
import LayoutHome from "../layouts/LayoutHome";
import LoaddingPage from "../layouts/LoadingPage";
import LayoutLoginWork from "../layouts/LayoutLoginEmployee/LayoutLoginWork";
import SignIn from "../pages/AuthEmployee/partials/LoginPage";
import ResetPasswordWorker from "../pages/AuthEmployee/partials/ResetPassword";
import LogOut from "../pages/AuthEmployee/partials/LogOut";
import LayoutAuthenCustomer from "../layouts/LayoutLoginCustomer/LayoutAuthenCustomer";
import LoginPage from "../pages/AuthCustomer/LoginPage";
import AdminProfile from "../pages/AdminProfile/AdminProfile";
import LayoutAdminHome from "../layouts/LayoutAdminHome/LayoutAdminHome";
import ManageAccount from "../pages/ManageAccount/ManageAccount";
import ManageBooking from "../pages/ManageBooking/ManageBooking";
import AccountDetails from "../pages/ManageAccount/AccountDetails";
import RegisterPage from "../pages/AuthCustomer/RegisterPage";
import i18n from "../hooks/i18n/i18n";
import CustomerProfile from "../pages/CustomerProfile/CustomerProfile";
import LayoutCustomer from "../layouts/LayoutCustomer/LayoutCustomer";
import OrderHistory from "../pages/OrderHistory/OrderHistory";

const loadLanguageResources = async (namespace) => {
  await i18n.loadNamespaces([namespace]);
};

export default function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="*"
          element={
            <PageNotFound onLoad={() => loadLanguageResources("ver1")} />
          }
        ></Route>




        <Route
          path="/"
          element={<LayoutHome onLoad={() => loadLanguageResources("ver1")} />}
        >
          <Route
            index
            element={<Home onLoad={() => loadLanguageResources("ver1")} />}
          />
        </Route>


        <Route
          path="/authen"
          element={
            <LayoutAuthenCustomer
              onLoad={() => loadLanguageResources("ver1")}
            />
          }
        >
          <Route
            index
            element={<LoginPage onLoad={() => loadLanguageResources("ver1")} />}
          />
          <Route
            path="register"
            element={
              <RegisterPage onLoad={() => loadLanguageResources("ver1")} />
            }
          />
        </Route>


        {/* Profile Customer */}
        <Route
          path="/customer"
          element={
            <Suspense fallback={<LoaddingPage />}>
              {" "}
              <LayoutCustomer onLoad={() => loadLanguageResources("sidebar_customer")}  />
            </Suspense>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<LoaddingPage />}>
                {" "}
                <CustomerProfile onLoad={() => loadLanguageResources("customer_profile")} />
              </Suspense>
            }
          />

          <Route
            path="orderHistory"
            element={
              <OrderHistory onLoad={() => loadLanguageResources("order_history")} />
            }
          />

        </Route>










        <Route
          path="/worker"
          element={
            <Suspense fallback={<LoaddingPage />}>
              {" "}
              <LayoutLoginWork onLoad={() => loadLanguageResources("ver1")} />
            </Suspense>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<LoaddingPage />}>
                {" "}
                <SignIn onLoad={() => loadLanguageResources("ver1")} />
              </Suspense>
            }
          />
          <Route
            path="reset"
            element={
              <Suspense fallback={<LoaddingPage />}>
                <ResetPasswordWorker
                  onLoad={() => loadLanguageResources("ver1")}
                />
              </Suspense>
            }
          />
          <Route
            path="logout"
            element={
              <Suspense fallback={<LoaddingPage />}>
                <LogOut onLoad={() => loadLanguageResources("ver1")} />
              </Suspense>
            }
          />
        </Route>


        {/* Admin router */}
        <Route
          path="/admin"
          element={
            <Suspense fallback={<LoaddingPage />}>
              {" "}
              <LayoutAdminHome onLoad={() => loadLanguageResources("sidebar_admin")} />
            </Suspense>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<LoaddingPage />}>
                {" "}
                <AdminProfile onLoad={() => loadLanguageResources("admin_profile")} />
              </Suspense>
            }
          />

          <Route
            path="account"
            element={
              <Suspense fallback={<LoaddingPage />}>
                <ManageAccount onLoad={() => loadLanguageResources("manage_account", "base_table")} />
              </Suspense>
            }
          />

          <Route
            path="account/:id"
            element={
              <Suspense fallback={<LoaddingPage />}>
                <AccountDetails />
              </Suspense>
            }
          />

          <Route
            path="booking"
            element={
              <Suspense fallback={<LoaddingPage />}>
                <ManageBooking onLoad={() => loadLanguageResources("manage_booking", "base_table")} />
              </Suspense>
            }
          />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

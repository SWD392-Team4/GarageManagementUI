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

        <Route
          path="/admin"
          element={
            <Suspense fallback={<LoaddingPage />}>
              {" "}
              <LayoutAdminHome />
            </Suspense>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<LoaddingPage />}>
                {" "}
                <AdminProfile />
              </Suspense>
            }
          />

          <Route
            path="account"
            element={
              <Suspense fallback={<LoaddingPage />}>
                <ManageAccount />
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
                <ManageBooking />
              </Suspense>
            }
          />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

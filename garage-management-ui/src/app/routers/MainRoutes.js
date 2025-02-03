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

export default function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<PageNotFound />}></Route>
        <Route path="/" element={<LayoutHome />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/authen" element={<LayoutAuthenCustomer />}>
          <Route index element={<LoginPage />} />
        </Route>

        <Route
          path="/worker"
          element={
            <Suspense fallback={<LoaddingPage />}>
              {" "}
              <LayoutLoginWork />
            </Suspense>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<LoaddingPage />}>
                {" "}
                <SignIn />
              </Suspense>
            }
          />
          <Route
            path="reset"
            element={
              <Suspense fallback={<LoaddingPage />}>
                <ResetPasswordWorker />
              </Suspense>
            }
          />
          <Route
            path="logout"
            element={
              <Suspense fallback={<LoaddingPage />}>
                <LogOut />
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

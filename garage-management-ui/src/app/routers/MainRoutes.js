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
import RegisterPage from "../pages/AuthCustomer/RegisterPage";
import i18n from "../hooks/i18n/i18n";
import ConfirmEmailPage from "../pages/AuthCustomer/ConfirmEmailPage";

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
          path="confirm-email"
          element={
            <ConfirmEmailPage
              onLoad={() => loadLanguageResources("confirmEmail")}
            />
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
              <RegisterPage onLoad={() => loadLanguageResources("register")} />
            }
          />
          <Route
            path="confirm-email"
            element={
              <ConfirmEmailPage
                onLoad={() => loadLanguageResources("register")}
              />
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
      </Routes>
    </BrowserRouter>
  );
}

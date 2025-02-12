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
import ConfirmEmailPage from "../pages/AuthCustomer/ConfirmEmailPage";
import CustomerProfile from "../pages/CustomerProfile/CustomerProfile";
import LayoutCustomer from "../layouts/LayoutCustomer/LayoutCustomer";
import OrderHistory from "../pages/OrderHistory/OrderHistory";
import ManageProduct from "../pages/ManageProduct/ManageProduct";
import ProductDetails from "../pages/ManageProduct/ProductDetails";
import CreateProduct from "../pages/ManageProduct/CreateProduct";
import LookUpPage from "../pages/LookUpPage/LookUpPage";

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
          path="/home"
          element={<LayoutHome onLoad={() => loadLanguageResources("ver1")} />}
        >
          <Route
            index
            element={<Home onLoad={() => loadLanguageResources("ver1")} />}
          />
          <Route
            path="lookup"
            element={<LookUpPage onLoad={() => loadLanguageResources("look_up_page")} />}
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


        {/* Profile Customer */}
        <Route
          path="/customer"
          element={
            <Suspense fallback={<LoaddingPage />}>
              {" "}
              <LayoutCustomer onLoad={() => loadLanguageResources("sidebar_customer")} />
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
              <OrderHistory onLoad={() => loadLanguageResources("order_history_customer")} />
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
                <AdminProfile onLoad={() => loadLanguageResources("admin_profile", "manage_account")} />
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
            path="product"
            element={
              <Suspense fallback={<LoaddingPage />}>
                <ManageProduct onLoad={() => loadLanguageResources("manage_product", "base_table")} />
              </Suspense>
            }
          />

          <Route
            path="product/create"
            element={
              <Suspense fallback={<LoaddingPage />}>
                <CreateProduct onLoad={() => loadLanguageResources("create_product")} />
              </Suspense>
            }
          />

          <Route
            path="product/:id"
            element={
              <Suspense fallback={<LoaddingPage />}>
                <ProductDetails onLoad={() => loadLanguageResources("product_details", "breadcrumb_product")} />
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

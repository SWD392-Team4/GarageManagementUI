import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import signInImage from "../../assets/auth/sign-in.png";
import PageTitle from "../../components/common/PageTitle";
import Footer from "../Home/partials/Footer/Footer";
import Header from "../../layouts/Header/Header";
import UserService from "../../hooks/services/UserService";

export default function ConfirmEmailPage() {
  const { t } = useTranslation("confirmEmail");
  document.title = t("pageTitle");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userService = new UserService();

  // Lấy email & token từ URL
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  const [status, setStatus] = useState("loading"); // "loading", "success", "error"
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (!email || !token) {
      setStatus("error");
      return;
    }

    // Gọi API xác nhận email
    const confirmEmail = async () => {
      try {
        const response = await userService.sendAjax(
          "/api/auth/confirm-email",
          "POST",
          { email, token },
          false
        );

        if (response.status === 200) {
          setStatus("success");
        } else {
          setStatus("error");
        }
      } catch (error) {
        setStatus("error");
      }
    };

    confirmEmail();
  }, [email, token, userService]);

  // Gửi lại email xác nhận
  const handleReConfirm = async () => {
    if (isResending) return;
    setIsResending(true);

    try {
      const response = await userService.sendAjax(
        "/api/auth/resend-confirm-email",
        "POST",
        { email },
        false
      );

      if (response.status === 200) {
        setTimeout(() => navigate("/"), 5000);
        userService.showToast(200, `${t("resendSuccess")}`, null, 5000);
      } else {
        setTimeout(() => navigate("/"), 4000);
        userService.showToast(400, `${t("resendFailed")}`, null, 4000);
      }
    } catch (error) {
      setTimeout(() => navigate("/"), 4000);
      userService.showToast(400, t("resendFailed"), null, 4000);
    }

    setIsResending(false);
  };

  return (
    <>
      <Header />
      <section className="bg-black">
        <PageTitle
          title={t("pageTitle")}
          title1="Home"
          subtitle={t("pageTitle")}
        />
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-auto lg:pb-4 border-t border-white">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full">
            <div className="lg:w-1/4 flex items-center justify-center">
              <div className="text-center">
                <img
                  src={signInImage}
                  alt="Sign In"
                  className="w-full h-auto"
                />
              </div>
            </div>

            <div className="md:w-1/2 flex flex-col text-white items-center justify-center text-center">
              <div className="w-full text-center">
                {status === "loading" && (
                  <>
                    <h5 className="text-2xl font-semibold mb-6">
                      {t("loadingTitle")}
                    </h5>
                    <p className="text-gray-300">{t("loadingMessage")}</p>
                  </>
                )}

                {status === "success" && (
                  <>
                    <h5 className="text-2xl font-semibold mb-6">
                      {t("successTitle")}
                    </h5>
                    <p className="text-gray-300 mb-8">{t("successMessage")}</p>
                    <div>
                      <Link to="/authen">
                        <button className="w-1/3 bg-white/55 text-white py-2 hover:bg-gray-600 duration-500">
                          {t("signInButton")}
                        </button>
                      </Link>
                    </div>
                  </>
                )}

                {status === "error" && (
                  <>
                    <h5 className="text-2xl font-semibold mb-6 text-red-500">
                      {t("errorTitle")}
                    </h5>
                    <p className="text-gray-300 mb-4">{t("errorMessage")}</p>
                    <p className="text-gray-300 mb-8">{t("errorHint")}</p>
                    <button
                      onClick={handleReConfirm}
                      className="w-1/2 bg-blue-500 text-white py-2 hover:bg-blue-600 duration-500 rounded-md"
                      disabled={isResending}
                    >
                      {isResending ? t("resending") : t("resendButton")}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

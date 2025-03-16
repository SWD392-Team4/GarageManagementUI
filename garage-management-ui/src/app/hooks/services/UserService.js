import $ from "jquery";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import i18n from "../i18n/i18n";

class UserService {
  constructor() {
    this.apiurl = process.env.REACT_APP_API_URL;
    this.callCount = 0; // Đếm số lần gọi API
    this.lastCallTime = 0; // Thời điểm gọi cuối

    $.ajaxSetup({
      contentType: "application/json-patch+json",
      crossDomain: true,
      xhrFields: { withCredentials: false },
    });
  }

  getRoleFromToken() {
    const token = localStorage.getItem("at");
    if (!token) {
      return null;
    }

    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.Role ? decodedToken.Role : null;
    } catch (error) {
      console.error("Invalid JWT token", error);
      return null;
    }
  }
  // Lưu JWT vào localSto
  setToken(accessToken, refreshToken) {
    localStorage.setItem("at", accessToken);
    localStorage.setItem("rt", refreshToken);
  }

  clearToken() {
    localStorage.removeItem("at");
    localStorage.removeItem("rt");
  }

  /**
   * Gửi yêu cầu AJAX đến API với tùy chọn xác thực bằng JWT token.
   * Nếu AccessToken hết hạn (401), sẽ tự động refresh và thực hiện lại request.
   *
   * @param {string} url - Đường dẫn API (tương đối với `this.apiurl`).
   * @param {string} type - Loại HTTP method (GET, POST, PUT, DELETE, ...).
   * @param {object|null} data - Dữ liệu gửi kèm (nếu có).
   * @param {boolean} [requiresAuth=true] - Có cần đính kèm JWT trong header hay không.
   * @param {boolean} [isFileUpload=false] - Xác định có phải là upload file không.
   * @param {boolean} [isRetry=false] - Biến flag để tránh lặp vô hạn khi refresh token thất bại.
   * @returns {Promise<{status: number, data: any}>} - Trả về promise chứa response từ server.
   * @throws {Error} - Nếu gặp lỗi, sẽ ném ra exception.
   */
  async sendAjax(
    url,
    type,
    data,
    requiresAuth = true,
    isFileUpload = false,
    isRetry = false
  ) {
    try {
      let headers = {};

      if (requiresAuth) {
        const token = localStorage.getItem("at");
        if (!token) {
          window.location.reload();
          throw new Error("No JWT token found. Please login.");
        }
        headers.Authorization = `Bearer ${token}`;
      }

      const currentTime = Date.now();
      if (currentTime - this.lastCallTime < 1000) {
        if (this.callCount >= 20) {
          throw new Error("API rate limit exceeded. Try again later.");
        }
      } else {
        this.callCount = 0;
      }

      this.callCount++;
      this.lastCallTime = currentTime;

      return new Promise((resolve, reject) => {
        $.ajax({
          url: `${this.apiurl}${url}`,
          method: type,
          data: data ? (isFileUpload ? data : JSON.stringify(data)) : undefined,
          processData: !isFileUpload,
          contentType: isFileUpload ? false : "application/json-patch+json",
          headers: headers,

          success: (response, textStatus, xhr) => {
            const statusCode = xhr.status;

            if (statusCode === 204) {
              resolve({ status: 204, data: null });
            } else {
              resolve({ status: 200, data: response });
            }
          },

          error: async (xhr) => {
            console.log("Error Response: ", xhr.responseJSON);

            if (xhr.status === 401 && !isRetry) {
              console.warn("Access token expired. Attempting to refresh...");

              try {
                const newAccessToken = await this.refreshAccessToken();

                if (newAccessToken) {
                  console.log(
                    "Token refreshed successfully. Retrying request..."
                  );
                  const retryResponse = await this.sendAjax(
                    url,
                    type,
                    data,
                    requiresAuth,
                    isFileUpload,
                    true
                  );
                  return resolve(retryResponse);
                }
              } catch (refreshError) {
                console.error("Failed to refresh token:", refreshError);
                this.clearToken();
                window.location.href = "/authen";
                return reject({
                  status: 401,
                  message: "Session expired. Please login again.",
                });
              }
            }

            if (xhr.status === 403) {
              localStorage.removeItem("at");
              window.location.href = "/403-forbidden";
            }

            const errorCode =
              xhr.responseJSON?.Errors?.[0]?.Code ||
              xhr.responseJSON?.errors?.[0]?.code ||
              "Unknown Error";

            console.log("errorCode ", errorCode);

            const errorMessage =
              i18n.t(errorCode, { ns: "errors" }) ||
              "An unexpected error occurred.";

            reject({ status: xhr.status, message: errorMessage });
          },
        });
      });
    } catch (error) {
      console.error("Error setting up AJAX request:", error);
      throw error;
    }
  }

  /**
   * Gọi API `/api/auth/refresh` để làm mới accessToken bằng cách sử dụng `sendAjax`.
   * @returns {Promise<string|null>} - Trả về accessToken mới hoặc `null` nếu refresh thất bại.
   */
  async refreshAccessToken() {
    try {
      const accessToken = localStorage.getItem("at"); // Lấy accessToken hiện tại
      const refreshToken = localStorage.getItem("rt"); // Lấy refreshToken

      if (!refreshToken) {
        throw new Error("No refresh token available.");
      }

      // Gửi request refresh token bằng sendAjax
      const response = await this.sendAjax(
        "/api/auth/refresh",
        "POST",
        {
          accessToken,
          refreshToken,
        },
        false
      ); // Không cần auth vì đang làm mới token

      this.setToken(
        response.data.value.accessToken,
        response.data.value.refreshToken
      );

      console.log("Access token refreshed:", response.data.value.accessToken);
      return response.data.value.accessToken;
    } catch (error) {
      this.clearToken();
      window.location.href = "/authen";
      return reject({
        status: 401,
        message: "Session expired. Please login again.",
      });
    }
  }

  // Hiển thị thông báo cho người dùng
  showToast(status, message, position = "bottom-right", autoClose = 3000) {
    switch (status) {
      case 200:
        toast.success(message, { position, autoClose: autoClose });
        break;
      case 204:
        toast.success(message, { position, autoClose: autoClose });
        break;
      case 400:
        toast.error(message, { position, autoClose: autoClose });
        break;
      case 404:
        toast.warning(message, { position, autoClose: autoClose });
        break;
      default:
        toast.info(message, { position, autoClose: autoClose });
        break;
    }
  }

  // Hàm đăng nhập
  async login(userName, password, endpoint = "/api/auth/login") {
    try {
      const response = await this.sendAjax(
        endpoint,
        "POST",
        {
          userName,
          password,
        },
        false
      );
      this.setToken(
        response.data.value.accessToken,
        response.data.value.refreshToken
      );

      return { success: true, message: "Login successful." };
    } catch (error) {
      switch (error.status) {
        case 400:
          return {
            success: false,
            message: "Login failed. Please check your credentials.",
          };
        case 401:
          return {
            success: false,
            message: "Account not activated.",
          };
        case 404:
          return {
            success: false,
            message: "User not found or account not activated.",
          };
        default:
          return {
            success: false,
            message: error.msg || "An unknown error occurred.",
          };
      }
    }
  }

  navigateBasedOnRole() {
    const role = this.getRoleFromToken();
    switch (role) {
      case "Administrator":
        return process.env.REACT_APP_LOGIN_REDIRECT_ROLE_1;
      case "Mechanic":
        return process.env.REACT_APP_LOGIN_REDIRECT_ROLE_2;
      case "Cashier":
        return process.env.REACT_APP_LOGIN_REDIRECT_ROLE_3;
      case "WarehouseManager":
        return process.env.REACT_APP_LOGIN_REDIRECT_ROLE_4;
      case "Customer":
        return process.env.REACT_APP_LOGIN_REDIRECT_ROLE_5;
      default:
        return process.env.REACT_APP_LOGIN_REDIRECT_DEFAULT;
    }
  }
}

export default UserService;

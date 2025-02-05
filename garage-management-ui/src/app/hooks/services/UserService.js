import $ from "jquery";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";

class UserService {
  constructor() {
    this.apiurl = process.env.REACT_APP_API_URL;
    this.callCount = 0; // Đếm số lần gọi API
    this.lastCallTime = 0; // Thời điểm gọi cuối

    // Thiết lập các mặc định cho jQuery AJAX
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

  // Xóa JWT khỏi cookie khi đăng xuất
  clearToken() {
    localStorage.removeItem("at");
    localStorage.removeItem("rt");
  }

  // Hàm gọi API với JWT đính kèm trong header (nếu có)
  async sendAjax(url, type, data, requiresAuth = true, isFileUpload = false) {
    try {
      let headers;
      if (requiresAuth) {
        const token = localStorage.getItem("at");
        if (!token) {
          window.location.reload();
          throw new Error("No JWT token found. Please login.");
        }
        headers.Authorization = `Bearer ${token}`;
      }

      // Kiểm tra thời gian gọi API (rate limiting)
      const currentTime = Date.now();
      if (currentTime - this.lastCallTime < 1000) {
        if (this.callCount >= 20) {
          throw new Error("API rate limit exceeded. Try again later.");
        }
      } else {
        this.callCount = 0; // Reset nếu đã qua 1 giây
      }

      this.callCount++;
      this.lastCallTime = currentTime;
      console.log("url: ", `${this.apiurl}${url}`);

      return new Promise((resolve, reject) => {
        $.ajax({
          url: `${this.apiurl}${url}`,
          method: type,
          data: data ? (isFileUpload ? data : JSON.stringify(data)) : undefined,
          processData: !isFileUpload, // Process data if not file upload
          contentType: isFileUpload ? false : "application/json-patch+json", // Set content type to false for file uploads
          headers: headers,
          success: (response) => resolve({ status: 200, data: response }),
          error: (xhr) => {
            if (xhr.status === 403) {
              localStorage.removeItem("at");
              window.location.href = "/403-forbidden";
            }

            reject({ status: xhr.status, message: xhr.responseText });
          },
        });
      });
    } catch (error) {
      console.error("Error setting up AJAX request:", error);
      throw error;
    }
  }

  // Hiển thị thông báo cho người dùng
  showToast(status, message, position = "bottom-right", autoClose = 3000) {
    switch (status) {
      case 200:
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
      default:
        return process.env.REACT_APP_LOGIN_REDIRECT_DEFAULT;
    }
  }
}

export default UserService;

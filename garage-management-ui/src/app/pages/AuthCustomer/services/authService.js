import { sAccount } from "./store";
export const onSubmit = async (data, userService, navigate, setIsLoading) => {
  if (!userService || !navigate || !setIsLoading) {
    console.error("onSubmit Error: Missing dependencies");
    return;
  }

  if (setIsLoading) setIsLoading(true);
  const userName = data.email.toLowerCase();
  const password = data.password;

  try {
    const result = await userService.login(
      userName,
      password,
      "/api/auth/login"
    );

    if (result.success) {
      await fetchAccountProfile(userService);

      navigate(userService.navigateBasedOnRole());
    } else {
      userService.showToast(400, "Invalid email or password");
    }
  } catch (error) {
    console.error("🔴 onSubmit Error:", error);
    userService.showToast(404, "onSubmit Error");
  } finally {
    if (setIsLoading) setIsLoading(false);
  }
};

export const fetchAccountProfile = async (userService) => {
  if (!userService) {
    console.error("fetchAccountProfile Error: userService is undefined");
    return;
  }

  try {
    const response = await userService.sendAjax("/api/users/info", "GET", null);
    if (response.status === 200) {
      console.log("Profile fetched successfully:", response.data);
      // TODO: Cập nhật state nếu cần
      const newUserData = response.data.value;
      // Kiểm tra nếu dữ liệu từ API khác với dữ liệu cache
      if (
        newUserData.LastName !== sAccount.value.LastName ||
        newUserData.FirstName !== sAccount.value.FirstName ||
        newUserData.Image !== sAccount.value.Image ||
        newUserData.Email !== sAccount.value.Email ||
        newUserData.PhoneNumber !== sAccount.value.PhoneNumber ||
        newUserData.Gender !== sAccount.value.Gender ||
        newUserData.CitizenIdentification !==
          sAccount.value.CitizenIdentification ||
        newUserData.DateOfBirth !== sAccount.value.DateOfBirth ||
        newUserData.Status !== sAccount.value.Status ||
        newUserData.WorkPlaceId !== sAccount.value.WorkPlaceId
      ) {
        sAccount.set(newUserData);
      }
    }
  } catch (error) {
    console.error("🔴 fetchAccountProfile Error:", error);
    userService.showToast(error.status, error.message);
  }
};

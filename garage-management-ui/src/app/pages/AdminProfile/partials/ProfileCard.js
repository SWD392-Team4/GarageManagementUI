import PersonalInformation from "./PersonalInformation";
import ChangePassWord from "./ChangePassWord";
import WorkPlace from "./WorkPlace";
import ResetPass from "../../CustomerProfile/partials/ResetPass";

export default function ProfileSettings() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-100 p-0 md:p-6">
      {/* Thông tin cá nhân */}
      <div className="bg-white shadow-md rounded-lg p-0 md:p-6">
        <PersonalInformation />
      </div>
      <div className="bg-white shadow-md rounded-lg p-0 md:p-6">
        {/* Các phần cài đặt tài khoản */}
        <WorkPlace />
        <ResetPass />
      </div>
    </div>
  );
}

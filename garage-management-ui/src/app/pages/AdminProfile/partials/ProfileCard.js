import PersonalInformation from "./PersonalInformation";
import ChangePassWord from "./ChangePassWord";
import WorkPlace from "./WorkPlace";

export default function ProfileSettings() {


    return (
        <div className="grid grid-cols-2 gap-6 bg-gray-100">
            {/* Personal Information */}
            <PersonalInformation />
            <div className="bg-white shadow-md rounded-lg p-6">
                {/* Change Password */}
                <ChangePassWord />
                {/* WorkPlace */}
                <WorkPlace />
            </div>
        </div>
    );
}
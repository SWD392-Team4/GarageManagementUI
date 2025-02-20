import React from 'react';

const userData = {
    id: "f8a4e60d-3113-4f25-8477-be205b0860c9",
    firstName: "Nhat Tan",
    lastName: "Le Hoang",
    email: "tanlhnse171831@fpt.edu.vn",
    phoneNumber: "0902596143",
    status: "Active",
    role: "Administrator",
    citizenId: "66316",
    gender: "Male",
    dateOfBirth: "0001-01-01",
    workPlace: "FPT University",
    avatar: "https://i.pravatar.cc/150?img=3" // Placeholder avatar image
};

export default function PersonalInformation() {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
            <img
                src={userData.avatar}
                alt="User Avatar"
                className="w-24 h-24 rounded-full mb-4 border"
            />
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
            <div className="grid grid-cols-2 gap-4 w-full">
                <div>
                    <label className="text-sm text-gray-600">First Name</label>
                    <input
                        type="text"
                        value={userData.firstName}
                        className="w-full p-2 border rounded-lg mt-1"
                        readOnly
                    />
                </div>
                <div>
                    <label className="text-sm text-gray-600">Last Name</label>
                    <input
                        type="text"
                        value={userData.lastName}
                        className="w-full p-2 border rounded-lg mt-1"
                        readOnly
                    />
                </div>
                <div>
                    <label className="text-sm text-gray-600">Email Address</label>
                    <input
                        type="email"
                        value={userData.email}
                        className="w-full p-2 border rounded-lg mt-1"
                        readOnly
                    />
                </div>
                <div>
                    <label className="text-sm text-gray-600">Contact Number</label>
                    <input
                        type="tel"
                        value={userData.phoneNumber}
                        className="w-full p-2 border rounded-lg mt-1"
                        readOnly
                    />
                </div>
                <div>
                    <label className="text-sm text-gray-600">Citizen ID</label>
                    <input
                        type="text"
                        value={userData.citizenId}
                        className="w-full p-2 border rounded-lg mt-1"
                        readOnly
                    />
                </div>
                <div>
                    <label className="text-sm text-gray-600">Gender</label>
                    <input
                        type="text"
                        value={userData.gender}
                        className="w-full p-2 border rounded-lg mt-1"
                        readOnly
                    />
                </div>
                <div className="col-span-2">
                    <label className="text-sm text-gray-600">Date of Birth</label>
                    <input
                        type="text"
                        value={userData.dateOfBirth}
                        className="w-full p-2 border rounded-lg mt-1"
                        readOnly
                    />
                </div>
            </div>
        </div>
    );
}

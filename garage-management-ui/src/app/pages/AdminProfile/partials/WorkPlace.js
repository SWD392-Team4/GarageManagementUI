import React from 'react';

const workPlaceData = {
    id: "c1aeb9e5-8c74-4b09-bc57-d4c3df7857f9",
    name: "Garage 1",
    phoneNumber: "0983456789",
    fullAddress: "123 Static St., 12345, Static District, Static Province",
    workplaceType: "Garage",
    status: "Active",
    createdAt: "2025-01-01T00:00:00+07:00",
    updatedAt: "2025-01-10T00:00:00+07:00"
};

export default function WorkPlace() {
    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">WorkPlace Information</h2>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-sm text-gray-600">Name</label>
                    <input
                        type="text"
                        value={workPlaceData.name}
                        className="w-full p-2 border rounded-lg mt-1"
                        readOnly
                    />
                </div>
                <div>
                    <label className="text-sm text-gray-600">Phone Number</label>
                    <input
                        type="tel"
                        value={workPlaceData.phoneNumber}
                        className="w-full p-2 border rounded-lg mt-1"
                        readOnly
                    />
                </div>
                <div className="col-span-2">
                    <label className="text-sm text-gray-600">Full Address</label>
                    <input
                        type="text"
                        value={workPlaceData.fullAddress}
                        className="w-full p-2 border rounded-lg mt-1"
                        readOnly
                    />
                </div>
                <div>
                    <label className="text-sm text-gray-600">Workplace Type</label>
                    <input
                        type="text"
                        value={workPlaceData.workplaceType}
                        className="w-full p-2 border rounded-lg mt-1"
                        readOnly
                    />
                </div>
                <div>
                    <label className="text-sm text-gray-600">Status</label>
                    <input
                        type="text"
                        value={workPlaceData.status}
                        className="w-full p-2 border rounded-lg mt-1"
                        readOnly
                    />
                </div>
                <div>
                    <label className="text-sm text-gray-600">Created At</label>
                    <input
                        type="text"
                        value={workPlaceData.createdAt}
                        className="w-full p-2 border rounded-lg mt-1"
                        readOnly
                    />
                </div>
                <div>
                    <label className="text-sm text-gray-600">Updated At</label>
                    <input
                        type="text"
                        value={workPlaceData.updatedAt}
                        className="w-full p-2 border rounded-lg mt-1"
                        readOnly
                    />
                </div>
            </div>
        </div>
    );
}

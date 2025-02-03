import React from "react";

export default function AdminProfile() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen overflow-auto">
      {/* Header */}
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row items-center md:items-start space-x-0 md:space-x-6 text-center md:text-left">
        <img
          src="https://via.placeholder.com/150"
          alt="Admin Avatar"
          className="w-24 h-24 rounded-full border-4 border-blue-500"
        />
        <div className="mt-4 md:mt-0">
          <h2 className="text-2xl font-bold text-gray-800">John Doe</h2>
          <p className="text-gray-600">Administrator</p>
          <p className="text-gray-500">johndoe@example.com</p>
        </div>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
          <p className="text-3xl font-bold text-blue-500">1,250</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700">Orders Processed</h3>
          <p className="text-3xl font-bold text-green-500">3,540</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700">Revenue</h3>
          <p className="text-3xl font-bold text-red-500">$42,750</p>
        </div>
      </div>

      {/* Profile Details */}
      <div className="bg-white shadow-md rounded-lg p-6 mt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Profile Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600 font-semibold">Full Name:</p>
            <p className="text-gray-800">John Doe</p>
          </div>
          <div>
            <p className="text-gray-600 font-semibold">Email:</p>
            <p className="text-gray-800">johndoe@example.com</p>
          </div>
        </div>
      </div>

      {/* Long Text Content to Test Overflow */}
      <div className="bg-white shadow-md rounded-lg p-6 mt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Biography</h3>
        <p className="text-gray-700 break-words">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut orci vel ligula pharetra
          laoreet nec ac ligula. Suspendisse potenti. Pellentesque habitant morbi tristique senectus
          et netus et malesuada fames ac turpis egestas. Donec tristique nisi at orci fermentum, vel
          malesuada felis fermentum. Aenean sit amet tortor nec nulla dictum posuere eget a orci.
          Praesent convallis orci at enim scelerisque, eu fermentum metus pellentesque. Fusce venenatis
          nunc non nunc scelerisque, in viverra leo dapibus. Proin aliquam dui at dolor congue, a suscipit
          lacus tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
          curae; Nam dapibus nec elit a tristique. Fusce pharetra velit vel metus pharetra, ac sodales nulla
          ultricies. Etiam vitae tellus orci. Vestibulum eu nisl arcu.
        </p>
      </div>

     
    </div>
  );
}

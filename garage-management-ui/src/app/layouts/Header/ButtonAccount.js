import React from "react";
import { FaUserPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function ButtonAccount() {
  return (
    <>
      <Link to="/authen">
        <button class="flex items-center space-x-2 bg-gray-100/20 text-white font-medium py-2 px-4 rounded-md hover:bg-red-600/30">
          <FaUserPlus />
          <span>Sign In</span>
        </button>
      </Link>
    </>
  );
}

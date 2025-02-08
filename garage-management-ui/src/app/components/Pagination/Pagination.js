import React from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const next = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const prev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <div className="flex items-center gap-2 justify-center mt-4">
      {/* Nút Previous */}
      <button
        onClick={prev}
        disabled={currentPage === 1}
        className={`px-4 py-2 flex items-center gap-1 border rounded-lg transition 
          ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300"}
        `}
      >
        <ArrowLeftIcon className="h-5 w-5" />
        Previous
      </button>

      {/* Danh sách trang */}
      <div className="flex items-center gap-2">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-2 rounded-lg border transition
              ${currentPage === page ? "bg-red-500 text-white" : "bg-gray-100 hover:bg-gray-200"}
            `}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Nút Next */}
      <button
        onClick={next}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 flex items-center gap-1 border rounded-lg transition 
          ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300"}
        `}
      >
        Next
        <ArrowRightIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Pagination;

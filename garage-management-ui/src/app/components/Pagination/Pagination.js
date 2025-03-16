import React, { use } from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

const Pagination = ({
  currentPage,
  totalPages,
  hasPrevious,
  hasNext,
  onPageChange,
}) => {
  // console.log("Pagination Props:", { currentPage, totalPages, hasPrevious, hasNext, onPageChange });
  const MAX_VISIBLE_PAGES = 5;

  const getVisiblePages = () => {
    if (totalPages <= MAX_VISIBLE_PAGES) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const half = Math.floor(MAX_VISIBLE_PAGES / 2);
    if (currentPage <= half) {
      return [...Array(MAX_VISIBLE_PAGES).keys()].map((i) => i + 1);
    } else if (currentPage >= totalPages - half) {
      return [...Array(MAX_VISIBLE_PAGES).keys()].map(
        (i) => totalPages - MAX_VISIBLE_PAGES + 1 + i
      );
    } else {
      return [
        currentPage - half,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + half,
      ];
    }
  };
  const {t} = useTranslation("pagination");
  return (
    <div className="flex items-center gap-2 justify-center mt-4">
      {/* Previous Button */}
      <button
        onClick={() => hasPrevious && onPageChange(currentPage - 1)}
        disabled={!hasPrevious}
        className={`px-4 py-2 flex items-center gap-1 border rounded-lg transition
          ${
            !hasPrevious
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300"
          }
        `}
      >
        <ArrowLeftIcon className="h-5 w-5" />
        {t("pagination.previous")}
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {currentPage > 3 && totalPages > MAX_VISIBLE_PAGES && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className={`px-3 py-2 rounded-lg border transition bg-gray-100 hover:bg-gray-200`}
            >
              1
            </button>
            <span className="px-2">...</span>
          </>
        )}

        {getVisiblePages().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-2 rounded-lg border transition 
              ${
                currentPage === page
                  ? "bg-red-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }
            `}
          >
            {page}
          </button>
        ))}

        {currentPage < totalPages - 2 && totalPages > MAX_VISIBLE_PAGES && (
          <>
            <span className="px-2">...</span>
            <button
              onClick={() => onPageChange(totalPages)}
              className={`px-3 py-2 rounded-lg border transition bg-gray-100 hover:bg-gray-200`}
            >
              {totalPages}
            </button>
          </>
        )}
      </div>

      {/* Next Button */}
      <button
        onClick={() => hasNext && onPageChange(currentPage + 1)}
        disabled={!hasNext}
        className={`px-4 py-2 flex items-center gap-1 border rounded-lg transition 
          ${
            !hasNext
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300"
          }
        `}
      >
         {t("pagination.next")}
        <ArrowRightIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Pagination;

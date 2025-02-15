import React, { useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function BaseTable({ columns, fetchData, actions, pagination }) {
  const { t } = useTranslation("base_table");
  const [currentPage, setCurrentPage] = useState(pagination.page);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // ✅ Thêm trạng thái loading

  useEffect(() => {
    setIsLoading(true); // ✅ Bắt đầu loading
    fetchData(currentPage).then((response) => {
      setData(response.data);
      setIsLoading(false); // ✅ Kết thúc loading
    });
  }, [currentPage, fetchData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: Math.ceil(pagination.total / pagination.pageSize),
  });

  return (
    <>
      <div className="bg-white">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-800 text-white">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((column) => (
                    <th
                      key={column.id}
                      className="border p-3 text-left font-medium"
                    >
                      {flexRender(
                        column.column.columnDef.header,
                        column.getContext()
                      )}
                    </th>
                  ))}
                  {actions && (
                    <th className="border p-3 text-left">
                      {t("base_table.actions")}
                    </th>
                  )}
                </tr>
              ))}
            </thead>

            <tbody className="bg-gray-50">
              {/* ✅ Hiển thị Skeleton Loading nếu đang tải dữ liệu */}
              {isLoading ? (
                [...Array(5)].map((_, index) => (
                  <tr key={index} className="animate-pulse">
                    {columns.map((col, idx) => (
                      <td key={idx} className="border p-3">
                        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                      </td>
                    ))}
                    {actions && (
                      <td className="border p-3 flex gap-2">
                        <div className="h-8 w-8 bg-gray-300 rounded"></div>
                        <div className="h-8 w-8 bg-gray-300 rounded"></div>
                      </td>
                    )}
                  </tr>
                ))
              ) : table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-100">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="border p-3">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                    {actions && (
                      <td className="border-r border-b h-full p-3 flex gap-2">
                        {actions.map((action, index) => (
                          <Link key={index} to={action.link(row.id)}>
                            <button className="p-2 rounded-sm bg-gray-700 text-white hover:bg-gray-900">
                              {action.icon}
                            </button>
                          </Link>
                        ))}
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length + (actions ? 1 : 0)}
                    className="text-center p-4 text-gray-500"
                  >
                    {t("base_table.no_data")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ✅ Phân trang */}
      <div className="flex justify-between items-center py-5">
        <button
          className="p-2 bg-gray-300 disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          ◀
        </button>

        <span className="text-sm font-medium text-gray-700">
          {t("base_table.page")} {currentPage} /{" "}
          {Math.ceil(pagination.total / pagination.pageSize)}
        </span>

        <button
          className="p-2 bg-gray-300 disabled:opacity-50"
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(
                prev + 1,
                Math.ceil(pagination.total / pagination.pageSize)
              )
            )
          }
          disabled={
            currentPage >= Math.ceil(pagination.total / pagination.pageSize)
          }
        >
          ▶
        </button>
      </div>
    </>
  );
}

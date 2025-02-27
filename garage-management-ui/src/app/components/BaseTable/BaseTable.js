import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function BaseTable({
  columns,
  data,
  actions,
  pagination,
  onPageChange,
  onPageSizeChange,
}) {
  const { t } = useTranslation("base_table");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: pagination.totalPages,
  });

  return (
    <>
      <div className="bg-white">
        <div className="overflow-auto">
          <table className="w-full min-w-max border-collapse">
            <thead className="bg-gray-800 text-white">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((column) => (
                    <th key={column.id} className="border p-3 text-left font-medium whitespace-nowrap">
                      {flexRender(column.column.columnDef.header, column.getContext())}
                    </th>
                  ))}
                  {actions && <th className="border p-3 text-left">{t("base_table.actions")}</th>}
                </tr>
              ))}
            </thead>

            <tbody className="bg-gray-50">
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.original?.Id || row.id} className="hover:bg-gray-100">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="border p-3 text-sm">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                    {actions && (
                      <td className="border-r border-b h-full p-3 flex flex-wrap gap-2">
                        {actions.map((action, index) => {
                          if (!action || !action.type) return null;

                          const actionProps = {
                            key: index,
                            className: "p-2 rounded-sm bg-gray-700 text-white hover:bg-gray-900",
                            children: action.icon,
                          };

                          if (action.type === "link") {
                            return (
                              <Link key={index} to={action.link(row)}>
                                <button {...actionProps} />
                              </Link>
                            );
                          }

                          if (action.type === "navigate") {
                            return (
                              <button {...actionProps} onClick={() => navigate(action.link(row.original))} />
                            );
                          }

                          if (action.type === "modal" || action.type === "callback") {
                            return <button {...actionProps} onClick={() => action.onClick(row.original)} />;
                          }

                          return null;
                        })}
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length + (actions ? 1 : 0)} className="text-center p-4 text-gray-500">
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
          onClick={() => onPageChange(pagination.currentPage - 1)}
          disabled={!pagination.hasPrevious}
        >
          ◀
        </button>

        {pagination.totalPages > 1 && (
          <span className="text-sm font-medium text-gray-700">
            {t("base_table.page")} {pagination.currentPage} / {pagination.totalPages}
          </span>
        )}

        <button
          className="p-2 bg-gray-300 disabled:opacity-50"
          onClick={() => onPageChange(pagination.currentPage + 1)}
          disabled={!pagination.hasNext}
        >
          ▶
        </button>
      </div>
    </>

  );
}

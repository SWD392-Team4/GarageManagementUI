import React, { useState } from "react";
import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, flexRender } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

export default function BaseTable({ columns, data, title, actions }) {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState("");

    // Lọc dữ liệu theo từ khóa tìm kiếm
    const filteredData = data.filter(row =>
        Object.values(row).some(value =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    // Sử dụng react-table
    const table = useReactTable({
        data: filteredData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            {/* Thanh tìm kiếm */}
            <div className="flex mb-4">
                <input
                    type="text"
                    placeholder={t("table.search")}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Bảng dữ liệu */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 rounded-lg">
                    <thead className="bg-gray-700 text-white">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(column => (
                                    <th key={column.id} className="border p-3 text-left">
                                        {flexRender(column.column.columnDef.header, column.getContext())}
                                    </th>
                                ))}
                                {/* Dịch chữ "Hành động" */}
                                {actions && <th className="border p-3 text-left">{t("table.actions")}</th>}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="bg-white">
                        {table.getRowModel().rows.length > 0 ? (
                            table.getRowModel().rows.map(row => (
                                <tr key={row.id} className="hover:bg-gray-100">
                                    {row.getVisibleCells().map(cell => (
                                        <td key={cell.id} className="border p-3">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                    {/* Hành động */}
                                    {actions && (
                                        <td className="border p-3 flex gap-2">
                                            {actions.map(action => (
                                                <button
                                                    key={action.label}
                                                    className={`px-3 py-1 rounded-lg text-white ${action.color}`}
                                                    onClick={() => action.onClick(row.original)}
                                                >
                                                    {action.icon} {action.label}
                                                </button>
                                            ))}
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length + (actions ? 1 : 0)} className="text-center p-4">
                                    {t("table.no_data")}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Phân trang */}
            <div className="flex justify-between items-center mt-4">
                <button
                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    {t("table.prev")}
                </button>

                <span className="text-sm">
                    {t("table.page")} {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
                </span>

                <button
                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    {t("table.next")}
                </button>
            </div>
        </div>
    );
}

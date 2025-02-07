import React, { useState, useEffect } from "react";
import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, flexRender } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

export default function BaseTable({ columns, fetchData, actions, pagination }) {
    const { t } = useTranslation("base_table");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(pagination.page);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData(currentPage).then(response => {
            setData(response.data);
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
        <div className="p-6 bg-white rounded-lg shadow-md">
            {/* Thanh tìm kiếm */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder={t("base_table.search")}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Bảng dữ liệu */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200 rounded-lg">
                    <thead className="bg-gray-800 text-white">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(column => (
                                    <th key={column.id} className="border p-3 text-left font-medium">
                                        {flexRender(column.column.columnDef.header, column.getContext())}
                                    </th>
                                ))}
                                {actions && <th className="border p-3 text-left">{t("base_table.actions")}</th>}
                            </tr>
                        ))}
                    </thead>

                    <tbody className="bg-gray-50">
                        {table.getRowModel().rows.length > 0 ? (
                            table.getRowModel().rows.map(row => (
                                <tr key={row.id} className="hover:bg-gray-100">
                                    {row.getVisibleCells().map(cell => (
                                        <td key={cell.id} className="border p-3">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                    {actions && (
                                        <td className="border p-3 flex gap-2">
                                            {actions.map(action => (
                                                <button
                                                    key={action.label}
                                                    className="p-2 rounded-lg bg-gray-700 text-white hover:bg-gray-900"
                                                    onClick={() => action.onClick(row.original)}
                                                >
                                                    {action.icon}
                                                </button>
                                            ))}
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

            {/* Phân trang */}
            <div className="flex justify-between items-center mt-4">
                <button
                    className="p-2 bg-gray-300 rounded disabled:opacity-50"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    ◀
                </button>

                <span className="text-sm font-medium text-gray-700">
                    {t("base_table.page")} {currentPage} / {Math.ceil(pagination.total / pagination.pageSize)}
                </span>

                <button
                    className="p-2 bg-gray-300 rounded disabled:opacity-50"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(pagination.total / pagination.pageSize)))}
                    disabled={currentPage >= Math.ceil(pagination.total / pagination.pageSize)}
                >
                    ▶
                </button>
            </div>
        </div>
    );
}

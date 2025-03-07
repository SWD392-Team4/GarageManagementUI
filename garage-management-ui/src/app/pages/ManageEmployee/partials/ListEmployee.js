import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaPencilAlt } from 'react-icons/fa';
import { getAllEmployee, getEmployeeDetail, searchEmployee } from '../services/EmployeeService';
import { sEmployee } from '../services/EmployeeSignify';
import BaseTable from '../../../components/BaseTable/BaseTable';
import UpdateEmployeeModal from '../models/UpdateEmployeeModal';
import SearchEmployeePartial from './SearchEmployeePartial';

export default function ListEmployee({ refresh }) {
    const { t, i18n } = useTranslation("manage_employee");
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalCount: 0,
        hasPrevious: false,
        hasNext: false,
    });
    const [searchParams, setSearchParams] = useState(null);
    const [selectedEmployee, setselectedEmployee] = useState(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(null);

    // useCallback để tránh re-create
    const fetchData = useCallback(async (page = 1, params = null) => {
        try {
            let response;

            if (params) {
                response = await searchEmployee({ ...params, PageNumber: page });
            } else {
                response = await getAllEmployee(page);
            }

            if (response?.data?.value) {
                setData(response.data.value);
                setPagination({
                    currentPage: response.data.paging.currentPage,
                    totalPages: response.data.paging.totalPages,
                    totalCount: response.data.paging.totalCount,
                    hasPrevious: response.data.paging.hasPrevious,
                    hasNext: response.data.paging.hasNext,
                });
            } else {
                console.error("Loading Employee failed");
            }
        } catch (error) {
            console.error("Error fetching Employee: ", error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [refresh, fetchData]);

    //tim cac co hon song
    const handleSearch = (params) => {
        setSearchParams(params);
        fetchData(1, params);
    };

    // Xử lý chuyển trang
    const handlePageChange = (newPage) => {
        fetchData(newPage, searchParams);
    };

    const columns = useMemo(
        () => [
            { header: t("manage_employee.id"), accessorKey: "id", accessorFn: (_row, index) => index + 1 },
            { header: t("manage_employee.firstName"), accessorKey: "firstName" },
            { header: t("manage_employee.lastName"), accessorKey: "lastName" },
            { header: t("manage_employee.email"), accessorKey: "email" },
            { header: t("manage_employee.phoneNumber"), accessorKey: "phoneNumber" },
            { header: t("manage_employee.status"), accessorKey: "status" },
            { header: t("manage_employee.createdAt"), accessorKey: "createdAt" },
            { header: t("manage_employee.updatedAt"), accessorKey: "updatedAt" },
        ],
        [t, i18n.language]
    );

    const actions = [
        {
            type: "modal",
            label: t("manage_employee.edit"),
            color: "bg-yellow-500",
            icon: <FaPencilAlt />,
            onClick: async (row) => {
                try {
                    console.log("Click vao roi");
                    const getEmployeeDetails = await getEmployeeDetail(row.id);
                    setselectedEmployee(getEmployeeDetails.data.value);
                    setIsUpdateModalOpen(true);
                } catch (error) {
                    console.error("Error fetching employee details: ", error);
                }
            },
        },
    ];

    return (
        <>
            <SearchEmployeePartial onSearch={handleSearch} />

            <BaseTable
                columns={columns}
                data={data}
                actions={actions}
                pagination={pagination}
                onPageChange={handlePageChange}
                signifyInformation={sEmployee.value}
            />
            <UpdateEmployeeModal
                isOpen={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                employee={selectedEmployee}
                onEmployeeUpdated={() => {
                    setIsUpdateModalOpen(false);
                    fetchData(pagination.currentPage, searchParams);
                }}
            />
        </>
    )
}

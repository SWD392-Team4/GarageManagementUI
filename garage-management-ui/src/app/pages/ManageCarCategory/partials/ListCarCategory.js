import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaPencilAlt } from 'react-icons/fa';
import BaseTable from '../../../components/BaseTable/BaseTable';
import UpdateCarCategoryModal from '../models/UpdateCarCategoryModal';
import { getAllCarCategory, getCarCategory, SearchCarCategory } from '../services/ServiceCarCategory';
import { sCarCategory } from '../services/CarCategorySignify';

export default function ListCarCategory({ refesh }) {
    const { t, i18n } = useTranslation("manage_car_category");
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalsPage: 1,
        totalCount: 0,
        hasPrevious: false,
        hasNext: false,
    })
    const [searchParams, setSearchParams] = useState(null);
    const [selectedCarCategory, setSelectCarCategory] = useState(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    //fecth data
    const fetchData = useCallback(async (page = 1, params = null) => {
        try {
            let response;

            if (params) {
                response = await SearchCarCategory({ ...params, PageNumber: page });
            } else {
                response = await getAllCarCategory(page);
            }
            if (response?.data?.value) {
                setData(response.data.value)
                setPagination({
                    currentPage: response.data.paging.currentPage,
                    totalPages: response.data.paging.totalPages,
                    totalCount: response.data.paging.totalCount,
                    hasPrevious: response.data.paging.hasPrevious,
                    hasNext: response.data.paging.hasNext,
                });
            } else {
                console.error("Loading Car Category Failed");
            }
        } catch (error) {
            console.error("Error fetching car category: ", error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [refesh, fetchData]);

    //tim kiem
    const handleSearch = (params) => {
        setSearchParams(params);
        fetchData(1, params);
    }

    //chuyen trang
    const handlePageChange = (newPage) => {
        fetchData(newPage, searchParams);
    }

    const columns = useMemo(
        () => [
            { header: t("manage_car_category.id"), accessorKey: "id" },
            { header: t("manage_car_category.category"), accessorKey: "category" },
            { header: t("manage_car_category.status"), accessorKey: "status" },
            { header: t("manage_car_category.createdAt"), accessorKey: "createdAt" },
            { header: t("manage_car_category.updatedAt"), accessorKey: "updatedAt" }
        ],
        [t, i18n.language]
    )

    const actions = [
        {
            type: "modal",
            label: t("manage_car_category.edit"),
            color: "bg-yellow-500",
            icon: <FaPencilAlt />,
            onClick: async (row) => {
                try {
                    const carCategoryDetails = await getCarCategory(row.id);
                    setSelectCarCategory(carCategoryDetails.data.value);
                    setIsUpdateModalOpen(true);
                } catch (error) {
                    console.error("Error fetching car category details: ", error);
                }
            },
        },
    ];


    return (
        <>
            {/* <SearchCarCategory onSearch={handleSearch} /> */}
            <BaseTable
                columns={columns}
                data={data}
                actions={actions}
                pagination={pagination}
                onPageChange={handlePageChange}
                signifyInformation={sCarCategory.value}
            />
            <UpdateCarCategoryModal
                isOpen={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                carCategory={selectedCarCategory}
                onCarCategoryUpdate={() => {
                    setIsUpdateModalOpen(false);
                    fetchData(pagination.currentPage, searchParams);
                }}
            />
        </>
    )
}

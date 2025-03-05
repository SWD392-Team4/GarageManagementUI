import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { getAllCarModal, getCarModalDetails, searchCarModal } from '../services/carModalService';
import { useTranslation } from 'react-i18next';
import { label, select } from 'three/src/nodes/TSL.js';
import { FaPencilAlt } from 'react-icons/fa';
import BaseTable from '../../../components/BaseTable/BaseTable';
import UpdateCarModal from '../models/UpdateCarModal';
import SearchCarModel from './SearchCarModel';

export default function ListCarModal({ refresh }) {
    const { t, i18n } = useTranslation("manage_car_modal");
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalCount: 0,
        hasPrevious: false,
        hasNext: false,
    });

    const [searchParams, setSearchParams] = useState(null);
    const [selectedCarModel, setSelectedCarModel] = useState(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    const fetchData = useCallback(async (page = 1, params = null) => {
        try {
            let response;

            if (params) {
                response = await searchCarModal({ ...params, PageNumber: page });

            } else {
                response = await getAllCarModal(page);
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
                console.error("Loading Car Model failed");
            }

        } catch (error) {
            console.error("Error fetching Car Model: ", error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [refresh, fetchData])

    //Xu ly search
    const handleSearch = (params) => {
        setSearchParams(params);
        fetchData(1, params);
    };

    //khi chuyen trang
    const handlePageChange = (newPage) => {
        fetchData(newPage, searchParams);
    };


    //xu ly column
    const columns = useMemo(
        () => [
            { header: t("manage_car_modal.id"), accessorKey: "id" },
            { header: t("manage_car_modal.modalName"), accessorKey: "modelName" },
            { header: t("manage_car_modal.category"), accessorKey: "category" },
            { header: t("manage_car_modal.brand"), accessorKey: "brandName" },
            { header: t("manage_car_modal.modelYear"), accessorKey: "modelYear" },
            { header: t("manage_car_modal.createdAt"), accessorKey: "createdAt" },
            { header: t("manage_car_modal.updatedAt"), accessorKey: "updatedAt" },
        ]
    )

    const actions = [
        {
            type: "modal",
            label: t("manage_car_modal.edit"),
            color: "bg-yellow-500",
            icon: <FaPencilAlt />,
            onClick: async (row) => {
                try {
                    const carModalDetails = await getCarModalDetails(row.id);
                    setSelectedCarModel(carModalDetails.data.value);
                    setIsUpdateModalOpen(true);
                } catch (error) {
                    console.error("Error fetching car models details: ", error.message);
                }
            },

        },
    ];


    return (
        <>

            <SearchCarModel onSearch={handleSearch} />
            <BaseTable
                columns={columns}
                data={data}
                actions={actions}
                pagination={pagination}
                onPageChange={handlePageChange}
            />

            <UpdateCarModal
                isOpen={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                carModel={selectedCarModel}
                onCarModelUpdated={() => {
                    setIsUpdateModalOpen(false);
                    fetchData(pagination.currentPage, searchParams);
                }}
            />
        </>
    )
}

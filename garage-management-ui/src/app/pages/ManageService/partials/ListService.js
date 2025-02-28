import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { getAllService, searchService } from '../services/ServiceAPI';
import SearchService from './SearchService';
import BaseTable from '../../../components/BaseTable/BaseTable';
import { FaEye } from 'react-icons/fa';

export default function ListService() {
  const { t, i18n } = useTranslation("manage_service");
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    hasPrevious: false,
    hasNext: false,
  });
  const [searchParams, setSearchParams] = useState(null);

  //usecallback tranh tao ham
  const fetchData = useCallback(async (page = 1, params = null) => {
    try {
      let response;

      if (params) {
        response = await searchService({ ...params, PageNumber: page });
      } else {
        response = await getAllService(page);
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
        console.error("Loading services failed");
      }

    } catch (error) {
      console.error("Error fetching services: ", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = (params) => {
    setSearchParams(params);
    fetchData(1, params);
  };

  const handlePageChange = (newPage) => {
    fetchData(newPage, searchParams)
  }

  const columns = useMemo(
    () => [
      { header: t("manage_service.Id"), accessorKey: "Id" },
      { header: t("manage_service.ServiceName"), accessorKey: "ServiceName" },
      { header: t("manage_service.ServiceCategory"), accessorKey: "ServiceCategory" },
      { header: t("manage_service.PartName"), accessorKey: "PartName" },
      { header: t("manage_service.Category"), accessorKey: "Category" },
      { header: t("manage_service.Price"), accessorKey: "Price" },
      { header: t("manage_service.WorkNature"), accessorKey: "WorkNature" },
      { header: t("manage_service.Action"), accessorKey: "Action" },
      { header: t("manage_service.EstimatedHours"), accessorKey: "EstimatedHours" },
      { header: t("manage_service.Status"), accessorKey: "Status" },
    ],
    [t, i18n.language]
  );

  const actions = [
    {
      type: "link",
      label: t("manage_service.view"),
      icon: <FaEye />,
      color: "bg-gray-500",
      link: (row) => `/admin/service/${row.original.Id}`,
    },
  ];

  return (
    <>
      <SearchService onSearch={handleSearch} />
      <BaseTable
        columns={columns}
        data={data}
        actions={actions}
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </>
  )
}

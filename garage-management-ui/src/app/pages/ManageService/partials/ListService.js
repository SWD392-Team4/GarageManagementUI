import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  getAllService,
  getFeedbackByServiceId,
  searchService,
} from "../services/ServiceAPI";
import SearchService from "./SearchService";
import BaseTable from "../../../components/BaseTable/BaseTable";
import { FaEye, FaStar } from "react-icons/fa";
import { sService } from "../services/ServiceSignify";
import FeedbackServiceModal from "../modals/FeedbackServiceModal";

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
  const [selectedService, setSelectedService] = useState(null);
  const [isViewFeedbackService, setIsViewFeedbackService] = useState(false);

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
    fetchData(newPage, searchParams);
  };

  const columns = useMemo(
    () => [
      {
        header: t("manage_service.Id"),
        accessorKey: "id",
        accessorFn: (_row, index) => index + 1,
      },
      { header: t("manage_service.ServiceName"), accessorKey: "serviceName" },
      {
        header: t("manage_service.ServiceCategory"),
        accessorKey: "serviceCategory",
      },
      { header: t("manage_service.PartName"), accessorKey: "carPart" },
      { header: t("manage_service.Category"), accessorKey: "carCategory" },
      { header: t("manage_service.Price"), accessorKey: "price" },
      { header: t("manage_service.WorkNature"), accessorKey: "workNature" },
      { header: t("manage_service.Action"), accessorKey: "action" },
      {
        header: t("manage_service.EstimatedHours"),
        accessorKey: "estimatedHours",
      },
      { header: t("manage_service.Status"), accessorKey: "status" },
    ],
    [t, i18n.language]
  );

  const actions = [
    {
      type: "link",
      label: t("manage_service.view"),
      icon: <FaEye />,
      color: "bg-gray-500",
      link: (row) => `/${row.original.id}`,
    },
    {
      type: "modal",
      label: t("manage_service.service_feedback"),
      color: "bg-yellow-500",
      icon: <FaStar />,
      onClick: async (row) => {
        try {
          console.log("Id da chon: ", row.id);
          const FeedbackByService = await getFeedbackByServiceId(row.id);
          setSelectedService(FeedbackByService.data.value);
          setIsViewFeedbackService(true);
        } catch (error) {
          console.error("Error fetching car part details: ", error);
        }
      },
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
        signifyInformation={sService.value}
      />
      <FeedbackServiceModal
        isOpen={isViewFeedbackService}
        onClose={() => setIsViewFeedbackService(false)}
        service={selectedService}
      />
    </>
  );
}

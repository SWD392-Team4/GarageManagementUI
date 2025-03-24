import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import BaseTable from "../../../components/BaseTable/BaseTable";
import { getAllCustomer, SearchCustomer } from "../services/CustomerService";
import SearchCustomers from "./SearchCustomers";
import { sCustomerManage } from "../services/CustomerSignify";
import { IoIosChatbubbles } from "react-icons/io";
import { chatStore, newChat } from "../../Chat/chatStore";

export default function ListCustomer() {
  const { t, i18n } = useTranslation("manage_customer");
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    hasPrevious: false,
    hasNext: false,
  });
  const [searchParams, setSearchParams] = useState(null);

  // useCallback tránh re-create hàm
  const fetchData = useCallback(async (page = 1, params = null) => {
    try {
      let response;

      if (params) {
        response = await SearchCustomer({ ...params, PageNumber: page });
      } else {
        response = await getAllCustomer(page);
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
        console.error("Loading products failed");
      }
    } catch (error) {
      console.error("Error fetching products: ", error);
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
        header: t("manage_customer.id"),
        accessorKey: "id",
        accessorFn: (_row, index) => index + 1,
      },
      { header: t("manage_customer.firstName"), accessorKey: "firstName" },
      { header: t("manage_customer.lastName"), accessorKey: "lastName" },
      { header: t("manage_customer.email"), accessorKey: "email" },
      { header: t("manage_customer.phoneNumber"), accessorKey: "phoneNumber" },
      { header: t("manage_customer.status"), accessorKey: "status" },
      { header: t("manage_customer.createdAt"), accessorKey: "createdAt" },
      { header: t("manage_customer.updatedAt"), accessorKey: "updatedAt" },
    ],

    [t, i18n.language]
  );

  const actions = [
    {
      type: "link",
      label: t("manage_customer.view"),
      icon: <FaEye />,
      color: "bg-gray-500",
      link: (row) => `${row.original.id}`,
    },
    // ,
    // {
    //   type: "modal",
    //   label: t("manage_customer.view"),
    //   color: "bg-yellow-500",
    //   icon: <IoIosChatbubbles />,
    //   onClick: (row) => {
    //     const friendExists = chatStore.value.friendList.some(
    //       (friend) => friend.id === row.original.id
    //     );

    //     chatStore.set((v) => {
    //       v.value.imageLink =
    //         row.imageLink !== "N/A"
    //           ? row.imageLink
    //           : "https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg";
    //       v.value.activeChatId = row.id;
    //     });

    //     navigate("/chat");
    //   },
    // },
  ];

  return (
    <>
      <SearchCustomers onSearch={handleSearch} />
      <BaseTable
        columns={columns}
        data={data}
        actions={actions}
        pagination={pagination}
        onPageChange={handlePageChange}
        signifyInformation={sCustomerManage.value}
      />
    </>
  );
}

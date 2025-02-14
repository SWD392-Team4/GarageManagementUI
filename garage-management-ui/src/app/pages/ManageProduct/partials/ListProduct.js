<<<<<<< HEAD
import React from "react";

const ListProduct = ({products}) => {
  return <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
    {products.map((item, index) => {
      return <div key={index}  className=" border rounded-2xl shadow-lg p-4 flex flex-col items-center bg-white transition transform hover:-translate-y-2 hover:shadow-xl cursor-pointer ">
        <img src={item.uri} alt={item.name} className="w-full h-40 object-contain rounded-md"/>
        <hr className="w-full border-t mt-2 outline-red" />
        <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
        <p className="text-gray-600 ">${item.price}</p>
          <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
            Book Now
          </button>
      </div>
    })}
  </div>;
};

export default ListProduct;
=======
import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BaseTable from "../../../components/BaseTable/BaseTable";
import { useTranslation } from "react-i18next";
import { FaEye } from "react-icons/fa";

export default function ListProduct() {
    const { t, i18n } = useTranslation("manage_product");
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({ total: 12, page: 1, pageSize: 4 });

    useEffect(() => {
        fetchData(pagination.page).then(response => {
            setData(response.data);
            setPagination(prev => ({ ...prev, total: response.total }));
        });
    }, [pagination.page]);

    const fetchData = async (page) => {
        const fakeData = {
            1: [
                { id: 1, name: "Lọc dầu động cơ", category: "Động cơ", price: "500,000 VND", stock: 50 },
                { id: 2, name: "Bộ phanh đĩa", category: "Hệ thống phanh", price: "1,200,000 VND", stock: 30 },
                { id: 3, name: "Đèn pha LED", category: "Hệ thống đèn", price: "850,000 VND", stock: 20 },
                { id: 4, name: "Ắc quy ô tô", category: "Nguồn điện", price: "2,500,000 VND", stock: 15 }
            ],
            2: [
                { id: 5, name: "Bugi đánh lửa", category: "Động cơ", price: "300,000 VND", stock: 100 },
                { id: 6, name: "Cảm biến áp suất lốp", category: "Cảm biến", price: "900,000 VND", stock: 25 },
                { id: 7, name: "Dây curoa cam", category: "Động cơ", price: "1,000,000 VND", stock: 40 },
                { id: 8, name: "Gương chiếu hậu", category: "Nội thất", price: "750,000 VND", stock: 35 }
            ],
            3: [
                { id: 9, name: "Lốp xe Michelin", category: "Lốp xe", price: "4,500,000 VND", stock: 10 },
                { id: 10, name: "Máy phát điện", category: "Nguồn điện", price: "7,800,000 VND", stock: 5 },
                { id: 11, name: "Ghế da cao cấp", category: "Nội thất", price: "5,500,000 VND", stock: 12 },
                { id: 12, name: "Cụm đồng hồ táp-lô", category: "Hệ thống điện", price: "3,200,000 VND", stock: 8 }
            ]
        };
        return { data: fakeData[page] || [], total: 12 };
    };

    const columns = useMemo(() => [
        { header: t("manage_product.id"), accessorKey: "id" },
        { header: t("manage_product.name"), accessorKey: "name" },
        { header: t("manage_product.category"), accessorKey: "category" },
        { header: t("manage_product.price"), accessorKey: "price" },
        { header: t("manage_product.stock"), accessorKey: "stock" },
    ], [t, i18n.language]);

    const actions = [
        {
            label: t("manage_product.view"),
            icon: <FaEye />,
            color: "bg-gray-500",
            onClick: (row) => navigate(`/admin/product/${row.id}`)
        }
    ];

    return (
        <BaseTable
            columns={columns}
            data={data}
            actions={actions}
            pagination={pagination}
            fetchData={fetchData}
        />
    );
}
>>>>>>> origin/Develop

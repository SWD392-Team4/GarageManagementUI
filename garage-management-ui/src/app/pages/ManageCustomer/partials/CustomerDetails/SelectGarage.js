import React, { useEffect, useState } from 'react'
import { getAllGarage } from '../../services/CustomerService';
import { NavLink } from 'react-router-dom';

export default function SelectGarage({ selectGarageId, onSelectGarageId }) {
    const [garages, setGarages] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchGarages = async () => {
            const response = await getAllGarage();
            const garageList = response?.data?.value;
            setGarages(garageList);
            onSelectGarageId(garageList[0].id);
        }
        fetchGarages();
        setLoading(false);
    }, [onSelectGarageId, selectGarageId])

    return (
        <nav className="border-b bg-white shadow-md mb-3">
            <ul className="grid grid-cols-2 sm:grid-cols-2 font-title text-center">
                {loading ? (
                    // Hiển thị skeleton loading khi dữ liệu đang tải
                    Array(2).fill(0).map((_, index) => (
                        <li key={index} className="animate-pulse">
                            <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto my-3"></div>
                        </li>
                    ))
                ) : (
                    // Hiển thị danh sách khi đã có dữ liệu
                    garages.map((garage) => (
                        <li key={garage.id}>
                            <NavLink
                                className={() =>
                                    selectGarageId === garage.id
                                        ? "text-red-500 border-b-2 font-bold border-red-500 pb-2 block w-full py-3"
                                        : "text-black block w-full py-3"
                                }
                                onClick={() => onSelectGarageId(garage.id)}
                            >
                                {garage.name}
                            </NavLink>
                        </li>
                    ))
                )}
            </ul>
        </nav>
    )
}

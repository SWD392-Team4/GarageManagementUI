import React, { useEffect, useState } from 'react'
import { getAllWareHouse } from '../../services/ProductAtWarehouseService';
import { NavLink } from 'react-router-dom';

export default function SelectWarehousePartial({ selectedWarehouseId, onSelectWarehouse }) {
    const [warehouses, setWarehouses] = useState([]);

    useEffect(() => {
        const fetchWarehouses = async () => {
            const response = await getAllWareHouse();
            const warehouseList = response?.data?.value;
            setWarehouses(warehouseList);
            if (warehouseList.length > 0) {
                onSelectWarehouse(warehouseList[0].id);
            }
        };

        fetchWarehouses();
    }, [onSelectWarehouse]);

    return (
        <nav className="border-b bg-white shadow-md mb-3">
            <ul className="grid grid-cols-2 sm:grid-cols-2 font-title text-center">
                {warehouses.map((warehouse) => (
                    <li key={warehouse.id}>
                        <NavLink
                            className={() =>
                                selectedWarehouseId === warehouse.id
                                    ? "text-red-500 border-b-2 font-bold border-red-500 pb-2 block w-full py-3"
                                    : "text-black block w-full py-3"
                            }
                            onClick={() => onSelectWarehouse(warehouse.id)}
                        >
                            {warehouse.name}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

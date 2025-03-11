import React, { useEffect, useState } from "react";
import { getAllService } from "../services/PackageServiceAPI";

export default function SelectServiceModal({ isOpen, onClose, onSelect, selectedServices }) {
    const [services, setServices] = useState([]);
    const [selected, setSelected] = useState(selectedServices || []);

    useEffect(() => {
        async function fetchServices() {
            try {
                const response = await getAllService();
                setServices(response?.data?.value || []);
            } catch (error) {
                console.error("Error fetching services:", error);
            }
        }
        if (isOpen) {
            fetchServices();
        }
    }, [isOpen]);

    const toggleServiceSelection = (serviceId) => {
        setSelected((prevSelected) =>
            prevSelected.includes(serviceId)
                ? prevSelected.filter((id) => id !== serviceId)
                : [...prevSelected, serviceId]
        );
    };

    const handleConfirm = () => {
        onSelect(selected);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-2/3 max-h-[80vh] overflow-y-auto">
                <h2 className="text-lg font-bold mb-4">Select Services</h2>
                <div className="grid grid-cols-2 gap-4">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className={`border p-4 rounded-lg cursor-pointer ${selected.includes(service.id) ? "bg-blue-200" : "bg-white"}`}
                            onClick={() => toggleServiceSelection(service.id)}
                        >
                            <h3 className="font-semibold">{service.serviceName}</h3>
                            <p className="text-sm text-gray-600">{service.description}</p>
                            {service.imageLink && service.imageLink.length > 0 && (
                                <img src={service.imageLink[0]} alt={service.serviceName} className="mt-2 w-full h-24 object-cover rounded" />
                            )}
                        </div>
                    ))}
                </div>
                <div className="flex justify-end mt-4">
                    <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2">Cancel</button>
                    <button onClick={handleConfirm} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Confirm</button>
                </div>
            </div>
        </div>
    );
}
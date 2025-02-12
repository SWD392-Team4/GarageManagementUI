import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LogoGarage from "../../../assets/img/invoiceLogo.png"

export default function LookUp() {
    const { t } = useTranslation("look_up_page");
    const [invoiceId, setInvoiceId] = useState('');
    const [invoice, setInvoice] = useState(null);

    const handleSearch = () => {
        // Simulating API call
        const mockInvoice = {
            id: invoiceId,
            id_employee: 101,
            id_gara: 5,
            id_appointment: 2023,
            id_Customer: 303,
            total: 500000,
            status: 'Completed',
            updated_date: '2025-02-13T12:00:00Z',
            created_date: '2025-02-10T09:00:00Z',
            customer_name: 'Nguyen Van A',
            customer_phone: '0987654321',
            customer_mail: 'nguyenvana@example.com',
            services: [
                { id: 1, name: 'Thay dầu nhớt', quantity: 1, unitPrice: 300000, total: 300000 },
                { id: 2, name: 'Vệ sinh kim phun', quantity: 1, unitPrice: 200000, total: 200000 },
            ],
            garage_info: {
                name: "Garage Example",
                address: "Quận 1, TP. HCM",
                email: "contact@garageexample.com"
            }
        };
        setInvoice(mockInvoice);
    };

    return (
        <div className="mt-20 bg-gray-100 p-8 flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-4">{t('title')}</h1>
            <div className="flex space-x-2 mb-6">
                <input
                    type="text"
                    placeholder={t('input_invoice_id')}
                    value={invoiceId}
                    onChange={(e) => setInvoiceId(e.target.value)}
                    className="w-64 p-2 border rounded"
                />
                <button onClick={handleSearch} className="px-4 py-2 bg-blue-500 text-white rounded">{t('search')}</button>
            </div>
            {invoice && (
                <div className="container mx-auto bg-white shadow-lg rounded-lg px-10 pt-8 pb-10 w-full max-w-5xl border border-gray-200">
                    <div className="grid grid-cols-2 gap-6 border-b pb-6 mb-6">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800">{t('invoice_payment')}</h2>
                            <p className="text-gray-500">{t('invoice_id')}: <span className="text-gray-800 font-medium">#{invoice.id}</span></p>
                        </div>
                        <div className="text-right text-gray-600">
                            <p><strong>{t('created_date')}:</strong> {new Date(invoice.created_date).toLocaleString()}</p>
                            <p><strong>{t('updated_date')}:</strong> {new Date(invoice.updated_date).toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg shadow-inner mb-6">
                        <div>
                            <p><strong>{t('customer')}:</strong> {invoice.customer_name} ({invoice.id_Customer})</p>
                            <p><strong>{t('phone')}:</strong> {invoice.customer_phone}</p>
                        </div>
                        <div>
                            <p><strong>{t('email')}:</strong> {invoice.customer_mail}</p>
                            <p><strong>{t('garage')}:</strong> {invoice.garage_info.name}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-6 mb-6 text-gray-700">
                        <p><strong>{t('assigned_employee')}:</strong> {invoice.id_employee}</p>
                        <p><strong>{t('appointment_id')}:</strong> {invoice.id_appointment}</p>
                        <p><strong>{t('status')}:</strong> {invoice.status}</p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg shadow-inner mb-6">
                        <h3 className="text-xl font-bold mb-4">{t('services_used')}</h3>
                        <table className="w-full border-collapse border border-gray-300 text-left">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-gray-300 p-2">{t('service_id')}</th>
                                    <th className="border border-gray-300 p-2">{t('service_name')}</th>
                                    <th className="border border-gray-300 p-2">{t('quantity')}</th>
                                    <th className="border border-gray-300 p-2">{t('unit_price')}</th>
                                    <th className="border border-gray-300 p-2">{t('total')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoice.services.map(service => (
                                    <tr key={service.id}>
                                        <td className="border border-gray-300 p-2">{service.id}</td>
                                        <td className="border border-gray-300 p-2">{service.name}</td>
                                        <td className="border border-gray-300 p-2">{service.quantity}</td>
                                        <td className="border border-gray-300 p-2">{service.unitPrice.toLocaleString()} VND</td>
                                        <td className="border border-gray-300 p-2">{service.total.toLocaleString()} VND</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="text-center mt-6 border-t pt-6">
                        <div className="flex border border-gray-300 rounded-lg p-6 items-center justify-between">
                            <div className="flex flex-col justify-center items-end pr-6 text-right">
                                <p className="text-gray-700 font-semibold text-xl pb-2">{invoice.garage_info.address}</p>
                                <p className="text-gray-700 font-semibold text-xl pb-2">{invoice.garage_info.email}</p>
                            </div>
                            <div className="flex justify-center items-center">
                                <img src={LogoGarage} alt="Garage Logo" className="w-24 h-24" />
                            </div>
                            <div className="flex flex-col justify-start items-start pl-6 text-left">
                                <p className="text-2xl font-bold text-gray-900 italic">{t('thank_you')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

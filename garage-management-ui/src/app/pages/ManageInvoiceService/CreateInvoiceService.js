import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import ServiceSelectModal from "./partials/ServiceSelectModal";
import InvoiceModal from "./partials/InvoiceModal";

export default function CreateInvoiceService() {
  const { register, control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      customer: {
        name: "",
        phone: "",
        address: "",
      },
      technician: {
        name: "",
        phone: "",
      },
      services: [],
    },
  });

  const { fields, append, remove, update } = useFieldArray({ control, name: "services" });
  const [invoice, setInvoice] = useState(null);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  const onSubmit = (data) => {
    const total = data.services.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
    setInvoice({ ...data, total });
    setShowInvoiceModal(true);
  };

  const handleServiceSelect = (selectedServices) => {
    selectedServices.forEach((service) => {
      const existingIndex = fields.findIndex((item) => item.id === service.id);
      if (existingIndex !== -1) {
        update(existingIndex, {
          ...fields[existingIndex],
          quantity: fields[existingIndex].quantity + service.quantity,
        });
      } else {
        append({ id: service.id, name: service.name, quantity: service.quantity, price: service.price });
      }
    });
    setShowServiceModal(false);
  };

  return (
    <div className="bg-white shadow-lg p-6">
      <div className="p-8 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Tạo hóa đơn dịch vụ</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full max-w-5xl bg-white shadow-lg rounded-lg px-10 pt-8 pb-10 border border-gray-200">
          <div className="grid grid-cols-2 gap-6 border-b pb-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Thông tin khách hàng</h3>
              <input className="border rounded w-full p-2 mt-2" {...register("customer.name")} placeholder="Tên khách hàng" />
              <input className="border rounded w-full p-2 mt-2" {...register("customer.phone")} placeholder="Số điện thoại" />
              <input className="border rounded w-full p-2 mt-2" {...register("customer.address")} placeholder="Địa chỉ" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Thông tin kỹ thuật viên</h3>
              <input className="border rounded w-full p-2 mt-2" {...register("technician.name")} placeholder="Tên kỹ thuật viên" />
              <input className="border rounded w-full p-2 mt-2" {...register("technician.phone")} placeholder="Số điện thoại" />
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-inner mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Dịch vụ đã sử dụng</h3>
            <table className="w-full border-collapse border border-gray-300 text-left">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-2">Tên dịch vụ</th>
                  <th className="border border-gray-300 p-2 text-center">Số lượng</th>
                  <th className="border border-gray-300 p-2 text-right">Đơn giá</th>
                  <th className="border border-gray-300 p-2 text-right">Thành tiền</th>
                  <th className="border border-gray-300 p-2 text-center">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {fields.map((item, index) => (
                  <tr key={item.id}>
                    <td className="border border-gray-300 p-2">{item.name}</td>
                    <td className="border border-gray-300 p-2 text-center">
                      <input type="number" className="w-full text-center" {...register(`services.${index}.quantity`)} />
                    </td>
                    <td className="border border-gray-300 p-2 text-right">{item.price.toLocaleString()} VND</td>
                    <td className="border border-gray-300 p-2 text-right">{(item.quantity * item.price).toLocaleString()} VND</td>
                    <td className="border border-gray-300 p-2 text-center">
                      <button type="button" className="text-red-500" onClick={() => remove(index)}>X</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded mt-3" onClick={() => setShowServiceModal(true)}>
              + Chọn dịch vụ
            </button>
          </div>

          <div className="flex justify-between items-center mt-4 p-4 bg-gray-100 rounded-lg">
            <h3 className="text-xl font-bold">Tổng tiền:</h3>
            <h3 className="text-xl font-bold text-green-600">{invoice?.total?.toLocaleString() || "0 VND"}</h3>
          </div>

          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full font-semibold">Tạo hóa đơn</button>
        </form>
      </div>

      {showServiceModal && <ServiceSelectModal onSelect={handleServiceSelect} onClose={() => setShowServiceModal(false)} />}
      {showInvoiceModal && <InvoiceModal invoice={invoice} onClose={() => setShowInvoiceModal(false)} />}
    </div>
  );
}

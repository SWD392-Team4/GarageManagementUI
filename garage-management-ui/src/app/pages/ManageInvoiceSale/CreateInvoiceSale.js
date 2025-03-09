import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import ProductSelectModal from "./partials/ProductSelectModal";
import InvoiceModal from "./partials/InvoiceModal";

export default function CreateInvoiceSale() {
  const { register, control, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: {
      customer: {
        name: "",
        phone: "",
        address: "",
      },
      cashier: {
        name: "",
        phone: "",
      },
      products: [],
    },
  });

  const { fields, append, remove, update } = useFieldArray({ control, name: "products" });
  const [invoice, setInvoice] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  const onSubmit = (data) => {
    const total = data.products.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
    setInvoice({ ...data, total });
    setShowInvoiceModal(true);
  };

  const handleProductSelect = (selectedProducts) => {
    if (!Array.isArray(selectedProducts)) {
      console.error("Dữ liệu truyền vào không phải là mảng", selectedProducts);
      return;
    }

    selectedProducts.forEach((product) => {
      const existingIndex = fields.findIndex((item) => item.id === product.id);
      if (existingIndex !== -1) {
        update(existingIndex, {
          ...fields[existingIndex],
          quantity: fields[existingIndex].quantity + product.quantity,
        });
      } else {
        append({ id: product.id, name: product.name, quantity: product.quantity, price: product.price });
      }
    });

    setShowProductModal(false);
  };

  const handleCloseInvoiceModal = () => {
    setShowInvoiceModal(false);
    reset();
  };



  return (
    <div className="bg-white shadow-lg p-6">
      <div className=" p-8 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Tạo hóa đơn</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full max-w-5xl bg-white shadow-lg rounded-lg px-10 pt-8 pb-10 border border-gray-200">
          <div className="grid grid-cols-2 gap-6 border-b pb-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Thông tin khách hàng</h3>
              <input className="border rounded w-full p-2 mt-2" {...register("customer.name")} placeholder="Tên khách hàng" />
              <input className="border rounded w-full p-2 mt-2" {...register("customer.phone")} placeholder="Số điện thoại" />
              <input className="border rounded w-full p-2 mt-2" {...register("customer.address")} placeholder="Địa chỉ" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Thông tin thu ngân</h3>
              <input className="border rounded w-full p-2 mt-2" {...register("cashier.name")} placeholder="Tên thu ngân" />
              <input className="border rounded w-full p-2 mt-2" {...register("cashier.phone")} placeholder="Số điện thoại" />
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-inner mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Sản phẩm</h3>
            <table className="w-full border-collapse border border-gray-300 text-left">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-2">Tên sản phẩm</th>
                  <th className="border border-gray-300 p-2">Số lượng</th>
                  <th className="border border-gray-300 p-2">Đơn giá</th>
                  <th className="border border-gray-300 p-2">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {fields.map((item, index) => (
                  <tr key={item.id}>
                    <td className="border border-gray-300 p-2">{item.name}</td>
                    <td className="border border-gray-300 p-2"><input type="number" className="w-full text-center" {...register(`products.${index}.quantity`)} /></td>
                    <td className="border border-gray-300 p-2">{item.price.toLocaleString()} VND</td>
                    <td className="border border-gray-300 p-2 text-center"><button type="button" className="text-red-500" onClick={() => remove(index)}>X</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded mt-3" onClick={() => setShowProductModal(true)}>
              + Chọn sản phẩm
            </button>
          </div>

          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full font-semibold">Tạo hóa đơn</button>
        </form>
      </div>

      {showProductModal && <ProductSelectModal onSelect={handleProductSelect} onClose={() => setShowProductModal(false)} />}
      {showInvoiceModal && <InvoiceModal invoice={invoice} onClose={handleCloseInvoiceModal} />}
    </div>
  );
}
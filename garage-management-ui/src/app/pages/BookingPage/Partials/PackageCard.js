// PackageCard.jsx
import React, { useState } from "react";
import {
  FaCheckSquare,
  FaConciergeBell,
  FaMoneyBillWave,
  FaRegSquare,
} from "react-icons/fa";
import { formatVietnameseCurrency } from "../../ManageProduct/schemas/ProductValid";
import { BookingSignify } from "../Services/BookingSignify";
import DetailModal from "./DetailModal";
export default function PackageCard({ pack, icon }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelect = (id) => {
    BookingSignify.set((v) => {
      const idPackagExists = v.value.package.some(
        (service) => service.packageId === id
      );
      if (!idPackagExists) {
        const currentPackage = v.value.package || [];
        v.value.package = [
          ...currentPackage,
          {
            packageId: id,
          },
        ];
      } else {
        const currentPackage = v.value.package || [];
        v.value.package = currentPackage.filter(
          (packagee) => packagee.packageId !== id
        );
      }
    });
  };

  const isSelected = BookingSignify.value.package.some(
    (pack2) => pack2.packageId === pack.id
  );

  return (
    <div className="relative p-6 text-center border-2 group">
      <div onClick={() => handleSelect(pack.id)} className="cursor-pointer">
        <div className="absolute top-2 right-2 z-20 text-xl text-red-700">
          {isSelected ? <FaCheckSquare /> : <FaRegSquare />}
        </div>
      </div>

      <h3 className="text-4xl font-shadows font-semibold">
        {pack.packageName}
      </h3>
      <div className="my-4 flex justify-center">
        <div className="relative">
          <button className="w-16 h-16 flex items-center justify-center bg-gray-100/50 group-hover:bg-gray-600/50 text-red-500 group-hover:text-red-100 duration-200 rounded-full group-hover:animate-spin-once2">
            <span className="text-4xl">{icon}</span>
          </button>
        </div>
      </div>

      {/* Hiển thị thông tin category và packagePrice */}
      <div className="mb-4 grid grid-cols-3 ">
        <h3 className="text-sm font-title font-extrabold col-span-2 text-left">
          <FaConciergeBell className="inline-block mr-1" />
          Service Category:
        </h3>
        <h3 className="text-base font-medium text-gray-600 text-right">
          {pack.serviceCategory}{" "}
        </h3>
        <h3 className="text-sm font-title font-extrabold   text-left">
          <FaMoneyBillWave className="inline-block mr-1" />
          Price:
        </h3>
        <h3 className="text-base font-medium text-gray-600 col-span-2 text-right">
          {formatVietnameseCurrency(pack.packagePrice)}
        </h3>
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className=" group p-5 cursor-pointer  relative      text-xl     border-0  flex  items-center 
      justify-center bg-transparent text-red-600 font-shadows font-bold  h-auto   w-[170px]   overflow-hidden    transition-all duration-100"
        >
          <span className="group-hover:w-full  absolute left-0  h-full w-5 border-y-2 border-l-2 border-red-500 transition-all duration-500"></span>
          <p
            className="group-hover:opacity-0 group-hover:translate-x-[-100%] absolute translate-x-0 transition-all
         duration-200"
          >
            Detail
          </p>
          <span className="group-hover:translate-x-0  group-hover:opacity-100 absolute  translate-x-full opacity-0  transition-all duration-200">
            View
          </span>
          <span className="group-hover:w-full absolute right-0 h-full w-5  border-y-2 border-r-2  border-red-500 transition-all duration-500"></span>
        </button>
      </div>
      {/* Modal hiển thị description */}
      {isModalOpen && (
        <DetailModal pack={pack} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}

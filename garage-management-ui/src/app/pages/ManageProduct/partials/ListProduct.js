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

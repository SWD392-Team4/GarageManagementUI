import React, { useState } from "react";
import ListProduct from "./ListProduct";
import Pagination from "../../../components/Pagination/Pagination";
const fakeData = [
    { id: 101, name: "Lọc dầu động cơ", price: "250", uri: "https://templates.hibootstrap.com/audeck/default/assets/img/home-one/parts/1.png" },
    { id: 102, name: "Má phanh trước", price: "800", uri: "https://templates.hibootstrap.com/audeck/default/assets/img/home-one/parts/1.png" },
    { id: 103, name: "Bugi đánh lửa", price: "150", uri: "https://templates.hibootstrap.com/audeck/default/assets/img/home-one/parts/1.png" },
    { id: 104, name: "Ắc quy 12V", price: "1800", uri: "https://templates.hibootstrap.com/audeck/default/assets/img/home-one/parts/1.png" },
    { id: 105, name: "Lốp xe Michelin", price: "2200", uri: "https://templates.hibootstrap.com/audeck/default/assets/img/home-one/parts/1.png" },
    { id: 106, name: "Cảm biến áp suất lốp", price: "550", uri: "https://templates.hibootstrap.com/audeck/default/assets/img/home-one/parts/1.png" },
    { id: 107, name: "Bơm nhiên liệu", price: "1250", uri: "https://templates.hibootstrap.com/audeck/default/assets/img/home-one/parts/1.png" },
    { id: 108, name: "Đèn pha LED", price: "950", uri: "https://templates.hibootstrap.com/audeck/default/assets/img/home-one/parts/1.png" },
    { id: 109, name: "Gạt nước mưa", price: "100", uri: "https://templates.hibootstrap.com/audeck/default/assets/img/home-one/parts/1.png" },
    { id: 110, name: "Lọc gió động cơ", price: "400", uri: "https://templates.hibootstrap.com/audeck/default/assets/img/home-one/parts/1.png" },
    { id: 111, name: "Dây curoa cam", price: "600", uri: "https://templates.hibootstrap.com/audeck/default/assets/img/home-one/parts/1.png" },
    { id: 112, name: "Càng A trước", price: "1500", uri: "https://templates.hibootstrap.com/audeck/default/assets/img/home-one/parts/1.png" },
    { id: 113, name: "Giảm xóc trước", price: "2300", uri: "https://templates.hibootstrap.com/audeck/default/assets/img/home-one/parts/1.png" },
    { id: 114, name: "Bộ ly hợp", price: "3000", uri: "https://templates.hibootstrap.com/audeck/default/assets/img/home-one/parts/1.png" },
    { id: 115, name: "Cảm biến oxy", price: "700", uri: "https://templates.hibootstrap.com/audeck/default/assets/img/home-one/parts/1.png" },
    { id: 116, name: "Bộ tản nhiệt", price: "2500", uri: "https://templates.hibootstrap.com/audeck/default/assets/img/home-one/parts/1.png" },
    { id: 117, name: "Bơm trợ lực lái", price: "1700", uri: "https://templates.hibootstrap.com/audeck/default/assets/img/home-one/parts/1.png" },
    { id: 118, name: "Đèn hậu LED", price: "1200", uri: "https://templates.hibootstrap.com/audeck/default/assets/img/home-one/parts/1.png" },
    { id: 119, name: "Mô tơ kính cửa", price: "850", uri: "https://templates.hibootstrap.com/audeck/default/assets/img/home-one/parts/1.png" },
    { id: 120, name: "Cảm biến tốc độ", price: "950", uri: "https://templates.hibootstrap.com/audeck/default/assets/img/home-one/parts/1.png" },
];

const ProductsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Calculate the current products in fake data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = fakeData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4 text-center">Our Products</h1>
      
      <ListProduct products={currentProducts} />
      
      <Pagination
        currentPage={currentPage}
        totalItems={fakeData.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
    </>
  );
};

export default ProductsPage;

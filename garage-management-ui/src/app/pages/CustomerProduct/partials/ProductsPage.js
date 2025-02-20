import React, { startTransition, useEffect, useState } from "react";
import ListProduct from "./ListProduct";
import Pagination from "../../../components/Pagination/Pagination";
import { useTranslation } from "react-i18next";
import FilterBar from "./FilterBar";
import { BsSliders } from "react-icons/bs"; // Import filter icon

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [paging, setPaging] = useState({
    currentPage: 1,
    totalPages: 1,
    hasPrevious: false,
    hasNext: false,
  });
  const [showFilter, setShowFilter] = useState(false); // State to control mobile filter visibility
  const { t } = useTranslation("customer_product_detail");
  useEffect(() => {
    console.log("Fetching products for page:", paging.currentPage);
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `https://gm-api.newlsun.com/api/products?PageNumber=${paging.currentPage}&PageSize=12`
        );
        const data = await response.json();
        setProducts(data.value || []);
        setFilteredProducts(data.value || []);

        setPaging((prev) => ({
          ...prev,
          totalPages: data.paging.totalPages,
          hasPrevious: data.paging.hasPrevious,
          hasNext: data.paging.hasNext,
        }));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  
    fetchProducts();
  }, [paging.currentPage]); // API call triggers when `paging.currentPage` changes

  const handleFilterChange = (filters) => {
    startTransition(() => {
      let filtered = products.filter((product) => {
        return (
          (filters.searchTerm === "" ||
            product.ProductName.toLowerCase().includes(
              filters.searchTerm.toLowerCase()
            )) &&
          (filters.category === "" || product.Category === filters.category) &&
          (!filters.price ||
            (product.ProductPrice >= filters.price[0] &&
              product.ProductPrice <= filters.price[1]))
        );
      });
      setFilteredProducts(filtered);
    });
  };
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-6 text-center p-6">
        {t("customer_product_detail.product_list_title")}
      </h1>

      {/* Sidebar & Product List Layout */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Sidebar Filter (Sticky for Desktop, Modal for Mobile) */}
        <div
          className={`lg:block hidden md:w-1/4 w-full bg-white p-4 rounded-lg shadow-md sticky top-4 h-fit`}
        >
          <FilterBar onFilterChange={handleFilterChange} />
        </div>

        {/* Product List & Pagination (Right) */}
        <div className="md:w-3/4 w-full">
          <ListProduct products={filteredProducts} />

          {/* Pagination - Center Align */}
          <div className="mt-6 flex justify-center">
            <Pagination
              currentPage={paging.currentPage}
              totalPages={paging.totalPages}
              hasPrevious={paging.hasPrevious}
              hasNext={paging.hasNext}
              onPageChange={(page) =>
                setPaging((prev) => ({ ...prev, currentPage: page }))
              }
            />
          </div>
        </div>
      </div>

      {/* Floating Filter Button */}
      <button
        className="lg:hidden fixed bottom-4 right-4 bg-red-600 text-white p-3 rounded-full shadow-lg"
        onClick={() => setShowFilter(true)}
      >
        <BsSliders size={24} />
      </button>

      {/* Fullscreen Mobile Filter Modal */}
      {showFilter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 w-11/12 max-w-lg rounded-lg shadow-lg relative">
            <button
              className="absolute top-2 right-3 text-gray-600 text-2xl"
              onClick={() => setShowFilter(false)}
            >
              &times;
            </button>
            <FilterBar onFilterChange={handleFilterChange} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;

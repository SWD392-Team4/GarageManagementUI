import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import ListProduct from "./ListProduct";
import Pagination from "../../../components/Pagination/Pagination";
import { useTranslation } from "react-i18next";
import FilterBar from "./FilterBar";
import { BsSliders } from "react-icons/bs";
import { getAllProducts } from "../services/CustomerProductService";
import LoadingSpinner from "../partials/LoadingSpinner";
const ProductsPage = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paging, setPaging] = useState({
    currentPage: 1,
    totalPages: 1,
    hasPrevious: false,
    hasNext: false,
  });
  const [showFilter, setShowFilter] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useTranslation("customer_product_detail");
  // Extract filters from URL parameters
  const appliedFilters = useMemo(
    () => ({
      //useMemo ensures that the object is only created when the URL parameters change, avoid rerenders
      searchTerm: searchParams.get("searchTerm") || "",
      category: searchParams.get("category") || "",
      brand: searchParams.get("brand") || "",
      price: searchParams.get("price")
        ? searchParams.get("price").split(",").map(Number)
        : [0, 500000],
    }),
    [searchParams]
  );
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        console.log(appliedFilters)
        const response = await getAllProducts(
          paging.currentPage,
          12,
          appliedFilters
        );
        if (response?.value) {
          setFilteredProducts(response.value);
          setPaging({
            currentPage: response.paging.currentPage,
            totalPages: response.paging.totalPages,
            hasPrevious: response.paging.hasPrevious,
            hasNext: response.paging.hasNext,
          });
        } else {
          console.error("Error: No data received");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [paging.currentPage, appliedFilters]);

  const handleFilterChange = (filters) => {
    setSearchParams({
      searchTerm: filters.searchTerm,
      category: filters.category,
      brand: filters.brand,
      price: filters.price.join(","),
    });
    setPaging((prev) => ({
      ...prev,
      currentPage: 1,
    }));
  };
  const maxPrice = useMemo(() => {
    if (!filteredProducts.length) return 500000; // Default max price if no products exist
    return Math.max(...filteredProducts.map(product => product.price));
  }, [filteredProducts]);
  return (
    <div className="bg-gray-100 min-h-screen py-6">
      <div className="container mx-auto px-4 p-6">
        <h1 className="text-4xl font-bold mb-6 text-center p-6">
          {t("customer_product_detail.product_list_title")}
        </h1>

        <div className="flex flex-col md:flex-row gap-4">
          <div
            className={`lg:block hidden md:w-1/4 w-full bg-white p-4 rounded-lg shadow-md sticky top-4 h-fit`}
          >
            <FilterBar
              onFilterChange={handleFilterChange}
              initialFilters={appliedFilters}
              maxPrice={maxPrice}
            />
          </div>

          <div className="w-full">
            {loading ? (
              <LoadingSpinner />
            ) : filteredProducts.length > 0 ? (
              <ListProduct products={filteredProducts} />
            ) : (
              <div className="text-center text-gray-500 text-lg mt-6">
                No products found. Try adjusting your filters.
              </div>
            )}

            <div className="mt-6 flex justify-center">
              {!loading && filteredProducts.length > 0 && (
                <Pagination
                  currentPage={paging.currentPage}
                  totalPages={paging.totalPages}
                  hasPrevious={paging.hasPrevious}
                  hasNext={paging.hasNext}
                  onPageChange={(page) =>
                    setPaging((prev) => ({ ...prev, currentPage: page }))
                  }
                />
              )}
            </div>
          </div>
        </div>

        <button
          className="lg:hidden fixed bottom-4 right-4 bg-red-600 text-white p-3 rounded-full shadow-lg"
          onClick={() => setShowFilter(true)}
        >
          <BsSliders size={24} />
        </button>

        {showFilter && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 w-11/12 max-w-lg rounded-lg shadow-lg relative">
              <button
                className="absolute top-2 right-3 text-gray-600 text-2xl"
                onClick={() => setShowFilter(false)}
              >
                &times;
              </button>
              <FilterBar
                onFilterChange={handleFilterChange}
                initialFilters={appliedFilters}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;

import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import PackageList from "./PackageList";
import Pagination from "../../../components/Pagination/Pagination";
import { getAllCars, getAllPackages, getAllServicesCategories, getAllTypes } from "../services/PackageServiceAPI";
import LoadingSpinner from "../../CustomerProduct/partials/LoadingSpinner";
import PackageFilterBar from "./PackageFilterBar";
import { BsSliders } from "react-icons/bs";

const PackageListPage = () => {
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paging, setPaging] = useState({
    currentPage: 1,
    totalPages: 1,
    hasPrevious: false,
    hasNext: false,
  });
  const [showFilter, setShowFilter] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [serviceCategories, setServiceCategories] = useState([]);
  const [carCategories, setCarCategories] = useState([]);
  const [packageTypes, setPackageTypes] = useState([]);

  const appliedFilters = useMemo(
    () => ({
      searchTerm: searchParams.get("searchTerm") || "",
      serviceCategory: searchParams.get("serviceCategory") || "",
      packageType: searchParams.get("packageType") || "",
      carCategory: searchParams.get("carCategory") || "",
      price: searchParams.get("price")
        ? searchParams.get("price").split(",").map(Number)
        : [0, 10000000],
    }),
    [searchParams]
  );
  useEffect(() => {
    // Fetch service categories and package types
    const fetchCategoriesAndTypes = async () => {
      try {
        const [categories, types, carCategories] = await Promise.all([
          getAllServicesCategories(),
          getAllTypes(),
          getAllCars()
        ]);
        setServiceCategories(categories);
        setPackageTypes(types);
        setCarCategories(carCategories);
      } catch (error) {
        console.error("Error fetching categories or types:", error);
      }
    };

    fetchCategoriesAndTypes();
  }, []);
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const response = await getAllPackages(
          paging.currentPage,
          12,
          appliedFilters
        );
        if (response?.value) {
          setFilteredPackages(response.value);
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
        console.error("Error fetching packages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [paging.currentPage, appliedFilters]);

  const handleFilterChange = (filters) => {
    setSearchParams({
      searchTerm: filters.searchTerm,
      serviceCategory: filters.serviceCategory,
      packageType: filters.packageType,
      carCategory: filters.carCategory,
      price: filters.price.join(","),
    });
    setPaging((prev) => ({ ...prev, currentPage: 1 }));
  };

  return (
    <div className="bg-gray-100 min-h-screen py-6">
      <div className="container mx-auto px-4 p-6">
        <h1 className="text-4xl font-bold mb-6 text-center p-6">
          Our Packages
        </h1>

        <div className="flex flex-col md:flex-row gap-4">
          <div
            className={`lg:block hidden md:w-1/4 w-full bg-white p-4 rounded-lg shadow-md sticky top-4 h-fit`}
          >
            <PackageFilterBar
              onFilterChange={handleFilterChange}
              initialFilters={appliedFilters}
              serviceCategory={serviceCategories}
              packageType={packageTypes}
              carCategory={carCategories}
            />
          </div>

          <div className="w-full">
            {loading ? (
              <LoadingSpinner />
            ) : filteredPackages.length > 0 ? (
              <PackageList packages={filteredPackages} />
            ) : (
              <div className="text-center text-gray-500 text-lg mt-6">
                No packages found. Try adjusting your filters.
              </div>
            )}

            <div className="mt-6 flex justify-center">
              {!loading && filteredPackages.length > 0 && (
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
              <PackageFilterBar
                onFilterChange={handleFilterChange}
                initialFilters={appliedFilters}
                serviceCategory={serviceCategories}
                packageType={packageTypes}
                carCategory={carCategories}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PackageListPage;

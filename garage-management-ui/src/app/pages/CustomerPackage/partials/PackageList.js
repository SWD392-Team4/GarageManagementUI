import React from "react";

export default function PackageList({ packages }) {
  return (
    <section className="pt-24 pb-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {packages.map((pkg) => (
            <a key={pkg.id} href="/service-details" className="block group">
              <div className="h-[400px]">
                <div className="rounded-md overflow-visible transition-shadow duration-300 h-full relative">
                  {/* Image Section */}
                  <div className="relative h-2/3 ">
                    <img
                      src={pkg.packageImages[0].imageLink}
                      alt={pkg.packageName}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>

                  {/* Text Section */}
                  <div className="rounded-md absolute left-0 top-[200px] h-2/5 w-10/12 bg-black text-white p-4 transition-all duration-300 group-hover:w-full group-hover:bg-red-600">
                    <h3 className="text-xl font-semibold mb-2">{pkg.packageName}</h3>
                    <p className="text-gray-300 group-hover:text-white line-clamp-3">
                      {pkg.packageDescription}
                    </p>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
